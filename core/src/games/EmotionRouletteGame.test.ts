import { describe, it, expect, beforeEach } from 'vitest';
import { EmotionRouletteGame } from './EmotionRouletteGame';

describe('EmotionRouletteGame', () => {
  let game: EmotionRouletteGame;

  beforeEach(() => {
    game = new EmotionRouletteGame();
  });

  describe('Constructor', () => {
    it('should initialize with default actions and emotions', () => {
      expect(game.getActionCount()).toBeGreaterThan(0);
      expect(game.getEmotionCount()).toBeGreaterThan(0);
    });

    it('should throw error if actions array is empty', () => {
      expect(() => new EmotionRouletteGame({ actions: [], emotions: ['desperately'] })).toThrow(
        'EmotionRouletteGame requires at least one action'
      );
    });

    it('should throw error if emotions array is empty', () => {
      expect(() => new EmotionRouletteGame({ actions: ['Explain things'], emotions: [] })).toThrow(
        'EmotionRouletteGame requires at least one emotion'
      );
    });

    it('should use default timeout of 60 seconds', () => {
      expect(game.getTimeout()).toBe(60);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new EmotionRouletteGame({ timeoutSeconds: 90 });
      expect(customGame.getTimeout()).toBe(90);
    });

    it('should accept custom actions', () => {
      const customGame = new EmotionRouletteGame({
        actions: ['Teach chess', 'Order pizza'],
        emotions: ['desperately'],
      });
      expect(customGame.getActionCount()).toBe(2);
    });

    it('should accept custom emotions', () => {
      const customGame = new EmotionRouletteGame({
        actions: ['Explain things'],
        emotions: ['desperately', 'furiously', 'smugly'],
      });
      expect(customGame.getEmotionCount()).toBe(3);
    });
  });

  describe('getRandomPrompt', () => {
    it('should return a non-empty string', () => {
      const prompt = game.getRandomPrompt();
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should contain "... but" separator', () => {
      const prompt = game.getRandomPrompt();
      expect(prompt).toContain('... but ');
    });

    it('should uppercase the emotion portion', () => {
      const customGame = new EmotionRouletteGame({
        actions: ['Explain things'],
        emotions: ['desperately'],
      });
      const prompt = customGame.getRandomPrompt();
      expect(prompt).toBe('Explain things... but DESPERATELY');
    });

    it('should include both action and emotion in the prompt', () => {
      const customGame = new EmotionRouletteGame({
        actions: ['Order a pizza'],
        emotions: ['furiously'],
      });
      const prompt = customGame.getRandomPrompt();
      expect(prompt).toContain('Order a pizza');
      expect(prompt).toContain('FURIOUSLY');
    });
  });

  describe('getCurrentPrompt', () => {
    it('should throw before getRandomPrompt is called', () => {
      expect(() => game.getCurrentPrompt()).toThrow(
        'No prompt selected yet. Call getRandomPrompt() first.'
      );
    });

    it('should return the same prompt as getRandomPrompt', () => {
      const random = game.getRandomPrompt();
      const current = game.getCurrentPrompt();
      expect(current).toBe(random);
    });
  });

  describe('getCurrentAction', () => {
    it('should throw before getRandomPrompt is called', () => {
      expect(() => game.getCurrentAction()).toThrow(
        'No prompt selected yet. Call getRandomPrompt() first.'
      );
    });

    it('should return a non-empty string after getRandomPrompt', () => {
      game.getRandomPrompt();
      expect(game.getCurrentAction().length).toBeGreaterThan(0);
    });
  });

  describe('getCurrentEmotion', () => {
    it('should throw before getRandomPrompt is called', () => {
      expect(() => game.getCurrentEmotion()).toThrow(
        'No prompt selected yet. Call getRandomPrompt() first.'
      );
    });

    it('should return a non-empty string after getRandomPrompt', () => {
      game.getRandomPrompt();
      expect(game.getCurrentEmotion().length).toBeGreaterThan(0);
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
      expect(game.validateScore(42.5)).toBe(false);
    });
  });

  describe('getCombinationCount', () => {
    it('should return product of actions and emotions counts', () => {
      const customGame = new EmotionRouletteGame({
        actions: ['Do A', 'Do B', 'Do C'],
        emotions: ['happily', 'sadly'],
      });
      expect(customGame.getCombinationCount()).toBe(6);
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
      const customGame = new EmotionRouletteGame({ timeoutSeconds: 90 });
      expect(customGame.getRules()).toContain('90');
    });
  });
});
