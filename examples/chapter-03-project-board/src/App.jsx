import { Board } from './components/Board';

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'c1', title: 'Kickoff meeting', owner: 'Mira' },
      { id: 'c2', title: 'Create wireframes', owner: 'Arun' },
    ],
  },
  {
    id: 'doing',
    title: 'In Progress',
    cards: [
      { id: 'c3', title: 'Build prototype', owner: 'Jordan' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'c4', title: 'Stakeholder review', owner: 'Lena' },
    ],
  },
];

export function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Project Board</h1>
      <Board columns={columns} />
    </div>
  );
}
