/**
 * Where The Fuck Game
 * 
 * Players are given a WHO (profession), WHERE (location), and a DISPOSITION (mood/attitude).
 * They have 120 seconds to establish who they are, where they are, and what their deal is.
 * Example: "A paranoid astronaut at a Chuck E. Cheese"
 */

export interface WhereTheFuckGameConfig {
  professions?: string[];
  locations?: string[];
  dispositions?: string[];
  timeoutSeconds?: number;
}

const DEFAULT_PROFESSIONS = [
  'firefighter',
  'astronaut',
  'chef',
  'teacher',
  'doctor',
  'lawyer',
  'plumber',
  'electrician',
  'dentist',
  'veterinarian',
  'pilot',
  'mechanic',
  'architect',
  'engineer',
  'scientist',
  'programmer',
  'accountant',
  'banker',
  'real estate agent',
  'insurance salesperson',
  'taxi driver',
  'bus driver',
  'train conductor',
  'flight attendant',
  'waiter',
  'bartender',
  'barista',
  'cashier',
  'retail worker',
  'construction worker',
  'janitor',
  'security guard',
  'police officer',
  'detective',
  'FBI agent',
  'spy',
  'soldier',
  'general',
  'admiral',
  'politician',
  'mayor',
  'governor',
  'senator',
  'president',
  'judge',
  'prosecutor',
  'defense attorney',
  'paralegal',
  'librarian',
  'museum curator',
  'art dealer',
  'artist',
  'musician',
  'singer',
  'dancer',
  'actor',
  'director',
  'producer',
  'screenwriter',
  'comedian',
  'magician',
  'circus performer',
  'acrobat',
  'clown',
  'mime',
  'puppeteer',
  'ventriloquist',
  'fortune teller',
  'psychic',
  'therapist',
  'psychiatrist',
  'psychologist',
  'social worker',
  'life coach',
  'personal trainer',
  'yoga instructor',
  'massage therapist',
  'chiropractor',
  'pharmacist',
  'nurse',
  'surgeon',
  'anesthesiologist',
  'pediatrician',
  'obstetrician',
  'cardiologist',
  'dermatologist',
  'ophthalmologist',
  'orthodontist',
  'paramedic',
  'EMT',
  'coroner',
  'mortician',
  'funeral director',
  'grave digger',
  'priest',
  'pastor',
  'rabbi',
  'imam',
  'monk',
  'nun',
  'cult leader',
  'televangelist',
  'missionary',
  'exorcist'
];

