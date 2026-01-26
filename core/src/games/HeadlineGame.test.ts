import { describe, it, expect, beforeEach } from 'vitest';
import { HeadlineGame } from './HeadlineGame';

describe('HeadlineGame', () => {
  let game: HeadlineGame;
  const testHeadlines = [
    'Local Man Discovers Sentient Toaster',
    'Mayor Declares All Tuesdays Optional',
    'Cat Runs for City Council'
  ];

  beforeEach(() => {
    game = new HeadlineGame({ headlines: testHeadlines });
  });

  describe('Constructor', () => {
    it('should initialize with valid headlines', () => {
      expect(game.getHeadlineCount()).toBe(3);
    });

    it('should throw error if headlines array is empty', () => {
      expect(() => new HeadlineGame({ headlines: [] })).toThrow(
        'HeadlineGame requires at least one headline'
      );
    });

    it('should throw error if headlines is null or undefined', () => {
      expect(() => new HeadlineGame({ headlines: null as any })).toThrow();
    });

    it('should use default timeout of 60 seconds', () => {
      expect(game.getTimeout()).toBe(60);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new HeadlineGame({
        headlines: testHeadlines,
        timeoutSeconds: 120
      });
      expect(customGame.getTimeout()).toBe(120);
    });
  });

  describe('getRandomHeadline', () => {
    it('should return a headline from the list', () => {
      const headline = game.getRandomHeadline();
      expect(testHeadlines).toContain(headline);
    });

    it('should update current headline', () => {
      game.getRandomHeadline();
      const current = game.getCurrentHeadline();
      expect(testHeadlines).toContain(current);
    });

    it('should return different headlines on repeated calls', () => {
      const headlines = new Set<string>();
      for (let i = 0; i < 30; i++) {
        headlines.add(game.getRandomHeadline());
      }
      // With 3 headlines and 30 calls, we should get at least 2 different ones
      expect(headlines.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getCurrentHeadline', () => {
    it('should throw error if no headline selected', () => {
      expect(() => game.getCurrentHeadline()).toThrow(
        'No headline selected yet'
      );
    });

    it('should return the current headline after selection', () => {
      const selected = game.getRandomHeadline();
      const current = game.getCurrentHeadline();
      expect(current).toBe(selected);
    });

    it('should return same headline on repeated calls', () => {
      game.getRandomHeadline();
      const first = game.getCurrentHeadline();
      const second = game.getCurrentHeadline();
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
      expect(rules).toContain('Headline Game');
    });

    it('should include timeout in rules', () => {
      const rules = game.getRules();
      expect(rules).toContain('60');
    });

    it('should reflect custom timeout in rules', () => {
      const customGame = new HeadlineGame({
        headlines: testHeadlines,
        timeoutSeconds: 90
      });
      const rules = customGame.getRules();
      expect(rules).toContain('90');
    });
  });

  describe('getHeadlineCount', () => {
    it('should return correct count', () => {
      expect(game.getHeadlineCount()).toBe(3);
    });

    it('should handle single headline', () => {
      const singleGame = new HeadlineGame({ headlines: ['Only Headline'] });
      expect(singleGame.getHeadlineCount()).toBe(1);
    });

    it('should handle many headlines', () => {
      const manyHeadlines = Array.from({ length: 100 }, (_, i) => `Headline ${i}`);
      const manyGame = new HeadlineGame({ headlines: manyHeadlines });
      expect(manyGame.getHeadlineCount()).toBe(100);
    });
  });

  describe('getTimeout', () => {
    it('should return default timeout', () => {
      expect(game.getTimeout()).toBe(60);
    });

    it('should return custom timeout', () => {
      const customGame = new HeadlineGame({
        headlines: testHeadlines,
        timeoutSeconds: 45
      });
      expect(customGame.getTimeout()).toBe(45);
    });
  });
});
