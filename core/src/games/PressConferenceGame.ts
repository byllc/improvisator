/**
 * Press Conference Game
 *
 * One player is a celebrity or public figure who just did something absurd.
 * They hold a press conference and answer questions from other players acting as reporters.
 * Useful for developing character commitment, quick thinking, and comedic deflection.
 */

export interface PressConferenceGameConfig {
  celebrities?: string[];
  events?: string[];
  timeoutSeconds?: number;
}

const DEFAULT_CELEBRITIES = [
  'A-list actor',
  'pop star',
  'senator',
  'tech CEO',
  'Olympic gold medalist',
  'reality TV star',
  'famous chef',
  'social media influencer',
  'retired president',
  'late night host',
  'sports legend',
  'Grammy winner',
  'Oscar winner',
  'billionaire entrepreneur',
  'supermodel',
  'world champion boxer',
  'country music star',
  'boy band member',
  'talk show host',
  'news anchor',
  'YouTube star',
  'TikTok influencer',
  'Nobel Prize winner',
  'best-selling author',
  'Broadway star',
  'Oscar-nominated director',
  'former child star',
  'reality TV villain',
  'dating show contestant',
  'professional golfer',
  'retired astronaut',
  'disgraced politician',
  'beloved children\'s TV host',
  'extreme sports legend',
  'famous life coach',
  'notorious art world figure',
  'legendary rock guitarist',
  'professional competitive eater',
  'famous trial lawyer',
  'renowned wildlife photographer',
];

const DEFAULT_EVENTS = [
  'declared themselves the rightful owner of the moon',
  'replaced their entire entourage with trained geese',
  'attempted to purchase a small country via eBay',
  'announced they will only answer to their spirit name: "Thunder Eagle"',
  'gave a speech entirely in pig Latin at the United Nations',
  'launched a line of furniture that is also technically food',
  'filed a trademark claim on the color beige',
  'released a 6-hour ambient album of themselves breathing',
  'appeared at a state dinner wearing a snorkel and flippers',
  'claimed to have invented the high-five',
  'announced a run for mayor of a city they\'ve never visited',
  'replaced all their social media with a single blurry photo of a spoon',
  'sued a cloud for blocking their sunlight',
  'paid $40 million for a jar of air from their hometown',
  'announced they will only communicate via interpretive dance for 30 days',
  'tried to legally adopt a highway, a river, and a Tuesday',
  'wore a full suit of armor to a beach wedding',
  'revealed their dog is their official "creative director"',
  'signed a legally binding contract with a vending machine',
  'published a memoir written entirely in emojis',
  'opened a restaurant where the menu changes based on "the vibe"',
  'quit their last job via skywriting',
  'started a public feud with a stop sign',
  'applied for a patent on their "signature wave"',
  'announced a world tour with stops in places that don\'t exist',
  'held a press conference on top of a horse',
  'issued a formal apology to gravity',
  'declared that sleep is just "society\'s opinion"',
  'trademarked the phrase "good morning"',
  'attempted to negotiate a peace treaty between two neighborhood squirrels',
  'claimed they invented the weekend',
  'announced a lifestyle brand called "Beige but Make It Emotional"',
  'hired a professional to blink for them during meetings',
  'released a single that is just 3 minutes and 47 seconds of silence, titled "You Get It"',
  'told a UN summit they had "solved weekdays"',
  'announced their next project will be performed exclusively for houseplants',
  'listed their childhood home on Airbnb as a "spiritual experience"',
  'claimed their pet fish has better business instincts than their accountant',
  'auctioned off the rights to say their name for one calendar year',
  'declared that socks are "society gaslit onto your feet"',
];

export class PressConferenceGame {
  private celebrities: string[];
  private events: string[];
  private timeoutSeconds: number;
  private currentCelebrity: string | null = null;
  private currentEvent: string | null = null;

  constructor(config: PressConferenceGameConfig = {}) {
    this.celebrities = config.celebrities || DEFAULT_CELEBRITIES;
    this.events = config.events || DEFAULT_EVENTS;
    this.timeoutSeconds = config.timeoutSeconds || 180;

    if (this.celebrities.length === 0) {
      throw new Error('PressConferenceGame requires at least one celebrity type');
    }
    if (this.events.length === 0) {
      throw new Error('PressConferenceGame requires at least one event');
    }
  }

  /**
   * Generate a random press conference scenario
   */
  getRandomScenario(): string {
    this.currentCelebrity =
      this.celebrities[Math.floor(Math.random() * this.celebrities.length)];
    this.currentEvent =
      this.events[Math.floor(Math.random() * this.events.length)];

    return this.formatScenario(this.currentCelebrity, this.currentEvent);
  }

  /**
   * Get the current scenario (without randomizing)
   */
  getCurrentScenario(): string {
    if (!this.currentCelebrity || !this.currentEvent) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.formatScenario(this.currentCelebrity, this.currentEvent);
  }

  /**
   * Get just the celebrity type
   */
  getCurrentCelebrity(): string {
    if (!this.currentCelebrity) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.currentCelebrity;
  }

  /**
   * Get just the absurd event
   */
  getCurrentEvent(): string {
    if (!this.currentEvent) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.currentEvent;
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
    return `Press Conference Game Rules:
1. One player is the celebrity — they just did the thing on the card. No backing down.
2. All other players are reporters. You have ${this.timeoutSeconds} seconds to ask as many questions as possible.
3. The celebrity must answer every question in character, with total commitment.
4. Reporters score points for the most creative/destabilizing questions.
5. The celebrity scores points for never breaking character.`;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Get total number of celebrity types
   */
  getCelebrityCount(): number {
    return this.celebrities.length;
  }

  /**
   * Get total number of events
   */
  getEventCount(): number {
    return this.events.length;
  }

  /**
   * Get total possible scenario combinations
   */
  getScenarioCount(): number {
    return this.celebrities.length * this.events.length;
  }

  private formatScenario(celebrity: string, event: string): string {
    const article = this.startsWithVowel(celebrity) ? 'An' : 'A';
    return `${article} ${celebrity} has just ${event}.`;
  }

  private startsWithVowel(word: string): boolean {
    return /^[aeiou]/i.test(word);
  }
}
