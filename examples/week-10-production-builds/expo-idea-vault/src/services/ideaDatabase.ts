import * as SQLite from 'expo-sqlite';

import { ideaTemplates } from '../data/ideaTemplates';
import { sanitizeIdeaDraft } from '../utils/ideaBackup';
import type { DraftIdea, IdeaRecord } from '../types';

const database = SQLite.openDatabaseSync('idea-vault.db');

export function initializeIdeaDatabase() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      notes TEXT NOT NULL,
      rating INTEGER NOT NULL,
      market TEXT NOT NULL,
      revenueModel TEXT NOT NULL,
      nextStep TEXT NOT NULL,
      contact TEXT NOT NULL,
      problem TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  const row = database.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM ideas');
  if ((row?.count ?? 0) === 0) {
    ideaTemplates.forEach((template) => insertIdea(template.draft));
  }
}

export function listIdeas(): IdeaRecord[] {
  return database.getAllSync<IdeaRecord>('SELECT * FROM ideas ORDER BY rating DESC, updatedAt DESC');
}

export function insertIdea(input: DraftIdea) {
  const idea = sanitizeIdeaDraft(input);
  database.runSync(
    `INSERT INTO ideas (title, notes, rating, market, revenueModel, nextStep, contact, problem, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      idea.title,
      idea.notes,
      idea.rating,
      idea.market,
      idea.revenueModel,
      idea.nextStep,
      idea.contact,
      idea.problem,
      new Date().toISOString(),
    ],
  );
}

export function deleteIdea(id: number) {
  database.runSync('DELETE FROM ideas WHERE id = ?', [id]);
}

export function replaceIdeas(ideas: DraftIdea[]) {
  database.withTransactionSync(() => {
    database.execSync('DELETE FROM ideas');
    ideas.forEach((idea) => insertIdea(idea));
  });
}
