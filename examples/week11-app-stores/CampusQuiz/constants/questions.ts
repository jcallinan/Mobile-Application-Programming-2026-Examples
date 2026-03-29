/**
 * constants/questions.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * All trivia question data for CampusQuiz.
 *
 * Structure
 * ─────────
 *  Category → array of Question objects
 *
 *  Question shape:
 *    id        string   — unique identifier (category prefix + number)
 *    question  string   — the question text
 *    options   string[] — exactly 4 answer choices
 *    answer    number   — 0-based index of the correct option in `options`
 *    fact      string   — fun fact shown after answering (correct or wrong)
 *
 * Tips for adding more questions:
 *  • Keep questions at a moderate difficulty — they're meant to be fun
 *  • The `fact` field is a great place to sneak in interesting Pitt/Bradford info
 *  • Always verify `answer` index after reordering options
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;        // Index into `options` that is correct
  fact: string;          // Displayed after the user answers
}

export interface Category {
  id: string;
  title: string;
  icon: string;          // Emoji icon used in the category picker
  color: string;         // Accent color for the category card
  questions: Question[];
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [

  // ── 1. Pitt Bradford Campus ──────────────────────────────────────────────────
  {
    id: 'upb',
    title: 'Pitt Bradford',
    icon: '🎓',
    color: '#1E3468',
    questions: [
      {
        id: 'upb-01',
        question: 'What year was the University of Pittsburgh at Bradford established?',
        options: ['1958', '1963', '1967', '1972'],
        answer: 1,
        fact: 'Pitt Bradford was established in 1963 and held its first classes in the fall of that year.',
      },
      {
        id: 'upb-02',
        question: 'What are the official colors of Pitt Bradford?',
        options: ['Blue and White', 'Navy and Gold', 'Blue and Yellow', 'Gold and Black'],
        answer: 1,
        fact: 'Pitt Bradford\'s colors — Navy and Gold — trace back to William Pitt, the 1st Earl of Chatham, after whom Pittsburgh was named.',
      },
      {
        id: 'upb-03',
        question: 'What is the name of the athletic teams at Pitt Bradford?',
        options: ['Panthers', 'Lions', 'Eagles', 'Bears'],
        answer: 0,
        fact: 'Pitt Bradford Panthers compete in NCAA Division III athletics. Go Panthers!',
      },
      {
        id: 'upb-04',
        question: 'In which city is the University of Pittsburgh at Bradford located?',
        options: ['Pittsburgh', 'Erie', 'Bradford', 'Altoona'],
        answer: 2,
        fact: 'Bradford, PA is in McKean County — home to a rich petroleum history and the Zippo lighter factory.',
      },
      {
        id: 'upb-05',
        question: 'Which conference does Pitt Bradford compete in for athletics?',
        options: ['Allegheny Mountain Collegiate Conference', 'Pennsylvania Athletic Conference', 'Empire 8', 'North Eastern Athletic Conference'],
        answer: 0,
        fact: 'The AMCC was formed in 1993 and features small Division III schools across Pennsylvania, New York, and West Virginia.',
      },
      {
        id: 'upb-06',
        question: 'What is the main campus landmark building at Pitt Bradford?',
        options: ['Frame Westerberg Commons', 'Blaisdell Hall', 'Swarts Hall', 'Hanley Library'],
        answer: 0,
        fact: 'Frame Westerberg Commons is the social hub of campus, housing dining, student organizations, and recreation spaces.',
      },
      {
        id: 'upb-07',
        question: 'Which research area is Pitt Bradford particularly known for regionally?',
        options: ['Marine Biology', 'Petroleum & Natural Gas', 'Aerospace Engineering', 'Biotechnology'],
        answer: 1,
        fact: 'Bradford, PA was one of the first oil boom towns in the United States — Pitt Bradford reflects this heritage in its programs.',
      },
      {
        id: 'upb-08',
        question: 'What is Pitt Bradford\'s student-to-faculty ratio (approximate)?',
        options: ['30:1', '20:1', '14:1', '8:1'],
        answer: 2,
        fact: 'Pitt Bradford\'s small class sizes (~14:1) mean students get personal attention — a big advantage over large research campuses.',
      },
      {
        id: 'upb-09',
        question: 'What library serves the Pitt Bradford campus?',
        options: ['Hillman Library', 'Hanley Library', 'Darlington Library', 'Frick Fine Arts Library'],
        answer: 1,
        fact: 'Hanley Library on the Bradford campus provides research support and access to the full Pitt library system.',
      },
      {
        id: 'upb-10',
        question: 'Pitt Bradford is classified as what type of institution?',
        options: ['Private Research University', 'Community College', 'Public Liberal Arts Campus', 'Technical College'],
        answer: 2,
        fact: 'Pitt Bradford is a public liberal arts campus — combining the personalized feel of a small college with the Pitt name and resources.',
      },
    ],
  },

  // ── 2. Computer Science ───────────────────────────────────────────────────────
  {
    id: 'cs',
    title: 'Computer Science',
    icon: '💻',
    color: '#1A4D5E',
    questions: [
      {
        id: 'cs-01',
        question: 'What does "RAM" stand for?',
        options: ['Random Access Memory', 'Read All Memory', 'Run Application Mode', 'Rapid Access Module'],
        answer: 0,
        fact: 'RAM is volatile memory — it loses its contents when power is removed, unlike SSD or HDD storage.',
      },
      {
        id: 'cs-02',
        question: 'Which programming language is primarily used for iOS development?',
        options: ['Kotlin', 'Swift', 'Python', 'Ruby'],
        answer: 1,
        fact: 'Apple introduced Swift in 2014. Before Swift, Objective-C was the language of choice for iOS development.',
      },
      {
        id: 'cs-03',
        question: 'What does "SQL" stand for?',
        options: ['Structured Query Language', 'Simple Question Logic', 'System Queue Layer', 'Sequential Queue Lookup'],
        answer: 0,
        fact: 'SQL was developed at IBM in the 1970s. It remains the dominant language for relational databases 50+ years later.',
      },
      {
        id: 'cs-04',
        question: 'What does "HTTP" stand for?',
        options: ['HyperText Transfer Protocol', 'High Tech Text Processor', 'Hybrid Transfer Text Platform', 'Home Terminal Transfer Protocol'],
        answer: 0,
        fact: 'HTTP/3, released in 2022, uses the QUIC protocol over UDP instead of TCP, making web browsing significantly faster.',
      },
      {
        id: 'cs-05',
        question: 'In React Native, which component is used for scrollable lists?',
        options: ['ScrollView', 'FlatList', 'ListView', 'Both A and B'],
        answer: 3,
        fact: 'FlatList is preferred for long lists because it only renders visible items (virtualization). ScrollView renders everything at once.',
      },
      {
        id: 'cs-06',
        question: 'What does "API" stand for?',
        options: ['Application Programming Interface', 'Automated Protocol Integration', 'Advanced Process Instruction', 'Application Process Interconnect'],
        answer: 0,
        fact: 'The concept of an API predates the web — the term was used in the 1960s to describe interfaces between software programs.',
      },
      {
        id: 'cs-07',
        question: 'Which of these is a NoSQL database?',
        options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
        answer: 2,
        fact: 'MongoDB stores data as BSON (Binary JSON) documents. The name comes from "humongous" — it was built for large-scale data.',
      },
      {
        id: 'cs-08',
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        answer: 2,
        fact: 'Binary search on 1 billion items takes at most ~30 comparisons. That\'s the power of O(log n).',
      },
      {
        id: 'cs-09',
        question: 'In React Native, what hook manages local component state?',
        options: ['useEffect', 'useState', 'useRef', 'useMemo'],
        answer: 1,
        fact: 'useState returns a [value, setter] pair. The setter triggers a re-render of the component whenever state changes.',
      },
      {
        id: 'cs-10',
        question: 'What file format does Expo use for configuration?',
        options: ['config.xml', 'expo.config.json', 'app.json', 'manifest.json'],
        answer: 2,
        fact: 'app.json (or app.config.js for dynamic config) controls your app name, icons, permissions, and store metadata.',
      },
    ],
  },

  // ── 3. Pennsylvania History ────────────────────────────────────────────────
  {
    id: 'pa',
    title: 'Pennsylvania',
    icon: '🏛️',
    color: '#3D1A5E',
    questions: [
      {
        id: 'pa-01',
        question: 'What was the first oil well in the United States, drilled in 1859?',
        options: ['Bradford Well', 'Drake Well', 'Titusville Spring', 'Oil Creek Shaft'],
        answer: 1,
        fact: 'The Drake Well in Titusville, PA launched the global petroleum industry. The site is now a museum about 30 miles from Bradford.',
      },
      {
        id: 'pa-02',
        question: 'What is the capital of Pennsylvania?',
        options: ['Philadelphia', 'Pittsburgh', 'Harrisburg', 'Allentown'],
        answer: 2,
        fact: 'Harrisburg has been Pennsylvania\'s capital since 1812. The state capitol building\'s dome was modeled after St. Peter\'s Basilica in Rome.',
      },
      {
        id: 'pa-03',
        question: 'Which battle, fought in Pennsylvania, was the bloodiest of the Civil War?',
        options: ['Antietam', 'Gettysburg', 'Bull Run', 'Shiloh'],
        answer: 1,
        fact: 'The Battle of Gettysburg (July 1–3, 1863) resulted in about 51,000 casualties over three days, turning the tide of the Civil War.',
      },
      {
        id: 'pa-04',
        question: 'Pennsylvania was founded by which Quaker leader in 1681?',
        options: ['William Bradford', 'William Penn', 'Benjamin Franklin', 'John Dickinson'],
        answer: 1,
        fact: 'William Penn received the Pennsylvania charter as payment of a debt King Charles II owed his father. Penn envisioned it as a "holy experiment" in religious tolerance.',
      },
      {
        id: 'pa-05',
        question: 'What county is Bradford, PA located in?',
        options: ['Bradford County', 'McKean County', 'Warren County', 'Potter County'],
        answer: 1,
        fact: 'McKean County was formed in 1804 and named after Thomas McKean, a signer of the Declaration of Independence and Governor of Pennsylvania.',
      },
      {
        id: 'pa-06',
        question: 'Which famous Pennsylvania-born inventor created the Zippo lighter?',
        options: ['Thomas Edison', 'George Westinghouse', 'George Blaisdell', 'Nikola Tesla'],
        answer: 2,
        fact: 'George Blaisdell invented the Zippo lighter in Bradford, PA in 1932. The Zippo factory and museum are still there today!',
      },
      {
        id: 'pa-07',
        question: 'What is Pennsylvania\'s nickname?',
        options: ['The Keystone State', 'The Quaker State', 'The Coal State', 'The Steel State'],
        answer: 0,
        fact: 'Pennsylvania is the "Keystone State" — like the central keystone of an arch, it was central among the original 13 colonies.',
      },
      {
        id: 'pa-08',
        question: 'Which river flows through Bradford, PA?',
        options: ['Allegheny River', 'Tunungwant Creek', 'Clarion River', 'Kinzua Creek'],
        answer: 1,
        fact: 'The Tunungwant Creek runs through Bradford and eventually flows into the Allegheny River. The name comes from the Seneca language.',
      },
      {
        id: 'pa-09',
        question: 'Pennsylvania was one of the original how many states to ratify the U.S. Constitution?',
        options: ['7', '13', '15', '50'],
        answer: 1,
        fact: 'Pennsylvania was the second state to ratify the Constitution in December 1787, just days after Delaware.',
      },
      {
        id: 'pa-10',
        question: 'What famous groundhog lives in Punxsutawney, PA?',
        options: ['Groundhog Gary', 'Punxsutawney Pete', 'Punxsutawney Phil', 'Pennsylvania Paul'],
        answer: 2,
        fact: 'Groundhog Day has been celebrated in Punxsutawney since 1887, drawing thousands of visitors every February 2nd.',
      },
    ],
  },

  // ── 4. Science & Nature ───────────────────────────────────────────────────
  {
    id: 'science',
    title: 'Science',
    icon: '🔬',
    color: '#1A4D2E',
    questions: [
      {
        id: 'sci-01',
        question: 'What is the chemical symbol for gold?',
        options: ['Go', 'Gd', 'Au', 'Ag'],
        answer: 2,
        fact: 'Au comes from "aurum," the Latin word for gold. Gold has been used in jewelry and coins for over 6,000 years.',
      },
      {
        id: 'sci-02',
        question: 'How many bones are in the adult human body?',
        options: ['196', '206', '216', '226'],
        answer: 1,
        fact: 'Babies are born with about 270–300 bones. Many fuse together during childhood, leaving adults with 206.',
      },
      {
        id: 'sci-03',
        question: 'What planet is known as the Red Planet?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        answer: 2,
        fact: 'Mars appears red because its surface is covered in iron oxide (rust). Its atmosphere is 95% carbon dioxide.',
      },
      {
        id: 'sci-04',
        question: 'What is the speed of light (approximate, in km/s)?',
        options: ['100,000', '300,000', '500,000', '1,000,000'],
        answer: 1,
        fact: 'Light travels at ~299,792 km/s in a vacuum. Light from the Sun takes about 8 minutes 20 seconds to reach Earth.',
      },
      {
        id: 'sci-05',
        question: 'What gas do plants absorb during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        answer: 2,
        fact: 'During photosynthesis, plants convert CO₂ + H₂O + light into glucose and oxygen — essentially running on air and sunlight.',
      },
      {
        id: 'sci-06',
        question: 'DNA stands for?',
        options: ['Deoxyribonucleic Acid', 'Dynamic Nucleic Array', 'Dual Nitrogen Amino', 'Deoxyribose Nitrogen Acid'],
        answer: 0,
        fact: 'The double-helix structure of DNA was described by Watson and Crick in 1953, using X-ray data largely produced by Rosalind Franklin.',
      },
      {
        id: 'sci-07',
        question: 'What force keeps planets in orbit around the Sun?',
        options: ['Magnetic Force', 'Nuclear Force', 'Gravity', 'Centrifugal Force'],
        answer: 2,
        fact: 'Newton\'s law of universal gravitation explains orbital motion. Einstein\'s general relativity later described gravity as a curvature of spacetime.',
      },
      {
        id: 'sci-08',
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Endoplasmic Reticulum', 'Mitochondria'],
        answer: 3,
        fact: 'Mitochondria produce ATP through cellular respiration. They have their own DNA, evidence they were once independent bacteria.',
      },
      {
        id: 'sci-09',
        question: 'Which element has the atomic number 1?',
        options: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],
        answer: 2,
        fact: 'Hydrogen is the most abundant element in the universe, making up about 75% of all normal matter by mass.',
      },
      {
        id: 'sci-10',
        question: 'What is the hardest natural substance on Earth?',
        options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
        answer: 2,
        fact: 'Diamond scores 10 on the Mohs hardness scale. It\'s made of pure carbon atoms arranged in a crystal lattice.',
      },
    ],
  },

  // ── 5. General Knowledge ─────────────────────────────────────────────────
  {
    id: 'general',
    title: 'General',
    icon: '🌍',
    color: '#4D2A1A',
    questions: [
      {
        id: 'gen-01',
        question: 'How many continents are there on Earth?',
        options: ['5', '6', '7', '8'],
        answer: 2,
        fact: 'The 7 continents are Africa, Antarctica, Asia, Australia/Oceania, Europe, North America, and South America.',
      },
      {
        id: 'gen-02',
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        answer: 3,
        fact: 'The Pacific Ocean covers about 165 million km² — more than all the world\'s land combined.',
      },
      {
        id: 'gen-03',
        question: 'Who painted the Mona Lisa?',
        options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Caravaggio'],
        answer: 2,
        fact: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It now lives in the Louvre, Paris, behind bulletproof glass.',
      },
      {
        id: 'gen-04',
        question: 'How many strings does a standard guitar have?',
        options: ['4', '5', '6', '8'],
        answer: 2,
        fact: 'A standard guitar has 6 strings tuned E-A-D-G-B-e from lowest to highest. Bass guitars typically have 4 strings.',
      },
      {
        id: 'gen-05',
        question: 'What year did the first iPhone release?',
        options: ['2005', '2006', '2007', '2008'],
        answer: 2,
        fact: 'Steve Jobs unveiled the original iPhone on January 9, 2007. It had no App Store — that launched a year later in 2008.',
      },
      {
        id: 'gen-06',
        question: 'How many players are on a standard basketball team on the court at one time?',
        options: ['4', '5', '6', '7'],
        answer: 1,
        fact: 'Basketball was invented by Dr. James Naismith in 1891 using peach baskets. The original game had 9 players per side.',
      },
      {
        id: 'gen-07',
        question: 'What is the tallest mountain in the world?',
        options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
        answer: 2,
        fact: 'Mount Everest stands at 8,849m (29,032 ft). Sir Edmund Hillary and Tenzing Norgay were first to summit it in 1953.',
      },
      {
        id: 'gen-08',
        question: 'What language has the most native speakers worldwide?',
        options: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'],
        answer: 2,
        fact: 'Mandarin Chinese has ~920 million native speakers. English is the most widely spoken language by total speakers when including second-language users.',
      },
      {
        id: 'gen-09',
        question: 'In what year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        answer: 2,
        fact: 'WWII ended in 1945 — V-E Day (Victory in Europe) on May 8, and V-J Day (Victory over Japan) on September 2.',
      },
      {
        id: 'gen-10',
        question: 'What is the chemical formula for water?',
        options: ['HO', 'H₂O', 'H₃O', 'OH₂'],
        answer: 1,
        fact: 'A water molecule is two hydrogen atoms covalently bonded to one oxygen. The slight polarity of H₂O is responsible for most of its remarkable properties.',
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Return a category by its ID string, or undefined if not found. */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id);
}

/** Return a shuffled copy of a question array (Fisher-Yates algorithm). */
export function shuffleQuestions(questions: Question[]): Question[] {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Return up to `count` random questions from an array. */
export function getRandomQuestions(questions: Question[], count: number): Question[] {
  return shuffleQuestions(questions).slice(0, count);
}
