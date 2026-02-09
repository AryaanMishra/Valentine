export interface Memory {
  hash: string;
  date: string;
  title: string;
  type: 'feat' | 'fix' | 'chore' | 'refactor' | 'merge' | 'initial';
  description: string;
  tags?: string[];
  photos: string[];
}

export const memories: Memory[] = [
  {
    hash: 'init-2023',
    date: '2023',
    title: 'initial: Honeymoon Phase',
    type: 'initial',
    description: "The 'Initial Commit' of our lives. Back when everything felt brand new, wrapped in the scent of roses and the excitement of petals. Every moment was a discovery, and I knew right away this was the repository I wanted to contribute to forever.",
    tags: ['roses', 'new-beginnings', 'love', 'honeymoon'],
    photos: Array.from({ length: 10 }, (_, i) => `/memories/honeymoon/Honeymoon-${i + 1}.jpg`)
  },
  {
    hash: 'feat-merced',
    date: '2023',
    title: 'feat: Easy Times in Merced',
    type: 'feat',
    description: "The golden era of local hosting at UC Merced. From sharing CSE classes to those infinite nights in the parking lot where time stood still. We didn't need WiFi to connect; we had each other, all day, every day.",
    tags: ['uc-merced', 'parking-lot-dates', 'cse-majors', 'night-talks'],
    photos: Array.from({ length: 11 }, (_, i) => `/memories/Easy/Easy-${i + 1}.jpg`)
  },
  {
    hash: 'refactor-ldr',
    date: '2023',
    title: 'refactor: LDR Phase',
    type: 'refactor',
    description: "The 'Refactor' to a Distributed System. Moving to Berkeley tested our latency, but distance only proved one thing: my bandwidth for loving you is infinite. Every mile between us just made the packets of time we shared together worth so much more.",
    tags: ['berkeley', 'long-distance', 'missing-you', 'growth'],
    photos: Array.from({ length: 10 }, (_, i) => `/memories/LDR/LDR-${i + 1}.jpg`)
  },
  {
    hash: 'feat-current',
    date: '2026',
    title: 'feat: Current Phase',
    type: 'feat',
    description: "Shipping v3.0 in 2026. Three years later, and our codebase is more stable and happier than ever. Even if most of our 'interface' has been FaceTime screenshots lately, I'm so grateful for every pixel. We're not just maintaining; we're building a future.",
    tags: ['facetime', 'future-planning', '3-years', 'happy'],
    photos: Array.from({ length: 5 }, (_, i) => `/memories/current/current-${i + 1}.jpg`)
  },
  {
    hash: 'chore-her',
    date: 'Everyday',
    title: 'chore: Her Being Her',
    type: 'chore',
    description: "The Core Features. Just you being unapologetically you. These are the candid moments, the unscripted functions, and the logic that makes my world make sense. This is the reason I love you.",
    tags: ['candid', 'love-her', 'my-person', 'everything'],
    photos: Array.from({ length: 12 }, (_, i) => `/memories/her-/her-${i + 1}.jpg`)
  },
  {
    hash: 'fix-sleep',
    date: 'Nights',
    title: 'fix: Sleeping Beauty',
    type: 'fix',
    description: "System in Sleep Mode. Proof that you're the cutest even when running background processes. Peaceful, beautiful, and the only view I want to wake up to.",
    tags: ['sleeping', 'cute', 'peaceful', 'dreaming'],
    photos: Array.from({ length: 6 }, (_, i) => `/memories/sleep-/sleep-${i + 1}.jpg`)
  }
];
