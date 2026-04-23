import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RockPaperScissorsGame } from './RockPaperScissorsGame';

describe('RockPaperScissorsGame', () => {
  let game: RockPaperScissorsGame;

  beforeEach(() => {
    game = new RockPaperScissorsGame();
  });

  describe('Constructor', () => {
    it('should initialize with 1000 default things', () => {
      expect(game.getThingCount()).toBe(1000);
    });

    it('should use custom timeout if provided', () => {
      const customGame = new RockPaperScissorsGame({ timeoutSeconds: 90 });
      expect(customGame.getTimeout()).toBe(90);
    });

    it('should throw with empty custom thing list', () => {
      expect(() => new RockPaperScissorsGame({ things: [] })).toThrow(
        'RockPaperScissorsGame requires at least one thing'
      );
    });
  });

  describe('generateRound', () => {
    it('should generate a valid round for each choice', () => {
      const rockRound = game.generateRound('rock');
      const paperRound = game.generateRound('paper');
      const scissorsRound = game.generateRound('scissors');

      expect(rockRound.playerChoice).toBe('rock');
      expect(paperRound.playerChoice).toBe('paper');
      expect(scissorsRound.playerChoice).toBe('scissors');
    });

    it('should generate "choice beats thing" when playerWins is true', () => {
      const customGame = new RockPaperScissorsGame({ things: ['test thing'] });
      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.99);

      const round = customGame.generateRound('rock');
      expect(round.statement).toBe('rock beats test thing');
      expect(round.playerWins).toBe(true);
    });

    it('should generate "thing beats choice" when playerWins is false', () => {
      const customGame = new RockPaperScissorsGame({ things: ['test thing'] });
      vi.spyOn(Math, 'random')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.1);

      const round = customGame.generateRound('paper');
      expect(round.statement).toBe('test thing beats paper');
      expect(round.playerWins).toBe(false);
    });

    it('should throw on invalid choice', () => {
      expect(() => game.generateRound('lizard' as any)).toThrow(
        'Choice must be rock, paper, or scissors'
      );
    });
  });

  describe('getCurrentRound', () => {
    it('should throw when round has not been generated', () => {
      expect(() => game.getCurrentRound()).toThrow(
        'No round generated yet. Call generateRound() first.'
      );
    });

    it('should return last generated round', () => {
      const round = game.generateRound('scissors');
      expect(game.getCurrentRound()).toEqual(round);
    });
  });

  describe('getRules', () => {
    it('should include game name and thing count', () => {
      const rules = game.getRules();
      expect(rules).toContain('Rock Paper Scissors');
      expect(rules).toContain('1000');
    });
  });

  describe('validateScore', () => {
    it('should validate integer scores from 0 to 100', () => {
      expect(game.validateScore(0)).toBe(true);
      expect(game.validateScore(100)).toBe(true);
      expect(game.validateScore(42)).toBe(true);
      expect(game.validateScore(-1)).toBe(false);
      expect(game.validateScore(101)).toBe(false);
      expect(game.validateScore(42.5)).toBe(false);
    });
  });
});