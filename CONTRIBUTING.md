# Contributing to Improvisator

Thanks for your interest in contributing! This document explains how to get started, our standards, and how decisions are made.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd improvisator
   ```

2. **Prerequisites**:
   - Install Docker Desktop (Mac/Windows) or Docker Engine (Linux)
   - Install Docker Compose (usually included with Docker Desktop)

3. **Review the architecture guide**:
   - Read [.copilot-instructions](.copilot-instructions) to understand where code belongs
   - Review [README.md](README.md) for project overview
   - Check [TESTING.md](TESTING.md) for testing standards

4. **Start developing with Docker**:
   ```bash
   docker-compose up                                        # Start dev server
   docker-compose exec improvisator npm run test            # Run tests
   docker-compose exec improvisator npm run lint            # Check code quality
   ```

**IMPORTANT**: All development uses Docker. Never run `npm install` or `npm run dev` directly on your host machine.

## Code Standards

### Before You Code

Read [.copilot-instructions](.copilot-instructions) to understand:
- **Modularity First**: Game logic goes in `core/`, UI in `web/` or `mobile/`
- **Simple Solutions**: Prefer straightforward implementations
- **Framework-agnostic Core**: No React, React Native, or UI imports in `core/`

### TypeScript & Linting

We use **strict TypeScript** and **ESLint** to maintain code quality:

docker-compose exec improvisator npm run lint          # Check for issues
docker-compose exec improvisator npm run lint:fix      # Auto-fix issues
docker-compose exec improvisator npm run format        # Format with Prettier
docker-compose exec improvisator npm run format:check  # Check formatting
```

**Linting is enforced on commit**, so run `npm run lint:fix` before committing (in Docker)
**Linting is enforced on commit**, so run `npm run lint:fix` before committing.

### File Organization

**Core package** (`core/src/`):
```
games/
  ├── HeadlineGame.ts        # Game logic (framework-agnostic)
  └── HeadlineGame.test.ts   # Tests (required!)
utils/
  ├── scoring.ts
  └── scoring.test.ts        # All code has tests
models/
  └── types.ts               # TypeScript interfaces
```

**Web package** (`web/src/`):
```
components/
  ├── GameBoard.tsx          # React components
  ├── GameBoard.test.tsx     # Component tests
pages/
  └── GamePage.tsx
services/
  └── apiClient.ts           # Web-specific services
```

## Testing Requirements

**All code must have tests** before it's considered complete.

### Core Package
- **100% line coverage** required
- Unit tests for all functions/classes
- Test edge cases and error conditions
- Use Vitest: `npm run test -w core`

### Web Package
- **70%+ coverage** for critical components
- Integration tests for user interactions
- Use React Testing Library
- Run tests: `npm run test -w web`

**Example test structure**:
```typescript
import { describe, it, expect } from 'vitest';
import { MyGame } from './MyGame';

describe('MyGame', () => {
  it('should initialize with valid config', () => {
    const game = new MyGame({ /* config */ });
    expect(game.getRules()).toBeDefined();
  });
});
```

See [TESTING.md](TESTING.md) for detailed patterns and examples.

## Making a Change

### 1. Create a Feature Branch
```bash
git checkout -b feature/add-new-game
# or
git checkout -b fix/headline-game-bug
```

### 2. Implement Your Change

**If adding a game**:
1. Create game logic in `core/src/games/MyGame.ts`
2. Write comprehensive tests in `core/src/games/MyGame.test.ts`
3. Export from `core/src/index.ts`
4. Create React component in `web/src/components/MyGameBoard.tsx`
5. Add component test in `web/src/components/MyGameBoard.test.tsx`
6. Update README with game description

**If fixing a bug**:
1. Write a test that reproduces the bug
2. Fix the code
3. Verify the test passes
4. Check no other tests broke: `npm run test`

### 3. Quality Checklist

Before committing:
```bash
docker-compose exec improvisator npm run format        # Format code
docker-compose exec improvisator npm run lint:fix      # Fix lint issues
docker-compose exec improvisator npm run test          # Run all tests
docker-compose exec improvisator npm run test:coverage # Check coverage
```

