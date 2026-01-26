/**
 * Who The Fuck Game
 * 
 * Players are given a random character (profession + descriptive trait)
 * and must improvise as that character.
 * Example: "A neurotic firefighter" or "An optimistic mortician"
 */

export interface WhoTheFuckGameConfig {
  professions?: string[];
  descriptives?: string[];
  timeoutSeconds?: number;
}

const DEFAULT_PROFESSIONS = [
  'firefighter', 'surgeon', 'mortician', 'astronaut', 'detective', 'chef',
  'librarian', 'mechanic', 'dentist', 'lawyer', 'therapist', 'bartender',
  'flight attendant', 'plumber', 'electrician', 'teacher', 'coach', 'DJ',
  'weatherperson', 'news anchor', 'politician', 'magician', 'clown', 'mime',
  'zookeeper', 'veterinarian', 'dog walker', 'pet groomer', 'taxidermist',
  'funeral director', 'wedding planner', 'divorce lawyer', 'marriage counselor',
  'life coach', 'yoga instructor', 'personal trainer', 'nutritionist', 'acupuncturist',
  'chiropractor', 'massage therapist', 'hair stylist', 'makeup artist', 'tattoo artist',
  'piercer', 'nail technician', 'beautician', 'barber', 'fashion designer',
  'tailor', 'seamstress', 'cobbler', 'locksmith', 'security guard', 'bouncer',
  'bodyguard', 'private investigator', 'bail bondsman', 'prison guard', 'parole officer',
  'social worker', 'guidance counselor', 'school principal', 'superintendent',
  'museum curator', 'tour guide', 'travel agent', 'cruise director', 'hotel manager',
  'concierge', 'bellhop', 'housekeeper', 'janitor', 'sanitation worker',
  'garbage collector', 'recycling coordinator', 'environmental scientist', 'park ranger',
  'forest ranger', 'lifeguard', 'swim instructor', 'scuba instructor', 'ski instructor',
  'mountain guide', 'safari guide', 'fishing guide', 'hunting guide', 'taxidermist',
  'auctioneer', 'pawn broker', 'antique dealer', 'art dealer', 'gallery owner',
  'street performer', 'busker', 'circus performer', 'acrobat', 'trapeze artist',
  'juggler', 'sword swallower', 'fire breather', 'escape artist', 'contortionist',
  'ventriloquist', 'puppeteer', 'marionette operator', 'town crier', 'court jester',
  'knight', 'executioner', 'royal food taster', 'blacksmith', 'farrier',
  'horse whisperer', 'dog trainer', 'cat behaviorist', 'animal control officer',
  'exterminator', 'pest control specialist', 'fumigator', 'hazmat technician',
  'bomb disposal expert', 'mine sweeper', 'explosive ordinance disposal', 'stunt double',
  'crash test dummy', 'professional mourner', 'line stander', 'professional cuddler',
  'fortune teller', 'palm reader', 'tarot card reader', 'psychic', 'medium',
  'exorcist', 'ghost hunter', 'paranormal investigator', 'cryptozoologist', 'UFO researcher',
  'conspiracy theorist', 'flat earther', 'time traveler', 'dimension hopper',
  'mall Santa', 'Easter Bunny', 'birthday party entertainer', 'balloon artist',
  'face painter', 'caricature artist', 'street artist', 'graffiti artist',
  'muralist', 'ice sculptor', 'sand sculptor', 'origami artist', 'paper folder',
  'bookmark maker', 'candle maker', 'soap maker', 'cheese maker', 'beer brewer',
  'wine maker', 'distiller', 'moonshiner', 'bootlegger', 'smuggler',
  'pirate', 'buccaneer', 'privateer', 'treasure hunter', 'gold prospector',
  'oil rig worker', 'coal miner', 'diamond miner', 'pearl diver', 'sponge diver',
  'underwater welder', 'submarine captain', 'cruise ship captain', 'ferry operator',
  'tugboat captain', 'harbor master', 'lighthouse keeper', 'bridge tender',
  'train conductor', 'engineer', 'switchman', 'railroad crossing guard', 'trolley driver',
  'bus driver', 'taxi driver', 'Uber driver', 'Lyft driver', 'limo driver',
  'chauffeur', 'valet', 'parking attendant', 'traffic cop', 'meter maid',
  'crossing guard', 'school bus driver', 'ambulance driver', 'paramedic', 'EMT',
  'ER doctor', 'ICU nurse', 'hospice nurse', 'midwife', 'doula',
  'lactation consultant', 'pediatrician', 'geriatrician', 'podiatrist', 'dermatologist',
  'ophthalmologist', 'optometrist', 'audiologist', 'speech therapist', 'occupational therapist',
  'physical therapist', 'respiratory therapist', 'radiation therapist', 'phlebotomist',
  'lab technician', 'X-ray technician', 'MRI technician', 'ultrasound technician',
  'pharmacist', 'pharmacy technician', 'pharmaceutical sales rep', 'medical device sales rep'
];

