import { describe, it, expect, beforeEach } from 'vitest';
import { LawyerGame } from './LawyerGame';

describe('LawyerGame', () => {
  let game: LawyerGame;

  beforeEach(() => {
    game = new LawyerGame();
  });

  describe('Constructor', () => {
    it('should initialize with default hot takes', () => {
      expect(game.getHotTakeCount()).toBeGreaterThan(0);
    });

    it('should throw error if hot takes array is empty', () => {
      expect(() => new LawyerGame({ hotTakes: [] })).toThrow(
        'LawyerGame requires at least one hot take'
      );
    });

    it('should use default timeout of 90 seconds', () => {
      expect(game.getTimeout()).toBe(90);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new LawyerGame({
        timeoutSeconds: 120
      });
      expect(customGame.getTimeout()).toBe(120);
    });

    it('should accept custom hot takes', () => {
      const customGame = new LawyerGame({
        hotTakes: ['Test hot take 1', 'Test hot take 2']
      });
      expect(customGame.getHotTakeCount()).toBe(2);
    });
  });

  describe('getRandomHotTake', () => {
    it('should return a hot take string', () => {
      const hotTake = game.getRandomHotTake();
      expect(typeof hotTake).toBe('string');
      expect(hotTake.length).toBeGreaterThan(0);
    });

    it('should return a hot take from the list', () => {
      const customGame = new LawyerGame({
        hotTakes: ['Hot take 1', 'Hot take 2', 'Hot take 3']
      });
      const hotTake = customGame.getRandomHotTake();
      expect(['Hot take 1', 'Hot take 2', 'Hot take 3']).toContain(hotTake);
    });

    it('should generate different hot takes on repeated calls', () => {
      const hotTakes = new Set<string>();
      for (let i = 0; i < 50; i++) {
        hotTakes.add(game.getRandomHotTake());
      }
      // With many hot takes, we should get multiple unique ones
      expect(hotTakes.size).toBeGreaterThanOrEqual(20);
    });

    it('should update current hot take state', () => {
      game.getRandomHotTake();
      const current = game.getCurrentHotTake();
      expect(current).toBeDefined();
      expect(typeof current).toBe('string');
    });
  });

  describe('getCurrentHotTake', () => {
    it('should throw error if no hot take selected', () => {
      expect(() => game.getCurrentHotTake()).toThrow(
        'No hot take selected yet'
      );
    });

    it('should return the current hot take after selection', () => {
      const selected = game.getRandomHotTake();
      const current = game.getCurrentHotTake();
      expect(current).toBe(selected);
    });

    it('should return same hot take on repeated calls', () => {
      game.getRandomHotTake();
      const first = game.getCurrentHotTake();
      const second = game.getCurrentHotTake();
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
      expect(rules).toContain('Lawyer Game');
    });

    it('should include timeout in rules', () => {
      const rules = game.getRules();
      expect(rules).toContain('90');
    });

    it('should reflect custom timeout in rules', () => {
      const customGame = new LawyerGame({
        timeoutSeconds: 60
      });
      const rules = customGame.getRules();
      expect(rules).toContain('60');
    });

    it('should mention defending the position', () => {
      const rules = game.getRules();
      expect(rules.toLowerCase()).toContain('defend');
    });
  });

  describe('getHotTakeCount', () => {
    it('should return correct count', () => {
      const customGame = new LawyerGame({
        hotTakes: ['Take 1', 'Take 2', 'Take 3']
      });
      expect(customGame.getHotTakeCount()).toBe(3);
    });

    it('should handle single hot take', () => {
      const singleGame = new LawyerGame({ hotTakes: ['Only take'] });
      expect(singleGame.getHotTakeCount()).toBe(1);
    });

    it('should have substantial default list', () => {
      // Default game should have at least 100 hot takes
      expect(game.getHotTakeCount()).toBeGreaterThanOrEqual(100);
    });
  });

  describe('getTimeout', () => {
    it('should return default timeout', () => {
      expect(game.getTimeout()).toBe(90);
    });

    it('should return custom timeout', () => {
      const customGame = new LawyerGame({
        timeoutSeconds: 45
      });
      expect(customGame.getTimeout()).toBe(45);
    });
  });

  describe('Edge cases', () => {
    it('should handle single hot take gracefully', () => {
      const minGame = new LawyerGame({
        hotTakes: ['Only one hot take']
      });
      expect(minGame.getRandomHotTake()).toBe('Only one hot take');
      expect(minGame.getCurrentHotTake()).toBe('Only one hot take');
    });

    it('should handle hot takes with special characters', () => {
      const specialGame = new LawyerGame({
        hotTakes: ['Hot take with "quotes"', 'Hot take with \'apostrophes\'']
      });
      const take = specialGame.getRandomHotTake();
      expect(take.length).toBeGreaterThan(0);
    });

    it('should handle very long hot takes', () => {
      const longTake = 'A'.repeat(500);
      const longGame = new LawyerGame({
        hotTakes: [longTake]
      });
      expect(longGame.getRandomHotTake()).toBe(longTake);
    });
  });

  describe('Default hot takes quality', () => {
    it('should have variety in topics', () => {
      // Get a sample of hot takes to check variety
      const takes = new Set<string>();
      for (let i = 0; i < 50; i++) {
        takes.add(game.getRandomHotTake());
      }
      
      // Should have substantial variety
      expect(takes.size).toBeGreaterThan(30);
    });

    it('should have meaningful hot takes (not empty or just spaces)', () => {
      for (let i = 0; i < 20; i++) {
        const take = game.getRandomHotTake();
        expect(take.trim().length).toBeGreaterThan(5);
      }
    });
  });
});