**Commit checklist**:
- [ ] All tests pass: `docker-compose exec improvisator npm run test`
- [ ] Core coverage >90%: `docker-compose exec improvisator npm run test:coverage`
- [ ] Code is formatted: `docker-compose exec improvisator npm run format`
- [ ] No lint errors: `docker-compose exec improvisator npm run lint`
- [ ] New code has tests
- [ ] Tests are meaningful (test behavior, not implementation)
- [ ] No console.error or console.warn (unless intentional)

### 4. Commit Message Format

Use clear, descriptive commit messages:

```
feat: add reverse headline game to core package

- Implement ReverseHeadlineGame class with rules
- Add comprehensive test suite with 100% coverage
- Update core/src/index.ts exports
- Add game description to README

Closes #123
```

**Commit types**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation updates
- `test:` Test additions/changes
- `refactor:` Code restructuring (no behavior change)
- `chore:` Dependency updates, config changes
- `perf:` Performance improvements

### 5. Push and Create Pull Request

```bash
git push origin feature/add-new-game
```

Then create a pull request on GitHub with:
- Clear description of changes
- Why this change was needed
- How to test it
- Link to related issues

## Architecture Decisions

### Where does code go?

Ask yourself these questions:

1. **"Does this depend on UI rendering?"**
   - YES → `web/src/` or `mobile/app/`
   - NO → Continue to question 2

2. **"Could another platform reuse this?"**
   - YES → `core/src/`
   - NO → Platform-specific package

3. **"Is this a business rule or game mechanic?"**
   - YES → `core/src/`
   - NO → Presentation layer

### Example Decisions

| Code | Location | Reason |
|------|----------|--------|
| Game rules, scoring logic | `core/` | Reused by PWA and mobile |
| Random headline picker | `core/` | Pure logic, no UI deps |
| React component for game board | `web/` | React-specific |
| Service worker caching strategy | `web/` | PWA-specific |
| Navigation stack | `mobile/` | React Native-specific |
| TypeScript types/interfaces | `core/` | Shared across packages |

## Performance & Accessibility

- **Performance**: Keep core package small; game logic should be fast
- **Accessibility**: Web components must meet WCAG 2.1 AA standards
- **Mobile**: Components must work on small screens
- **Offline**: PWA must function without network

## Asking for Help

- **Questions about architecture?** See [.copilot-instructions](.copilot-instructions)
- **Testing help?** See [TESTING.md](TESTING.md)
- **PWA details?** See [web/PWA-GUIDE.md](web/PWA-GUIDE.md)
- **Still stuck?** Open a discussion or issue on GitHub

## Common Tasks

### Adding a New Game

1. Create `core/src/games/MyNewGame.ts`
2. Create `core/src/games/MyNewGame.test.ts` with full coverage
3. Export from `core/src/index.ts`
4. Create `web/src/components/MyNewGameBoard.tsx`
5. Test with `npm run test -w core`

### Updating Core Logic

1. Update the implementation
2. Update related tests
3. Check no other packages broke: `npm run test`
4. Update README if behavior changed

### Fixing a PWA Issue

1. Identify the issue (check browser DevTools → Application)
2. Update `web/src/sw.ts` or `web/vite.config.ts` as needed
3. Test in DevTools (unregister service worker, hard refresh)
4. Add test if behavior changed

## Code Review Process

All changes go through code review:

1. **Automated checks**:
   - ✅ Tests pass
   - ✅ Coverage maintained
   - ✅ Linting passes
   - ✅ Types check out

2. **Human review**:
   - Architecture (does it follow `.copilot-instructions`?)
   - Code quality (is it simple and readable?)
   - Tests (are they meaningful?)
   - Documentation (is it updated?)

3. **Approval**: At least one maintainer approves before merge

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see [LICENSE](LICENSE)).

---

Questions? Open an issue or ask in discussions. Thanks for contributing! 🎭
