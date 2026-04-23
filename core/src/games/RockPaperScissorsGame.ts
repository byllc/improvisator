/**
 * Rock Paper Scissors (Justify Edition)
 *
 * Player picks rock, paper, or scissors.
 * The game then generates a random thing and a statement that either:
 * - "<thing> beats <choice>"
 * - "<choice> beats <thing>"
 *
 * The player must justify why the statement is true.
 */

export type RockPaperScissorsChoice = 'rock' | 'paper' | 'scissors';

export interface RockPaperScissorsRound {
  playerChoice: RockPaperScissorsChoice;
  thing: string;
  statement: string;
  playerWins: boolean;
}

export interface RockPaperScissorsGameConfig {
  things?: string[];
  timeoutSeconds?: number;
}

const ADJECTIVES = [
  'angry', 'tiny', 'gigantic', 'melting', 'sparkly', 'haunted', 'confused', 'sleepy', 'shiny', 'crooked',
  'screaming', 'invisible', 'awkward', 'furious', 'fragile', 'radioactive', 'rubber', 'mysterious', 'ancient', 'neon',
  'grumpy', 'slippery', 'heroic', 'cursed', 'smug', 'frozen', 'exploding', 'wobbly', 'legendary', 'chaotic',
  'sticky', 'hollow', 'spicy', 'dramatic', 'elegant', 'reckless', 'moody', 'toxic', 'nervous', 'glorious'
];

const NOUNS = [
  'toaster', 'backpack', 'statue', 'planet', 'cucumber', 'trombone', 'pirate', 'submarine', 'vampire', 'lawnmower',
  'sandwich', 'umbrella', 'volcano', 'robot', 'dumpster', 'hamster', 'scooter', 'blender', 'saxophone', 'wizard',
  'microwave', 'taxi', 'castle', 'marshmallow', 'banana'
];

const DEFAULT_THINGS = ADJECTIVES.flatMap((adjective) =>
  NOUNS.map((noun) => `${adjective} ${noun}`)
);

export class RockPaperScissorsGame {
  private things: string[];
  private timeoutSeconds: number;
  private currentRound: RockPaperScissorsRound | null = null;

  constructor(config: RockPaperScissorsGameConfig = {}) {
    this.things = config.things || DEFAULT_THINGS;
    this.timeoutSeconds = config.timeoutSeconds || 45;

    if (this.things.length === 0) {
      throw new Error('RockPaperScissorsGame requires at least one thing');
    }
  }

  generateRound(playerChoice: RockPaperScissorsChoice): RockPaperScissorsRound {
    if (!this.isValidChoice(playerChoice)) {
      throw new Error('Choice must be rock, paper, or scissors');
    }

    const thing = this.things[Math.floor(Math.random() * this.things.length)];
    const playerWins = Math.random() >= 0.5;
    const statement = playerWins
      ? `${playerChoice} beats ${thing}`
      : `${thing} beats ${playerChoice}`;

    this.currentRound = {
      playerChoice,
      thing,
      statement,
      playerWins
    };

    return this.currentRound;
  }

  getCurrentRound(): RockPaperScissorsRound {
    if (!this.currentRound) {
      throw new Error('No round generated yet. Call generateRound() first.');
    }

    return this.currentRound;
  }

  getRules(): string {
    return `Rock Paper Scissors (Justify Edition) Rules:
1. Pick rock, paper, or scissors
2. The app gives a random thing from a list of ${this.things.length}
3. You get a statement in one of two forms:
   - <thing> beats <your choice>
   - <your choice> beats <thing>
4. You have ${this.timeoutSeconds} seconds to justify why that is true`;
  }

  validateScore(score: number): boolean {
    return Number.isInteger(score) && score >= 0 && score <= 100;
  }

  getThingCount(): number {
    return this.things.length;
  }

  getTimeout(): number {
    return this.timeoutSeconds;
  }

  private isValidChoice(choice: string): choice is RockPaperScissorsChoice {
    return choice === 'rock' || choice === 'paper' || choice === 'scissors';
  }
}