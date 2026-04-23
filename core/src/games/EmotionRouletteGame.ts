/**
 * Emotion Roulette Game
 *
 * Players are given a random action and a random emotion.
 * They must perform the action while embodying that emotion.
 * Example: "Explain quantum physics... but DESPERATELY"
 * Useful for developing emotional range, physicality, and commitment.
 */

export interface EmotionRouletteGameConfig {
  actions?: string[];
  emotions?: string[];
  timeoutSeconds?: number;
}

const DEFAULT_ACTIONS = [
  'Explain quantum physics',
  'Teach someone to ride a bike',
  'Order a pizza',
  'Break up with someone',
  'Apply for a job',
  'Return a defective product',
  'Ask for a raise',
  'Apologize to a neighbor',
  'Explain why you\'re late',
  'Give a wedding toast',
  'Deliver a eulogy',
  'Read the terms and conditions',
  'Explain the rules of chess',
  'Teach a yoga class',
  'Narrate a nature documentary',
  'Describe your commute',
  'Explain how a microwave works',
  'Pitch a reality TV show',
  'Give a TED Talk about sandwiches',
  'Review a restaurant you\'ve never been to',
  'Describe the plot of a movie you haven\'t seen',
  'Sell a used couch',
  'Report the weather',
  'Teach someone to parallel park',
  'Announce a flight delay',
  'Describe a traffic jam',
  'Give a tour of your childhood bedroom',
  'Explain cryptocurrency',
  'Read a grocery list',
  'Narrate someone else\'s life choices',
  'Describe a color to a blind person',
  'Teach someone how to use a vending machine',
  'Explain why the internet is down',
  'Give directions to somewhere you\'ve never been',
  'Review your own performance review',
  'Describe the contents of your fridge',
  'Pitch an app that already exists',
  'Explain what a napkin is',
  'Announce a sporting event no one cares about',
  'Read a shampoo bottle',
  'Teach someone to shake hands',
  'Describe the plot of your life so far',
  'Explain morning routines',
  'Give a press conference about nothing',
  'Describe the sensation of sneezing',
  'Teach someone how to make toast',
  'Explain why the sky is blue',
  'Report live from a parking lot',
  'Deliver a motivational speech about doing laundry',
  'Explain why you called',
];

const DEFAULT_EMOTIONS = [
  'desperately',
  'seductively',
  'terrified',
  'furiously',
  'in complete ecstasy',
  'profoundly bored',
  'inconsolably sad',
  'suspiciously',
  'smugly',
  'in a blind panic',
  'passive-aggressively',
  'absolutely disgusted',
  'overly formal',
  'embarrassingly excited',
  'holding back tears',
  'barely containing rage',
  'deeply confused',
  'robotically',
  'with unbearable guilt',
  'hopelessly in love',
  'in existential crisis',
  'unreasonably proud',
  'politely horrified',
  'childishly',
  'like it\'s the end of the world',
  'sarcastically',
  'with intense reverence',
  'like you just won the lottery',
  'like you just lost the lottery',
  'completely numb',
  'manic with joy',
  'deeply offended',
  'like no one is listening',
  'in slow motion',
  'like you\'re narrating a film noir',
  'with reckless optimism',
  'like you\'re about to be fired',
  'like you\'re already fired',
  'in the style of a Shakespearean villain',
  'like everything is fine but nothing is fine',
  'as if your life depends on it',
  'with a complete absence of irony',
  'while pretending to be calm',
  'aggressively cheerfully',
  'like you haven\'t slept in 72 hours',
  'like you just discovered fire',
  'as if being watched by thousands',
  'while suppressing a breakdown',
  'with the energy of someone who just had too much coffee',
  'like it\'s a deeply personal affront',
];

export class EmotionRouletteGame {
  private actions: string[];
  private emotions: string[];
  private timeoutSeconds: number;
  private currentAction: string | null = null;
  private currentEmotion: string | null = null;

  constructor(config: EmotionRouletteGameConfig = {}) {
    this.actions = config.actions || DEFAULT_ACTIONS;
    this.emotions = config.emotions || DEFAULT_EMOTIONS;
    this.timeoutSeconds = config.timeoutSeconds || 60;

    if (this.actions.length === 0) {
      throw new Error('EmotionRouletteGame requires at least one action');
    }
    if (this.emotions.length === 0) {
      throw new Error('EmotionRouletteGame requires at least one emotion');
    }
  }

  /**
   * Generate a random action + emotion prompt
   */
  getRandomPrompt(): string {
    this.currentAction = this.actions[Math.floor(Math.random() * this.actions.length)];
    this.currentEmotion = this.emotions[Math.floor(Math.random() * this.emotions.length)];
    return this.formatPrompt(this.currentAction, this.currentEmotion);
  }

  /**
   * Get the current prompt (without randomizing)
   */
  getCurrentPrompt(): string {
    if (!this.currentAction || !this.currentEmotion) {
      throw new Error('No prompt selected yet. Call getRandomPrompt() first.');
    }
    return this.formatPrompt(this.currentAction, this.currentEmotion);
  }

  /**
   * Get just the current action
   */
  getCurrentAction(): string {
    if (!this.currentAction) {
      throw new Error('No prompt selected yet. Call getRandomPrompt() first.');
    }
    return this.currentAction;
  }

  /**
   * Get just the current emotion
   */
  getCurrentEmotion(): string {
    if (!this.currentEmotion) {
      throw new Error('No prompt selected yet. Call getRandomPrompt() first.');
    }
    return this.currentEmotion;
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
    return `Emotion Roulette Rules:
1. Spin to get a random action and emotion.
2. Player has ${this.timeoutSeconds} seconds to perform the action while fully embodying the emotion.
3. No half-measures — commit to the emotion from the first word.
4. Audience scores based on how convincingly the emotion colors every moment of the performance.`;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Get total number of actions
   */
  getActionCount(): number {
    return this.actions.length;
  }

  /**
   * Get total number of emotions
   */
  getEmotionCount(): number {
    return this.emotions.length;
  }

  /**
   * Get total possible prompt combinations
   */
  getCombinationCount(): number {
    return this.actions.length * this.emotions.length;
  }

  private formatPrompt(action: string, emotion: string): string {
    return `${action}... but ${emotion.toUpperCase()}`;
  }
}