const DEFAULT_LOCATIONS = [
  // Amusement & Entertainment
  'Disneyland',
  'Disney World',
  'Six Flags',
  'Universal Studios',
  'SeaWorld',
  'Chuck E. Cheese',
  'Dave & Buster\'s',
  'an arcade',
  'a bowling alley',
  'a roller skating rink',
  'a laser tag arena',
  'a trampoline park',
  'a water park',
  'a haunted house',
  'a movie theater',
  'a drive-in theater',
  'a casino',
  'a strip club',
  'a comedy club',
  'a jazz club',
  'a concert hall',
  'a music festival',
  'Coachella',
  'Burning Man',
  'Comic-Con',
  
  // Retail & Shopping
  'Walmart',
  'Target',
  'Costco',
  'IKEA',
  'a mall',
  'a shopping center',
  'a flea market',
  'a farmers market',
  'a pawn shop',
  'a thrift store',
  'a gun store',
  'a liquor store',
  'a convenience store',
  '7-Eleven',
  'a gas station',
  'a car dealership',
  'a jewelry store',
  'Tiffany & Co.',
  'an Apple Store',
  'Best Buy',
  'GameStop',
  'a toy store',
  'Toys R Us',
  'Build-A-Bear Workshop',
  
  // Food & Dining
  'McDonald\'s',
  'Burger King',
  'Taco Bell',
  'Subway',
  'Starbucks',
  'Dunkin\' Donuts',
  'Krispy Kreme',
  'a food court',
  'a buffet',
  'a diner',
  'Waffle House',
  'IHOP',
  'Denny\'s',
  'Applebee\'s',
  'Olive Garden',
  'Red Lobster',
  'Cheesecake Factory',
  'a sushi restaurant',
  'a Chinese restaurant',
  'a Mexican restaurant',
  'a pizza place',
  'a steakhouse',
  'a food truck',
  'a hot dog stand',
  'an ice cream shop',
  
  // Transportation
  'an airport',
  'on an airplane',
  'in first class',
  'in coach',
  'a train station',
  'on a train',
  'a subway',
  'a bus station',
  'on a bus',
  'a taxi',
  'an Uber',
  'a limousine',
  'a ferry',
  'on a cruise ship',
  'a yacht',
  'a sailboat',
  'a submarine',
  'a hot air balloon',
  'a helicopter',
  'a space shuttle',
  'the International Space Station',
  
  // Civic & Government
  'city hall',
  'the DMV',
  'the post office',
  'a police station',
  'a fire station',
  'a courthouse',
  'a prison',
  'a jail cell',
  'a holding cell',
  'Alcatraz',
  'the White House',
  'the Pentagon',
  'Area 51',
  'the CIA headquarters',
  'the FBI building',
  'the UN',
  'Congress',
  'the Supreme Court',
  'a voting booth',
  
  // Healthcare
  'a hospital',
  'an emergency room',
  'an operating room',
  'a waiting room',
  'a dental office',
  'a doctor\'s office',
  'a veterinary clinic',
  'a pharmacy',
  'CVS',
  'Walgreens',
  'a psychiatric ward',
  'a rehab center',
  'a nursing home',
  'an assisted living facility',
  'a morgue',
  'a funeral home',
  'a cemetery',
  
  // Education
  'a kindergarten classroom',
  'an elementary school',
  'a middle school',
  'a high school',
  'a college campus',
  'Harvard',
  'a community college',
  'a library',
  'a daycare',
  'a preschool',
  'detention',
  'the principal\'s office',
  'a cafeteria',
  'a gymnasium',
  'a school bus',
  
  // Workplace
  'an office',
  'a cubicle',
  'a conference room',
  'the break room',
  'the supply closet',
  'a factory',
  'a warehouse',
  'Amazon fulfillment center',
  'a construction site',
  'a coal mine',
  'an oil rig',
  'a farm',
  'a ranch',
  'a vineyard',
  'a brewery',
  'a distillery',
  
  // Lodging
  'a hotel room',
  'the Ritz Carlton',
  'a motel',
  'a hostel',
  'an Airbnb',
  'a bed and breakfast',
  'a resort',
  'a spa',
  'a sauna',
  'a hot tub',
  'a gym locker room',
  
  // Nature & Outdoors
  'a park',
  'Central Park',
  'Yellowstone',
  'the Grand Canyon',
  'Mount Everest',
  'the Sahara Desert',
  'the Amazon rainforest',
  'a beach',
  'a tropical island',
  'Hawaii',
  'a volcano',
  'a cave',
  'a forest',
  'a camping site',
  'a hiking trail',
  'a ski resort',
  'Aspen',
  'a lake',
  'a river',
  'Niagara Falls',
  'the North Pole',
  'the South Pole',
  'Antarctica',
  
  // Countries & Cities
  'Tokyo',
  'Paris',
  'London',
  'New York City',
  'Times Square',
  'Los Angeles',
  'Hollywood',
  'Las Vegas',
  'Miami',
  'Chicago',
  'San Francisco',
  'Seattle',
  'Boston',
  'Philadelphia',
  'Washington DC',
  'Rome',
  'Venice',
  'Barcelona',
  'Amsterdam',
  'Berlin',
  'Moscow',
  'Dubai',
  'Singapore',
  'Hong Kong',
  'Beijing',
  'Shanghai',
  'Sydney',
  'Melbourne',
  'Rio de Janeiro',
  'Mexico City',
  'Toronto',
  'Montreal',
  'Vancouver',
  
  // Sports & Fitness
  'a gym',
  'Planet Fitness',
  'Gold\'s Gym',
  'a CrossFit box',
  'a yoga studio',
  'a pilates studio',
  'a boxing gym',
  'a martial arts dojo',
  'a swimming pool',
  'a tennis court',
  'a basketball court',
  'a football stadium',
  'the Super Bowl',
  'a baseball stadium',
  'Fenway Park',
  'Wrigley Field',
  'a hockey rink',
  'a golf course',
  'Pebble Beach',
  'a race track',
  'the Indianapolis 500',
  'a wrestling ring',
  'the Olympics',
  
  // Religious & Spiritual
  'a church',
  'a cathedral',
  'the Vatican',
  'a mosque',
  'a synagogue',
  'a temple',
  'a monastery',
  'a convent',
  'a confessional',
  'a baptism',
  'a wedding ceremony',
  'a funeral',
  
  // Miscellaneous
  'a bathroom',
  'a public restroom',
  'an elevator',
  'a parking garage',
  'a basement',
  'an attic',
  'a closet',
  'under a bridge',
  'a dumpster',
  'a landfill',
  'a sewer',
  'a laundromat',
  'a barbershop',
  'a hair salon',
  'a nail salon',
  'a tattoo parlor',
  'a karaoke bar',
  'a nightclub',
  'a rave',
  'Burning Man',
  'Coachella',
  'a Renaissance fair',
  'a rodeo',
  'a state fair',
  'a petting zoo',
  'a zoo',
  'an aquarium',
  'a planetarium',
  'a museum',
  'the Smithsonian',
  'the Louvre',
  'the Met',
  'an art gallery',
  'a pawn shop',
  'a storage unit',
  'an auction house',
  'Sotheby\'s'
];

