# improvisator

A progressive web app (PWA) for improv comedy practice, built with a modular architecture that shares code between web and mobile platforms.

## What is Improvisator?

Improvisator provides a collection of improv games and exercises for comedians and performers to practice their craft. The web app and mobile app use the same core game logic.

## Architecture: Shared Code Between PWA and Mobile

This project uses a **monorepo structure** with a shared core library. Business logic, game mechanics, and utilities are written once and used by both platforms.

### Structure

```
improvisator/
├── core/                  # Shared, framework-agnostic code
│   ├── src/
│   │   ├── games/        # Game rules and mechanics
│   │   ├── models/       # Data models (TypeScript interfaces)
│   │   ├── utils/        # Helper functions
│   │   └── index.ts      # Public API exports
│   ├── package.json
│   └── tsconfig.json
│
├── web/                   # PWA (React + TypeScript)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # Web-specific services
│   │   └── App.tsx
│   ├── public/           # Static assets, manifest.json, service worker
│   ├── package.json
│   └── vite.config.ts
│
└── mobile/               # React Native (Expo)
    ├── app/
    │   ├── components/   # React Native components
    │   ├── screens/      # Navigation screens
    │   ├── services/     # Mobile-specific services
    │   └── App.tsx
    ├── package.json
    └── app.json
```

### How Shared Code Works

**The Core Package** (`core/`) contains:
- **Game Rules**: All improv game mechanics (setup, scoring, turn logic, etc.)
- **Data Models**: Interfaces and types defining games, players, scores
- **Utilities**: Helpers for random selection, timer management, state logic
- **Constants**: Game names, rules descriptions, difficulty levels

**Example: Game Mechanics**
```typescript
// core/src/games/HeadlineGame.ts
export class HeadlineGame {
  private headlines: string[] = [];
  
  generateHeadline(): string {
    // Pure logic, no UI
    return this.headlines[Math.floor(Math.random() * this.headlines.length)];
  }
  
  validateScore(score: number): boolean {
    return score >= 0 && score <= 100;
  }
}
```

Both the web and mobile apps import this:
```typescript
// web/src/components/GameBoard.tsx
import { HeadlineGame } from '@improvisator/core';

// mobile/app/screens/GameScreen.tsx
import { HeadlineGame } from '@improvisator/core';
```

### What Each Platform Provides

| Responsibility | Core | Web PWA | Mobile App |
|---|---|---|---|
| Game rules | ✅ | | |
| Game mechanics | ✅ | | |
| Data models | ✅ | | |
| Utilities | ✅ | | |
| React components | | ✅ | |
| React Native components | | | ✅ |
| Navigation | | ✅ | ✅ |
| PWA features (offline, install) | | ✅ | |
| Native APIs | | | ✅ |

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Development

**All development happens in Docker containers**. The current directory is mounted to `/app` in the container.

1. **Start the development server**:
   ```bash
   docker-compose up
   ```

   This will:
   - Build the Docker image
   - Install all dependencies inside the container
   - Start the Vite dev server
   - Open the app at `http://localhost:54321`

2. **Run tests**:
   ```bash
   docker-compose exec improvisator npm run test
   ```

3. **Run linting**:
   ```bash
   docker-compose exec improvisator npm run lint:fix
   ```

4. **Rebuild after adding dependencies**:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up
   ```

### Why Docker?

- **Consistent environments**: Same Node version and dependencies across machines
- **No local setup**: Node.js not required on host machine
- **Isolated**: Project dependencies don't conflict with other projects
- **Production-like**: Development environment matches deployment

## Development Philosophy

- **Keep it simple**: Prefer straightforward solutions
- **Modularity**: Separate business logic from UI
- **Reusability**: Don't duplicate game mechanics or utilities
- **Platform-agnostic core**: The `core/` package has no UI framework dependencies

See [.copilot-instructions](.copilot-instructions) for detailed guidelines on where code should live and how to make architectural decisions.

## Building for Production

### Web (PWA)
```bash
docker-compose exec improvisator npm run build:web
```

The output in `web/dist/` is a static site. The service worker and manifest enable offline functionality and installation.

### Mobile
```bash
docker-compose exec improvisator npm run build:mobile
# or for iOS: eas build --platform ios
# or for Android: eas build --platform android
```

## Contributing

When adding new games or features:
1. **Game logic goes in `core/`** - Both platforms use this
2. **UI goes in `web/` or `mobile/`** - Platform-specific implementations
3. **Utilities go in `core/`** - Even if only one platform uses it now
4. Keep `core/` framework-agnostic and tested

## License

See [LICENSE](LICENSE)
