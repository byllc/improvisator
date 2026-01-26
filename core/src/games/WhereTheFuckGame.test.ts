import { describe, it, expect, beforeEach } from 'vitest';
import { WhereTheFuckGame } from './WhereTheFuckGame';

describe('WhereTheFuckGame', () => {
  let game: WhereTheFuckGame;

  beforeEach(() => {
    game = new WhereTheFuckGame();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      const counts = game.getCounts();
      expect(counts.professions).toBeGreaterThan(0);
      expect(counts.locations).toBeGreaterThan(0);
      expect(counts.dispositions).toBeGreaterThan(0);
    });

    it('should throw error if professions array is empty', () => {
      expect(() => new WhereTheFuckGame({ 
        professions: [],
        locations: ['place'],
        dispositions: ['mood']
      })).toThrow('WhereTheFuckGame requires at least one profession');
    });

    it('should throw error if locations array is empty', () => {
      expect(() => new WhereTheFuckGame({ 
        professions: ['job'],
        locations: [],
        dispositions: ['mood']
      })).toThrow('WhereTheFuckGame requires at least one location');
    });

    it('should throw error if dispositions array is empty', () => {
      expect(() => new WhereTheFuckGame({ 
        professions: ['job'],
        locations: ['place'],
        dispositions: []
      })).toThrow('WhereTheFuckGame requires at least one disposition');
    });

    it('should use default timeout of 120 seconds', () => {
      expect(game.getTimeout()).toBe(120);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new WhereTheFuckGame({
        timeoutSeconds: 90
      });
      expect(customGame.getTimeout()).toBe(90);
    });

    it('should accept custom professions, locations, and dispositions', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['doctor', 'lawyer'],
        locations: ['hospital', 'courthouse'],
        dispositions: ['angry', 'happy']
      });
      const counts = customGame.getCounts();
      expect(counts.professions).toBe(2);
      expect(counts.locations).toBe(2);
      expect(counts.dispositions).toBe(2);
    });
  });

  describe('getRandomScenario', () => {
    it('should return a scenario string', () => {
      const scenario = game.getRandomScenario();
      expect(typeof scenario).toBe('string');
      expect(scenario.length).toBeGreaterThan(0);
    });

    it('should include profession, location, and disposition', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['astronaut'],
        locations: ['the moon'],
        dispositions: ['excited']
      });
      const scenario = customGame.getRandomScenario();
      expect(scenario).toContain('astronaut');
      expect(scenario).toContain('the moon');
      expect(scenario).toContain('excited');
    });

    it('should use correct article (A vs An) based on disposition', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['angry', 'excited']
      });
      
      // Test multiple times to get both cases
      const scenarios = new Set<string>();
      for (let i = 0; i < 20; i++) {
        scenarios.add(customGame.getRandomScenario());
      }
      
      const scenariosArray = Array.from(scenarios);
      const hasA = scenariosArray.some(s => s.startsWith('A '));
      const hasAn = scenariosArray.some(s => s.startsWith('An '));
      
      expect(hasA || hasAn).toBe(true);
    });

    it('should generate different scenarios on repeated calls', () => {
      const scenarios = new Set<string>();
      for (let i = 0; i < 50; i++) {
        scenarios.add(game.getRandomScenario());
      }
      // With many combinations, we should get multiple unique scenarios
      expect(scenarios.size).toBeGreaterThan(20);
    });

    it('should update current state', () => {
      game.getRandomScenario();
      const profession = game.getCurrentProfession();
      const location = game.getCurrentLocation();
      const disposition = game.getCurrentDisposition();
      
      expect(profession).toBeDefined();
      expect(location).toBeDefined();
      expect(disposition).toBeDefined();
    });

    it('should format scenario with "at" before location', () => {
      const scenario = game.getRandomScenario();
      expect(scenario).toMatch(/at .+/);
    });
  });

  describe('getCurrentProfession', () => {
    it('should throw error if no scenario selected', () => {
      expect(() => game.getCurrentProfession()).toThrow(
        'No scenario selected yet'
      );
    });

    it('should return the current profession after selection', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['angry']
      });
      customGame.getRandomScenario();
      expect(customGame.getCurrentProfession()).toBe('doctor');
    });

    it('should return same profession on repeated calls', () => {
      game.getRandomScenario();
      const first = game.getCurrentProfession();
      const second = game.getCurrentProfession();
      expect(first).toBe(second);
    });
  });

  describe('getCurrentLocation', () => {
    it('should throw error if no scenario selected', () => {
      expect(() => game.getCurrentLocation()).toThrow(
        'No scenario selected yet'
      );
    });

    it('should return the current location after selection', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['angry']
      });
      customGame.getRandomScenario();
      expect(customGame.getCurrentLocation()).toBe('hospital');
    });

    it('should return same location on repeated calls', () => {
      game.getRandomScenario();
      const first = game.getCurrentLocation();
      const second = game.getCurrentLocation();
      expect(first).toBe(second);
    });
  });

  describe('getCurrentDisposition', () => {
    it('should throw error if no scenario selected', () => {
      expect(() => game.getCurrentDisposition()).toThrow(
        'No scenario selected yet'
      );
    });

    it('should return the current disposition after selection', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['angry']
      });
      customGame.getRandomScenario();
      expect(customGame.getCurrentDisposition()).toBe('angry');
    });

    it('should return same disposition on repeated calls', () => {
      game.getRandomScenario();
      const first = game.getCurrentDisposition();
      const second = game.getCurrentDisposition();
      expect(first).toBe(second);
    });
  });

  describe('validateScore', () => {
    it('should validate scores between 0 and 100', () => {
      expect(game.validateScore(0)).toBe(true);
      expect(game.validateScore(50)).toBe(true);
      expect(game.validateScore(100)).toBe(true);
    });

    it('should reject negative scores', () => {
      expect(game.validateScore(-1)).toBe(false);
      expect(game.validateScore(-50)).toBe(false);
    });

    it('should reject scores over 100', () => {
      expect(game.validateScore(101)).toBe(false);
      expect(game.validateScore(200)).toBe(false);
    });

    it('should reject non-integer scores', () => {
      expect(game.validateScore(50.5)).toBe(false);
      expect(game.validateScore(99.9)).toBe(false);
    });

    it('should reject non-numeric values', () => {
      expect(game.validateScore(NaN)).toBe(false);
    });
  });

  describe('getRules', () => {
    it('should return rules as a string', () => {
      const rules = game.getRules();
      expect(typeof rules).toBe('string');
      expect(rules.length).toBeGreaterThan(0);
    });

    it('should include game name in rules', () => {
      const rules = game.getRules();
      expect(rules).toContain('Where The Fuck');
    });

    it('should include timeout in rules', () => {
      const rules = game.getRules();
      expect(rules).toContain('120');
    });

    it('should reflect custom timeout in rules', () => {
      const customGame = new WhereTheFuckGame({
        timeoutSeconds: 90
      });
      const rules = customGame.getRules();
      expect(rules).toContain('90');
    });

    it('should mention establishing who, where, and disposition', () => {
      const rules = game.getRules();
      expect(rules.toLowerCase()).toContain('who');
      expect(rules.toLowerCase()).toContain('where');
    });
  });

  describe('getScenarioCount', () => {
    it('should return correct total combinations', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['a', 'b'],
        locations: ['x', 'y', 'z'],
        dispositions: ['1', '2']
      });
      // 2 professions * 3 locations * 2 dispositions = 12 combinations
      expect(customGame.getScenarioCount()).toBe(12);
    });

    it('should have substantial default combinations', () => {
      // Default game should have many combinations
      expect(game.getScenarioCount()).toBeGreaterThan(1000);
    });
  });

  describe('getCounts', () => {
    it('should return correct counts for each element', () => {
      const customGame = new WhereTheFuckGame({
        professions: ['a', 'b', 'c'],
        locations: ['x', 'y'],
        dispositions: ['1', '2', '3', '4']
      });
      const counts = customGame.getCounts();
      expect(counts.professions).toBe(3);
      expect(counts.locations).toBe(2);
      expect(counts.dispositions).toBe(4);
    });
  });

  describe('getTimeout', () => {
    it('should return default timeout', () => {
      expect(game.getTimeout()).toBe(120);
    });

    it('should return custom timeout', () => {
      const customGame = new WhereTheFuckGame({
        timeoutSeconds: 60
      });
      expect(customGame.getTimeout()).toBe(60);
    });
  });

  describe('Edge cases', () => {
    it('should handle single option for each element', () => {
      const minGame = new WhereTheFuckGame({
        professions: ['only profession'],
        locations: ['only location'],
        dispositions: ['only disposition']
      });
      const scenario = minGame.getRandomScenario();
      expect(scenario).toContain('only profession');
      expect(scenario).toContain('only location');
      expect(scenario).toContain('only disposition');
    });

    it('should handle elements with special characters', () => {
      const specialGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['McDonald\'s'],
        dispositions: ['passive-aggressive']
      });
      const scenario = specialGame.getRandomScenario();
      expect(scenario.length).toBeGreaterThan(0);
    });

    it('should handle very long strings', () => {
      const longProfession = 'A'.repeat(100);
      const longLocation = 'B'.repeat(100);
      const longDisposition = 'C'.repeat(100);
      const longGame = new WhereTheFuckGame({
        professions: [longProfession],
        locations: [longLocation],
        dispositions: [longDisposition]
      });
      const scenario = longGame.getRandomScenario();
      expect(scenario).toContain(longProfession);
      expect(scenario).toContain(longLocation);
      expect(scenario).toContain(longDisposition);
    });
  });

  describe('Default lists quality', () => {
    it('should have substantial variety in professions', () => {
      const counts = game.getCounts();
      expect(counts.professions).toBeGreaterThan(50);
    });

    it('should have substantial variety in locations', () => {
      const counts = game.getCounts();
      expect(counts.locations).toBeGreaterThan(100);
    });

    it('should have substantial variety in dispositions', () => {
      const counts = game.getCounts();
      expect(counts.dispositions).toBeGreaterThan(50);
    });

    it('should generate unique scenarios consistently', () => {
      const scenarios = new Set<string>();
      for (let i = 0; i < 100; i++) {
        scenarios.add(game.getRandomScenario());
      }
      // Should have high uniqueness
      expect(scenarios.size).toBeGreaterThan(80);
    });
  });

  describe('Article selection', () => {
    it('should use "An" for dispositions starting with vowels', () => {
      const vowelGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['angry', 'excited', 'insecure', 'optimistic', 'upset']
      });
      
      const scenarios = [];
      for (let i = 0; i < 10; i++) {
        scenarios.push(vowelGame.getRandomScenario());
      }
      
      const allStartWithAn = scenarios.every(s => s.startsWith('An '));
      expect(allStartWithAn).toBe(true);
    });

    it('should use "A" for dispositions starting with consonants', () => {
      const consonantGame = new WhereTheFuckGame({
        professions: ['doctor'],
        locations: ['hospital'],
        dispositions: ['paranoid', 'sad', 'happy', 'grumpy', 'wild']
      });
      
      const scenarios = [];
      for (let i = 0; i < 10; i++) {
        scenarios.push(consonantGame.getRandomScenario());
      }
      
      const allStartWithA = scenarios.every(s => s.startsWith('A ') && !s.startsWith('An '));
      expect(allStartWithA).toBe(true);
    });
  });
});
