import { describe, it, expect, beforeEach } from 'vitest';
import { WhoTheFuckGame } from './WhoTheFuckGame';

describe('WhoTheFuckGame', () => {
  let game: WhoTheFuckGame;

  beforeEach(() => {
    game = new WhoTheFuckGame();
  });

  describe('Constructor', () => {
    it('should initialize with default professions and descriptives', () => {
      expect(game.getProfessionCount()).toBeGreaterThan(0);
      expect(game.getDescriptiveCount()).toBeGreaterThan(0);
    });

    it('should throw error if professions array is empty', () => {
      expect(() => new WhoTheFuckGame({ professions: [], descriptives: ['test'] })).toThrow(
        'WhoTheFuckGame requires at least one profession'
      );
    });

    it('should throw error if descriptives array is empty', () => {
      expect(() => new WhoTheFuckGame({ professions: ['test'], descriptives: [] })).toThrow(
        'WhoTheFuckGame requires at least one descriptive'
      );
    });

    it('should use default timeout of 120 seconds', () => {
      expect(game.getTimeout()).toBe(120);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new WhoTheFuckGame({
        timeoutSeconds: 180
      });
      expect(customGame.getTimeout()).toBe(180);
    });

    it('should accept custom professions', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor', 'lawyer'],
        descriptives: ['happy']
      });
      expect(customGame.getProfessionCount()).toBe(2);
    });

    it('should accept custom descriptives', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy', 'sad', 'angry']
      });
      expect(customGame.getDescriptiveCount()).toBe(3);
    });
  });

  describe('getRandomCharacter', () => {
    it('should return a character string', () => {
      const character = game.getRandomCharacter();
      expect(typeof character).toBe('string');
      expect(character.length).toBeGreaterThan(0);
    });

    it('should include both descriptive and profession', () => {
      const character = game.getRandomCharacter();
      // Should have format "A/An [descriptive] [profession]"
      expect(character).toMatch(/^An? \w+ \w+/);
    });

    it('should use "An" before vowel-starting descriptives', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['anxious', 'eager', 'optimistic']
      });
      const character = customGame.getRandomCharacter();
      expect(character).toMatch(/^An /);
    });

    it('should use "A" before consonant-starting descriptives', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy', 'sad', 'brave']
      });
      const character = customGame.getRandomCharacter();
      expect(character).toMatch(/^A /);
    });

    it('should generate different characters on repeated calls', () => {
      const characters = new Set<string>();
      for (let i = 0; i < 50; i++) {
        characters.add(game.getRandomCharacter());
      }
      // With many professions and descriptives, we should get multiple unique combinations
      expect(characters.size).toBeGreaterThanOrEqual(20);
    });

    it('should update current character state', () => {
      game.getRandomCharacter();
      const current = game.getCurrentCharacter();
      expect(current).toBeDefined();
      expect(typeof current).toBe('string');
    });
  });

  describe('getCurrentCharacter', () => {
    it('should throw error if no character selected', () => {
      expect(() => game.getCurrentCharacter()).toThrow(
        'No character selected yet'
      );
    });

    it('should return the current character after selection', () => {
      const selected = game.getRandomCharacter();
      const current = game.getCurrentCharacter();
      expect(current).toBe(selected);
    });

    it('should return same character on repeated calls', () => {
      game.getRandomCharacter();
      const first = game.getCurrentCharacter();
      const second = game.getCurrentCharacter();
      expect(first).toBe(second);
    });
  });

  describe('getCurrentDescriptive', () => {
    it('should throw error if no character selected', () => {
      expect(() => game.getCurrentDescriptive()).toThrow(
        'No character selected yet'
      );
    });

    it('should return just the descriptive trait', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy']
      });
      customGame.getRandomCharacter();
      expect(customGame.getCurrentDescriptive()).toBe('happy');
    });

    it('should return valid descriptive from the list', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy', 'sad', 'angry']
      });
      customGame.getRandomCharacter();
      const descriptive = customGame.getCurrentDescriptive();
      expect(['happy', 'sad', 'angry']).toContain(descriptive);
    });
  });

  describe('getCurrentProfession', () => {
    it('should throw error if no character selected', () => {
      expect(() => game.getCurrentProfession()).toThrow(
        'No character selected yet'
      );
    });

    it('should return just the profession', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy']
      });
      customGame.getRandomCharacter();
      expect(customGame.getCurrentProfession()).toBe('doctor');
    });

    it('should return valid profession from the list', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['doctor', 'lawyer', 'chef'],
        descriptives: ['happy']
      });
      customGame.getRandomCharacter();
      const profession = customGame.getCurrentProfession();
      expect(['doctor', 'lawyer', 'chef']).toContain(profession);
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
      expect(rules).toContain('Who The Fuck');
    });

    it('should include timeout in rules', () => {
      const rules = game.getRules();
      expect(rules).toContain('120');
    });

    it('should reflect custom timeout in rules', () => {
      const customGame = new WhoTheFuckGame({
        timeoutSeconds: 90
      });
      const rules = customGame.getRules();
      expect(rules).toContain('90');
    });
  });

  describe('getCounts', () => {
    it('should return correct profession count', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['a', 'b', 'c'],
        descriptives: ['x']
      });
      expect(customGame.getProfessionCount()).toBe(3);
    });

    it('should return correct descriptive count', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['a'],
        descriptives: ['x', 'y', 'z', 'w']
      });
      expect(customGame.getDescriptiveCount()).toBe(4);
    });

    it('should calculate total combinations correctly', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['a', 'b', 'c'],
        descriptives: ['x', 'y']
      });
      expect(customGame.getCombinationCount()).toBe(6);
    });

    it('should handle large combination counts', () => {
      // Default game should have many combinations
      expect(game.getCombinationCount()).toBeGreaterThan(10000);
    });
  });

  describe('Default lists', () => {
    it('should have substantial profession list', () => {
      // Should have at least 100 professions
      expect(game.getProfessionCount()).toBeGreaterThanOrEqual(100);
    });

    it('should have substantial descriptive list', () => {
      // Should have at least 50 descriptives
      expect(game.getDescriptiveCount()).toBeGreaterThanOrEqual(50);
    });

    it('should provide good variety of combinations', () => {
      // With 100+ professions and 50+ descriptives, should have 5000+ combinations
      expect(game.getCombinationCount()).toBeGreaterThan(5000);
    });
  });

  describe('Edge cases', () => {
    it('should handle single profession and descriptive', () => {
      const minGame = new WhoTheFuckGame({
        professions: ['doctor'],
        descriptives: ['happy']
      });
      expect(minGame.getRandomCharacter()).toBe('A happy doctor');
    });

    it('should handle profession with multiple words', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['emergency room doctor'],
        descriptives: ['calm']
      });
      const character = customGame.getRandomCharacter();
      expect(character).toContain('emergency room doctor');
    });

    it('should handle descriptive with multiple words', () => {
      const customGame = new WhoTheFuckGame({
        professions: ['teacher'],
        descriptives: ['passive-aggressive']
      });
      const character = customGame.getRandomCharacter();
      expect(character).toContain('passive-aggressive');
    });
  });
});
