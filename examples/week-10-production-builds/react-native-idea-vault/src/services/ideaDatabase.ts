import SQLite, { type ResultSet, type SQLiteDatabase, type Transaction } from 'react-native-sqlite-storage';

import { ideaTemplates } from '../data/ideaTemplates';
import type { DraftIdea, IdeaRecord } from '../types';
import { sanitizeIdeaDraft } from '../utils/ideaBackup';

const database: SQLiteDatabase = SQLite.openDatabase(
  {
    name: 'react-native-idea-vault.db',
    location: 'default',
  },
  () => {
    // Database opened successfully.
  },
  (error) => {
    console.warn('Failed to open SQLite database.', error.message);
  },
);

export function initializeIdeaDatabase(onComplete: () => void) {
  database.transaction(
    (transaction: Transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS ideas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          notes TEXT NOT NULL,
          rating INTEGER NOT NULL,
          audience TEXT NOT NULL,
          moat TEXT NOT NULL,
          channel TEXT NOT NULL,
          nextExperiment TEXT NOT NULL,
          pricing TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );`,
      );

      transaction.executeSql('SELECT COUNT(*) as count FROM ideas', [], (_tx: Transaction, result: ResultSet) => {
        const count = result.rows.item(0).count as number;
        if (count === 0) {
          ideaTemplates.forEach((template) => {
            const idea = sanitizeIdeaDraft(template.draft);
            transaction.executeSql(
              `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, pricing, updatedAt)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                idea.title,
                idea.notes,
                idea.rating,
                idea.audience,
                idea.moat,
                idea.channel,
                idea.nextExperiment,
                idea.pricing,
                new Date().toISOString(),
              ],
            );
          });
        }
      });
    },
    undefined,
    onComplete,
  );
}

export function loadIdeas(onComplete: (ideas: IdeaRecord[]) => void) {
  database.transaction((transaction: Transaction) => {
    transaction.executeSql(
      'SELECT * FROM ideas ORDER BY rating DESC, updatedAt DESC',
      [],
      (_tx: Transaction, result: ResultSet) => {
        const nextIdeas: IdeaRecord[] = [];
        for (let index = 0; index < result.rows.length; index += 1) {
          nextIdeas.push(result.rows.item(index) as IdeaRecord);
        }
        onComplete(nextIdeas);
      },
    );
  });
}

export function insertIdea(input: DraftIdea, onComplete?: () => void) {
  const idea = sanitizeIdeaDraft(input);
  database.transaction(
    (transaction: Transaction) => {
      transaction.executeSql(
        `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, pricing, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          idea.title,
          idea.notes,
          idea.rating,
          idea.audience,
          idea.moat,
          idea.channel,
          idea.nextExperiment,
          idea.pricing,
          new Date().toISOString(),
        ],
      );
    },
    undefined,
    onComplete,
  );
}

export function deleteIdea(id: number, onComplete?: () => void) {
  database.transaction(
    (transaction: Transaction) => {
      transaction.executeSql('DELETE FROM ideas WHERE id = ?', [id]);
    },
    undefined,
    onComplete,
  );
}

export function replaceIdeas(ideas: DraftIdea[], onComplete?: () => void) {
  database.transaction(
    (transaction: Transaction) => {
      transaction.executeSql('DELETE FROM ideas');
      ideas.forEach((input) => {
        const idea = sanitizeIdeaDraft(input);
        transaction.executeSql(
          `INSERT INTO ideas (title, notes, rating, audience, moat, channel, nextExperiment, pricing, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            idea.title,
            idea.notes,
            idea.rating,
            idea.audience,
            idea.moat,
            idea.channel,
            idea.nextExperiment,
            idea.pricing,
            new Date().toISOString(),
          ],
        );
      });
    },
    undefined,
    onComplete,
  );
}
