# Testing Guide for Improvisator

This document explains the testing standards and practices used across the Improvisator project.

## Quick Start

```bash
# Run all tests
npm run test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Testing Philosophy

- **Test behavior, not implementation**: Focus on what the code does, not how it does it
- **One assertion per concept**: Each test should verify one thing
- **Clear naming**: Test names should describe what's being tested and expected outcome
- **Simple and readable**: Tests are documentation; they should be easy to understand

## Test Structure

### Core Package Tests

All code in `core/` gets unit tests using **Vitest**. Tests are located next to the source files.

```
core/
├── src/
│   ├── games/
│   │   ├── HeadlineGame.ts          # Source code
│   │   └── HeadlineGame.test.ts     # Tests
│   └── utils/
│       ├── scoring.ts
│       └── scoring.test.ts
```

**Test Template** (for `core/`):

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { HeadlineGame } from './HeadlineGame';

describe('HeadlineGame', () => {
  let game: HeadlineGame;

  beforeEach(() => {
    game = new HeadlineGame({ headlines: ['Test'] });
  });

  it('should do something specific', () => {
    const result = game.someMethod();
    expect(result).toBe('expected value');
  });

  it('should handle edge case', () => {
    expect(() => game.invalidMethod()).toThrow('Error message');
  });
});
```

### Web Package Tests

React components use **Vitest + React Testing Library**. Tests focus on user interactions.

```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { GameCard } from './GameCard';

describe('GameCard', () => {
  it('should display game name', () => {
    render(<GameCard game={{ name: 'Headline Game' }} />);
    expect(screen.getByText('Headline Game')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<GameCard game={{ name: 'Game' }} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Mobile Package Tests

React Native components use **Vitest + React Native Testing Library**.

```typescript
import { render, screen, userEvent } from '@testing-library/react-native';
import { GameButton } from './GameButton';

describe('GameButton', () => {
  it('should render game name', () => {
    render(<GameButton name="Headline Game" />);
    expect(screen.getByText('Headline Game')).toBeInTheDocument();
  });
});
```

## Coverage Standards

### Core Package
- **Target**: >90% line coverage
- **Rationale**: Core logic is reused by multiple platforms; it must be well-tested
- **Command**: `npm run test:coverage`

### Web & Mobile
- **Target**: >70% coverage for critical components
- **Rationale**: UI components change more frequently; we test behavior over coverage

## Common Testing Patterns

### Testing Functions

```typescript
import { describe, it, expect } from 'vitest';
import { calculateScore } from './scoring';

describe('calculateScore', () => {
  it('should calculate score from inputs', () => {
    const score = calculateScore({ correct: 8, total: 10 });
    expect(score).toBe(80);
  });

  it('should handle zero total', () => {
    const score = calculateScore({ correct: 0, total: 0 });
    expect(score).toBe(0);
  });
});
```

### Testing Classes

```typescript
describe('GameManager', () => {
  let manager: GameManager;

  beforeEach(() => {
    manager = new GameManager();
  });

  it('should add a game', () => {
    manager.addGame(new HeadlineGame({ headlines: ['test'] }));
    expect(manager.getGameCount()).toBe(1);
  });
});
```

### Testing Async Code

```typescript
it('should load headlines', async () => {
  const headlines = await loadHeadlines();
  expect(headlines.length).toBeGreaterThan(0);
});
```

### Testing Errors

```typescript
it('should throw error for invalid input', () => {
  expect(() => new HeadlineGame({ headlines: [] })).toThrow(
    'HeadlineGame requires at least one headline'
  );
});
```

### Mocking

```typescript
import { vi } from 'vitest';

describe('GameService', () => {
  it('should call API', async () => {
    const mockFetch = vi.fn(() => Promise.resolve({ ok: true }));
    const service = new GameService(mockFetch);
    
    await service.fetchGames();
    expect(mockFetch).toHaveBeenCalledWith('/api/games');
  });
});
```

## Before Committing Code

Every commit should follow this checklist:

- [ ] **Tests pass**: `npm run test` returns green
- [ ] **No coverage regression**: `npm run test:coverage` shows >= 90% for core
- [ ] **New code has tests**: Don't commit untested logic
- [ ] **Tests are readable**: Other developers understand what they test
- [ ] **No console errors**: `console.error` and `console.warn` should be expected/mocked

## Running Tests in CI/CD

Tests are automatically run on:
- Pull requests
- Commits to main branch
- Pre-commit hooks (optional)

To run tests locally before pushing:
```bash
npm run test  # All tests
npm run test:coverage  # With coverage
```

## Debugging Tests

### Run a single test file
```bash
npx vitest run core/src/games/HeadlineGame.test.ts
```

### Run tests matching a pattern
```bash
npx vitest run --grep "should validate score"
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test:watch"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

Then press F5 to start debugging.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Questions?

Refer to `.copilot-instructions` for architectural guidance on testing decisions.
