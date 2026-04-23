/**
 * Bad Advice Game
 *
 * Players are given a random problem and must give the absolute worst possible advice
 * while sounding completely confident, authoritative, and well-meaning.
 * Example: "My soufflé keeps collapsing" → deliver catastrophically bad but sincere advice.
 * Useful for developing authority, commitment, and comedic timing.
 */

export interface BadAdviceGameConfig {
  problems?: string[];
  timeoutSeconds?: number;
}

const DEFAULT_PROBLEMS = [
  // Food & cooking
  'My soufflé keeps collapsing',
  'I burned dinner again and guests arrive in 20 minutes',
  'I accidentally made the soup way too salty',
  'I can\'t stop eating cereal at 2am',
  'My homemade bread comes out like a brick every time',
  'I keep forgetting to eat breakfast',
  'I made too much pasta and don\'t know what to do with it',
  'My coffee always goes cold before I finish it',

  // Relationships
  'My partner and I keep arguing about money',
  'I have a crush on my coworker',
  'My best friend is always late to everything',
  'My roommate never does the dishes',
  'I haven\'t talked to my parents in a month',
  'I forgot my anniversary',
  'My friend group is falling apart',
  'I don\'t know how to break up with someone nicely',

  // Work & career
  'I\'m procrastinating on a huge work project',
  'I think I said something weird in a meeting',
  'I don\'t know how to ask for a raise',
  'I\'m bored at my job but scared to quit',
  'I sent an email to the wrong person',
  'I have a job interview tomorrow and I\'m not prepared',
  'My boss doesn\'t seem to like me',
  'I keep missing deadlines',

  // Health & wellness
  'I haven\'t exercised in six months',
  'I can\'t fall asleep before 2am',
  'I drink too much coffee',
  'My back hurts from sitting at a desk all day',
  'I keep getting headaches and I don\'t know why',
  'I stress eat whenever things get hard',
  'I can\'t stop doom-scrolling on my phone',
  'I haven\'t been to the dentist in three years',

  // Money & finances
  'I\'m terrible at saving money',
  'I have too much credit card debt',
  'I impulse bought something I can\'t afford',
  'I haven\'t filed my taxes yet',
  'I have no idea what a 401k is',
  'I spent my rent money on concert tickets',
  'I keep overdrafting my bank account',
  'I don\'t have an emergency fund',

  // Social & life
  'I said something embarrassing at a party last night',
  'I can\'t stop apologizing for everything',
  'I have to give a speech and I\'m terrified of public speaking',
  'I keep canceling plans at the last minute',
  'I don\'t know how to make new friends as an adult',
  'I\'ve been wearing the same outfit for three days',
  'I left my umbrella somewhere and it\'s raining',
  'I can\'t parallel park to save my life',
  'I lost my keys again',
  'I accidentally liked a photo from 4 years ago on someone\'s Instagram',
];

export class BadAdviceGame {
  private problems: string[];
  private timeoutSeconds: number;
  private currentProblem: string | null = null;

  constructor(config: BadAdviceGameConfig = {}) {
    this.problems = config.problems || DEFAULT_PROBLEMS;
    this.timeoutSeconds = config.timeoutSeconds || 60;

    if (this.problems.length === 0) {
      throw new Error('BadAdviceGame requires at least one problem');
    }
  }

  /**
   * Get a random problem to solve (badly)
   */
  getRandomProblem(): string {
    this.currentProblem = this.problems[Math.floor(Math.random() * this.problems.length)];
    return this.currentProblem;
  }

  /**
   * Get the current problem (without randomizing)
   */
  getCurrentProblem(): string {
    if (!this.currentProblem) {
      throw new Error('No problem selected yet. Call getRandomProblem() first.');
    }
    return this.currentProblem;
  }

  /**
   * Validate a player score (0-100)
   */
  validateScore(score: number): boolean {
    return Number.isInteger(score) && score >= 0 && score <= 100;
  }

  /**
   * Get game rules
   */
  getRules(): string {
    return `Bad Advice Rules:
1. Read the problem aloud.
2. Player has ${this.timeoutSeconds} seconds to give the most catastrophically bad advice they can — delivered with total sincerity and confidence.
3. No hesitation, no winking at the audience. You genuinely believe this is good advice.
4. Audience scores on how confidently terrible the advice is.`;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Get total number of problems
   */
  getProblemCount(): number {
    return this.problems.length;
  }
}