const DEFAULT_DESCRIPTIVES = [
  'neurotic', 'optimistic', 'pessimistic', 'sarcastic', 'enthusiastic', 'apathetic',
  'paranoid', 'confident', 'insecure', 'arrogant', 'humble', 'pretentious',
  'genuine', 'fake', 'dramatic', 'understated', 'flamboyant', 'reserved',
  'extroverted', 'introverted', 'aggressive', 'passive', 'passive-aggressive',
  'cheerful', 'gloomy', 'manic', 'depressed', 'bipolar', 'anxious',
  'zen', 'frantic', 'calm', 'chaotic', 'organized', 'messy',
  'punctual', 'chronically late', 'obsessive', 'lazy', 'workaholic', 'burnt out',
  'motivated', 'unmotivated', 'ambitious', 'complacent', 'competitive', 'collaborative',
  'selfish', 'selfless', 'narcissistic', 'self-deprecating', 'vain', 'unkempt',
  'fashionable', 'tacky', 'elegant', 'crude', 'sophisticated', 'juvenile',
  'mature', 'immature', 'wise', 'foolish', 'intelligent', 'dense',
  'street smart', 'book smart', 'naive', 'jaded', 'innocent', 'corrupt',
  'honest', 'dishonest', 'trustworthy', 'shady', 'reliable', 'flaky',
  'loyal', 'disloyal', 'faithful', 'promiscuous', 'prudish', 'perverted',
  'romantic', 'unromantic', 'passionate', 'cold', 'warm', 'distant',
  'clingy', 'independent', 'needy', 'self-sufficient', 'dependent', 'codependent',
  'adventurous', 'cautious', 'reckless', 'careful', 'brave', 'cowardly',
  'bold', 'timid', 'assertive', 'submissive', 'dominant', 'flexible',
  'stubborn', 'open-minded', 'closed-minded', 'judgmental', 'accepting', 'tolerant',
  'intolerant', 'progressive', 'conservative', 'radical', 'moderate', 'extreme',
  'balanced', 'unbalanced', 'stable', 'unstable', 'grounded', 'spacey',
  'focused', 'distracted', 'attentive', 'oblivious', 'observant', 'unaware',
  'perceptive', 'clueless', 'sharp', 'dull', 'witty', 'humorless',
  'funny', 'serious', 'playful', 'stern', 'lighthearted', 'heavy-handed',
  'gentle', 'rough', 'tender', 'harsh', 'kind', 'cruel',
  'compassionate', 'callous', 'empathetic', 'unsympathetic', 'caring', 'uncaring',
  'nurturing', 'neglectful', 'protective', 'indifferent', 'concerned', 'aloof',
  'involved', 'detached', 'engaged', 'disconnected', 'present', 'absent-minded',
  'mindful', 'careless', 'thoughtful', 'thoughtless', 'considerate', 'inconsiderate',
  'polite', 'rude', 'courteous', 'boorish', 'refined', 'vulgar',
  'classy', 'trashy', 'dignified', 'undignified', 'respectable', 'disreputable',
  'honorable', 'dishonorable', 'noble', 'ignoble', 'gallant', 'cowardly',
  'heroic', 'villainous', 'saintly', 'sinful', 'virtuous', 'wicked',
  'good', 'evil', 'moral', 'immoral', 'ethical', 'unethical'
];

export class WhoTheFuckGame {
  private professions: string[];
  private descriptives: string[];
  private timeoutSeconds: number;
  private currentCharacter: { descriptive: string; profession: string } | null = null;
  private isHidden: boolean = false;

  constructor(config: WhoTheFuckGameConfig = {}) {
    this.professions = config.professions || DEFAULT_PROFESSIONS;
    this.descriptives = config.descriptives || DEFAULT_DESCRIPTIVES;
    this.timeoutSeconds = config.timeoutSeconds || 120;

    if (this.professions.length === 0) {
      throw new Error('WhoTheFuckGame requires at least one profession');
    }
    if (this.descriptives.length === 0) {
      throw new Error('WhoTheFuckGame requires at least one descriptive');
    }
  }

  /**
   * Toggle whether the character is hidden from view (for audience guessing)
   */
  toggleHidden(): boolean {
    this.isHidden = !this.isHidden;
    return this.isHidden;
  }

  /**
   * Check if character is currently hidden
   */
  getIsHidden(): boolean {
    return this.isHidden;
  }

  /**
   * Reveal the character (set hidden to false)
   */
  reveal(): void {
    this.isHidden = false;
  }

  /**
   * Generate a random character
   */
  getRandomCharacter(): string {
    const descriptive = this.descriptives[Math.floor(Math.random() * this.descriptives.length)];
    const profession = this.professions[Math.floor(Math.random() * this.professions.length)];
    
    this.currentCharacter = { descriptive, profession };
    
    return `A${this.startsWithVowel(descriptive) ? 'n' : ''} ${descriptive} ${profession}`;
  }

  /**
   * Get the current character (without randomizing)
   */
  getCurrentCharacter(): string {
    if (!this.currentCharacter) {
      throw new Error('No character selected yet. Call getRandomCharacter() first.');
    }
    
    const { descriptive, profession } = this.currentCharacter;
    return `A${this.startsWithVowel(descriptive) ? 'n' : ''} ${descriptive} ${profession}`;
  }

  /**
   * Get just the descriptive trait
   */
  getCurrentDescriptive(): string {
    if (!this.currentCharacter) {
      throw new Error('No character selected yet. Call getRandomCharacter() first.');
    }
    return this.currentCharacter.descriptive;
  }

  /**
   * Get just the profession
   */
  getCurrentProfession(): string {
    if (!this.currentCharacter) {
      throw new Error('No character selected yet. Call getRandomCharacter() first.');
    }
    return this.currentCharacter.profession;
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
    return `Who The Fuck? Game Rules:
1. Player receives a random character (descriptive + profession)
2. Player has ${this.timeoutSeconds} seconds to improvise as that character
3. Scoring is out of 100 points
4. Judge awards points based on commitment, character consistency, and entertainment value`;
  }

  /**
   * Get the number of available professions
   */
  getProfessionCount(): number {
    return this.professions.length;
  }

  /**
   * Get the number of available descriptives
   */
  getDescriptiveCount(): number {
    return this.descriptives.length;
  }

  /**
   * Get total possible character combinations
   */
  getCombinationCount(): number {
    return this.professions.length * this.descriptives.length;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Helper to determine if a word starts with a vowel
   */
  private startsWithVowel(word: string): boolean {
    return /^[aeiou]/i.test(word);
  }
}