const DEFAULT_DISPOSITIONS = [
  'paranoid',
  'manic',
  'depressed',
  'anxious',
  'confident',
  'arrogant',
  'humble',
  'shy',
  'aggressive',
  'passive-aggressive',
  'sarcastic',
  'cheerful',
  'grumpy',
  'bitter',
  'resentful',
  'jealous',
  'envious',
  'greedy',
  'generous',
  'selfish',
  'narcissistic',
  'insecure',
  'defensive',
  'apologetic',
  'defiant',
  'rebellious',
  'obedient',
  'submissive',
  'dominant',
  'flirtatious',
  'romantic',
  'heartbroken',
  'lovesick',
  'lustful',
  'prudish',
  'vulgar',
  'classy',
  'trashy',
  'pretentious',
  'down-to-earth',
  'fake',
  'authentic',
  'dramatic',
  'understated',
  'loud',
  'quiet',
  'intense',
  'laid-back',
  'high-strung',
  'relaxed',
  'nervous',
  'calm',
  'panicked',
  'zen',
  'stressed',
  'overwhelmed',
  'underwhelmed',
  'bored',
  'excited',
  'enthusiastic',
  'apathetic',
  'passionate',
  'cold',
  'warm',
  'friendly',
  'hostile',
  'suspicious',
  'trusting',
  'naive',
  'cynical',
  'optimistic',
  'pessimistic',
  'hopeful',
  'hopeless',
  'inspired',
  'defeated',
  'victorious',
  'smug',
  'guilty',
  'ashamed',
  'proud',
  'embarrassed',
  'mortified',
  'confused',
  'enlightened',
  'clueless',
  'wise',
  'foolish',
  'intelligent',
  'dim-witted',
  'cunning',
  'naive',
  'sophisticated',
  'crude',
  'refined',
  'brutish',
  'delicate',
  'tough',
  'fragile',
  'resilient'
];

export class WhereTheFuckGame {
  private professions: string[];
  private locations: string[];
  private dispositions: string[];
  private timeoutSeconds: number;
  private currentProfession: string | null = null;
  private currentLocation: string | null = null;
  private currentDisposition: string | null = null;

  constructor(config: WhereTheFuckGameConfig = {}) {
    this.professions = config.professions || DEFAULT_PROFESSIONS;
    this.locations = config.locations || DEFAULT_LOCATIONS;
    this.dispositions = config.dispositions || DEFAULT_DISPOSITIONS;
    this.timeoutSeconds = config.timeoutSeconds || 120;

    if (this.professions.length === 0) {
      throw new Error('WhereTheFuckGame requires at least one profession');
    }
    if (this.locations.length === 0) {
      throw new Error('WhereTheFuckGame requires at least one location');
    }
    if (this.dispositions.length === 0) {
      throw new Error('WhereTheFuckGame requires at least one disposition');
    }
  }

  /**
   * Get a random scenario (who, where, what disposition)
   */
  getRandomScenario(): string {
    this.currentProfession = this.professions[Math.floor(Math.random() * this.professions.length)];
    this.currentLocation = this.locations[Math.floor(Math.random() * this.locations.length)];
    this.currentDisposition = this.dispositions[Math.floor(Math.random() * this.dispositions.length)];

    const article = this.startsWithVowel(this.currentDisposition) ? 'An' : 'A';
    return `${article} ${this.currentDisposition} ${this.currentProfession} at ${this.currentLocation}`;
  }

  /**
   * Check if a word starts with a vowel sound
   */
  private startsWithVowel(word: string): boolean {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word.charAt(0).toLowerCase());
  }

  /**
   * Get the current profession (without randomizing)
   */
  getCurrentProfession(): string {
    if (!this.currentProfession) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.currentProfession;
  }

  /**
   * Get the current location (without randomizing)
   */
  getCurrentLocation(): string {
    if (!this.currentLocation) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.currentLocation;
  }

  /**
   * Get the current disposition (without randomizing)
   */
  getCurrentDisposition(): string {
    if (!this.currentDisposition) {
      throw new Error('No scenario selected yet. Call getRandomScenario() first.');
    }
    return this.currentDisposition;
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
    return `Where The Fuck Game Rules:
1. Improviser receives WHO (profession), WHERE (location), and WHAT (disposition)
2. Improviser has ${this.timeoutSeconds} seconds to perform the scenario
3. Other players try to guess all three elements
4. SCORING - Guessers: 1 point each for who/what/where, OR 5 points for guessing all three correctly
5. SCORING - Improviser: 5 points for each element that everyone guesses correctly (max 15 points)`;
  }

  /**
   * Get the number of possible scenario combinations
   */
  getScenarioCount(): number {
    return this.professions.length * this.locations.length * this.dispositions.length;
  }

  /**
   * Get timeout in seconds
   */
  getTimeout(): number {
    return this.timeoutSeconds;
  }

  /**
   * Get counts of each element
   */
  getCounts(): { professions: number; locations: number; dispositions: number } {
    return {
      professions: this.professions.length,
      locations: this.locations.length,
      dispositions: this.dispositions.length
    };
  }
}
