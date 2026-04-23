import { describe, it, expect, beforeEach } from 'vitest';
import { PressConferenceGame } from './PressConferenceGame';

describe('PressConferenceGame', () => {
  let game: PressConferenceGame;

  beforeEach(() => {
    game = new PressConferenceGame();
  });

  describe('Constructor', () => {
    it('should initialize with default celebrities and events', () => {
      expect(game.getCelebrityCount()).toBeGreaterThan(0);
      expect(game.getEventCount()).toBeGreaterThan(0);
    });

    it('should throw error if celebrities array is empty', () => {
      expect(() => new PressConferenceGame({ celebrities: [], events: ['did a thing'] })).toThrow(
        'PressConferenceGame requires at least one celebrity type'
      );
    });

    it('should throw error if events array is empty', () => {
      expect(() => new PressConferenceGame({ celebrities: ['pop star'], events: [] })).toThrow(
        'PressConferenceGame requires at least one event'
      );
    });

    it('should use default timeout of 180 seconds', () => {
      expect(game.getTimeout()).toBe(180);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new PressConferenceGame({ timeoutSeconds: 120 });
      expect(customGame.getTimeout()).toBe(120);
    });

    it('should accept custom celebrities', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['pop star', 'senator'],
        events: ['did a thing'],
      });
      expect(customGame.getCelebrityCount()).toBe(2);
    });

    it('should accept custom events', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['pop star'],
        events: ['ate a bus', 'declared war on clouds', 'invented Tuesday'],
      });
      expect(customGame.getEventCount()).toBe(3);
    });
  });

  describe('getRandomScenario', () => {
    it('should return a non-empty string', () => {
      const scenario = game.getRandomScenario();
      expect(typeof scenario).toBe('string');
      expect(scenario.length).toBeGreaterThan(0);
    });

    it('should end with a period', () => {
      const scenario = game.getRandomScenario();
      expect(scenario.endsWith('.')).toBe(true);
    });

    it('should use "An" before vowel-starting celebrity types', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['Oscar winner'],
        events: ['did something absurd'],
      });
      const scenario = customGame.getRandomScenario();
      expect(scenario.startsWith('An ')).toBe(true);
    });

    it('should use "A" before consonant-starting celebrity types', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['pop star'],
        events: ['did something absurd'],
      });
      const scenario = customGame.getRandomScenario();
      expect(scenario.startsWith('A ')).toBe(true);
    });

    it('should include the celebrity type and event in the scenario', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['senator'],
        events: ['declared war on clouds'],
      });
      const scenario = customGame.getRandomScenario();
      expect(scenario).toContain('senator');
      expect(scenario).toContain('declared war on clouds');
    });
  });

  describe('getCurrentScenario', () => {
    it('should throw before getRandomScenario is called', () => {
      expect(() => game.getCurrentScenario()).toThrow(
        'No scenario selected yet. Call getRandomScenario() first.'
      );
    });

    it('should return the same scenario as getRandomScenario', () => {
      const random = game.getRandomScenario();
      const current = game.getCurrentScenario();
      expect(current).toBe(random);
    });
  });

  describe('getCurrentCelebrity', () => {
    it('should throw before getRandomScenario is called', () => {
      expect(() => game.getCurrentCelebrity()).toThrow(
        'No scenario selected yet. Call getRandomScenario() first.'
      );
    });

    it('should return a non-empty string after getRandomScenario', () => {
      game.getRandomScenario();
      expect(game.getCurrentCelebrity().length).toBeGreaterThan(0);
    });
  });

  describe('getCurrentEvent', () => {
    it('should throw before getRandomScenario is called', () => {
      expect(() => game.getCurrentEvent()).toThrow(
        'No scenario selected yet. Call getRandomScenario() first.'
      );
    });

    it('should return a non-empty string after getRandomScenario', () => {
      game.getRandomScenario();
      expect(game.getCurrentEvent().length).toBeGreaterThan(0);
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
      expect(game.validateScore(50.5)).toBe(false);
    });
  });

  describe('getScenarioCount', () => {
    it('should return product of celebrities and events counts', () => {
      const customGame = new PressConferenceGame({
        celebrities: ['pop star', 'senator', 'chef'],
        events: ['did thing A', 'did thing B'],
      });
      expect(customGame.getScenarioCount()).toBe(6);
    });
  });

  describe('getRules', () => {
    it('should return a non-empty rules string', () => {
      expect(game.getRules().length).toBeGreaterThan(0);
    });

    it('should include the timeout duration', () => {
      expect(game.getRules()).toContain('180');
    });
  });
});
