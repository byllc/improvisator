/**
 * Headline Game
 * 
 * Players are given a headline and must come up with a news story to explain it.
 * Useful for developing quick thinking and creativity.
 */

export interface HeadlineGameConfig {
  headlines: string[];
  timeoutSeconds?: number;
}

export class HeadlineGame {
  private headlines: string[];
  private timeoutSeconds: number;
  private currentHeadlineIndex: number = -1;

  constructor(config: HeadlineGameConfig) {
    if (!config.headlines || config.headlines.length === 0) {
      throw new Error('HeadlineGame requires at least one headline');
    }
    this.headlines = config.headlines;
    this.timeoutSeconds = config.timeoutSeconds || 60;
  }

  /**
   * Get a random headline for the player
   */
  getRandomHeadline(): string {
    this.currentHeadlineIndex = Math.floor(Math.random() * this.headlines.length);
    return this.headlines[this.currentHeadlineIndex];
  }

  /**
   * Get the current headline (without randomizing)
   */
  getCurrentHeadline(): string {
    if (this.currentHeadlineIndex === -1) {
      throw new Error('No headline selected yet. Call getRandomHeadline() first.');
    }
    return this.headlines[this.currentHeadlineIndex];
  }

  /**
   * Validate a player score
   */
  validateScore(score: number): boolean {
    return Number.isInteger(score) && score >= 0 && score <= 100;
  }

  /**
   * Get game rules
   */
  getRules(): string {
    return `Headline Game Rules:
1. Player receives a random headline
2. Player has ${this.timeoutSeconds} seconds to create a news story explaining the headline
3. Scoring is out of 100 points
4. Judge awards points based on creativity, humor, and coherence`;
  }

  /**
   * Get the number of available headlines
   */
  getHeadlineCount(): number {
    return this.headlines.length;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }
}
