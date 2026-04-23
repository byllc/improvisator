/**
 * Improvisator Core Library
 * 
 * Framework-agnostic game logic and utilities used by both PWA and mobile apps.
 */

export { HeadlineGame, type HeadlineGameConfig } from './games/HeadlineGame';
export { WhoTheFuckGame, type WhoTheFuckGameConfig } from './games/WhoTheFuckGame';
export { LawyerGame, type LawyerGameConfig } from './games/LawyerGame';
export { WhereTheFuckGame, type WhereTheFuckGameConfig } from './games/WhereTheFuckGame';
export {
	RockPaperScissorsGame,
	type RockPaperScissorsGameConfig,
	type RockPaperScissorsChoice,
	type RockPaperScissorsRound
} from './games/RockPaperScissorsGame';
export { PressConferenceGame, type PressConferenceGameConfig } from './games/PressConferenceGame';
export { EmotionRouletteGame, type EmotionRouletteGameConfig } from './games/EmotionRouletteGame';
export { BadAdviceGame, type BadAdviceGameConfig } from './games/BadAdviceGame';
