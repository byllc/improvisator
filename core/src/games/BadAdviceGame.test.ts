import { describe, it, expect, beforeEach } from 'vitest';
import { BadAdviceGame } from './BadAdviceGame';

describe('BadAdviceGame', () => {
  let game: BadAdviceGame;

  beforeEach(() => {
    game = new BadAdviceGame();
  });

  describe('Constructor', () => {
    it('should initialize with default problems', () => {
      expect(game.getProblemCount()).toBeGreaterThan(0);
    });

    it('should throw error if problems array is empty', () => {
      expect(() => new BadAdviceGame({ problems: [] })).toThrow(
        'BadAdviceGame requires at least one problem'
      );
    });

    it('should use default timeout of 60 seconds', () => {
      expect(game.getTimeout()).toBe(60);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new BadAdviceGame({ timeoutSeconds: 90 });
      expect(customGame.getTimeout()).toBe(90);
    });

    it('should accept custom problems', () => {
      const customGame = new BadAdviceGame({
        problems: ['My cat ignores me', 'I burned toast'],
      });
      expect(customGame.getProblemCount()).toBe(2);
    });
  });

  describe('getRandomProblem', () => {
    it('should return a non-empty string', () => {
      const problem = game.getRandomProblem();
      expect(typeof problem).toBe('string');
      expect(problem.length).toBeGreaterThan(0);
    });

    it('should return one of the configured problems', () => {
      const problems = ['Problem A', 'Problem B', 'Problem C'];
      const customGame = new BadAdviceGame({ problems });
      const result = customGame.getRandomProblem();
      expect(problems).toContain(result);
    });

    it('should update the current problem', () => {
      game.getRandomProblem();
      expect(() => game.getCurrentProblem()).not.toThrow();
    });
  });

  describe('getCurrentProblem', () => {
    it('should throw before getRandomProblem is called', () => {
      expect(() => game.getCurrentProblem()).toThrow(
        'No problem selected yet. Call getRandomProblem() first.'
      );
    });

    it('should return the same problem as getRandomProblem', () => {
      const random = game.getRandomProblem();
      const current = game.getCurrentProblem();
      expect(current).toBe(random);
    });

    it('should return updated problem after another getRandomProblem call', () => {
      const customGame = new BadAdviceGame({ problems: ['Only problem'] });
      customGame.getRandomProblem();
      customGame.getRandomProblem();
      expect(customGame.getCurrentProblem()).toBe('Only problem');
    });
  });

  describe('validateScore', () => {
    it('should return true for valid scores', () => {
      expect(game.validateScore(0)).toBe(true);
      expect(game.validateScore(50)).toBe(true);
      expect(game.validateScore(100)).toBe(true);
    });

    it('should return false for scores below 0', () => {
      expect(game.validateScore(-1)).toBe(false);
    });

    it('should return false for scores above 100', () => {
      expect(game.validateScore(101)).toBe(false);
    });

    it('should return false for non-integer scores', () => {
      expect(game.validateScore(33.3)).toBe(false);
    });
  });

  describe('getRules', () => {
    it('should return a non-empty rules string', () => {
      expect(game.getRules().length).toBeGreaterThan(0);
    });

    it('should include the timeout duration', () => {
      expect(game.getRules()).toContain('60');
    });

    it('should reflect a custom timeout', () => {
      const customGame = new BadAdviceGame({ timeoutSeconds: 45 });
      expect(customGame.getRules()).toContain('45');
    });
  });

  describe('Default problems quality', () => {
    it('should have substantial variety', () => {
      expect(game.getProblemCount()).toBeGreaterThanOrEqual(20);
    });

    it('should not contain empty or whitespace-only problems', () => {
      const customGame = new BadAdviceGame();
      // Access private via getRandomProblem many times to spot check
      for (let i = 0; i < 20; i++) {
        const problem = customGame.getRandomProblem();
        expect(problem.trim().length).toBeGreaterThan(0);
      }
    });
  });
});
