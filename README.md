# improvisator

A progressive web app (PWA) for improv comedy practice, built with a modular architecture that shares code between web and mobile platforms.

## What is Improvisator?

Improvisator provides a collection of improv games and exercises for comedians and performers to practice their craft. Whether you're using the web app or the mobile app, you get the same high-quality experience with access to all games and features.

## Architecture: Shared Code Between PWA and Mobile

This project uses a **monorepo structure** with a shared core library. This approach ensures that business logic, game mechanics, and utilities are written once and used everywhere.

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

- **Consistent environments**: Same Node version, same dependencies everywhere
- **No local setup**: Don't need Node.js installed on your machine
- **Isolated**: Project dependencies don't conflict with other projects
- **Production-like**: Develop in an environment similar to deployment

## Development Philosophy

This project follows simple, pragmatic principles:
- **Keep it simple**: Choose straightforward solutions over complex architectures
- **Modularity**: Business logic is always separated from UI
- **Reusability**: Don't repeat game mechanics or utilities across platforms
- **Platform-agnostic core**: The `core/` package has zero UI framework dependencies

See [.copilot-instructions](.copilot-instructions) for detailed guidelines on where code should live and how to make architectural decisions.

## Building for Production

### Web (PWA)
```bash
docker-compose exec improvisator npm run build:web
```

The output in `web/dist/` is a static site ready to be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.). The service worker and manifest ensure it works offline and can be installed as an app.

### Mobile
```bash
docker-compose exec improvisator npm run build:mobile
# or for iOS: eas build --platform ios
# or for Android: eas build --platform android
```

## Contributing

When adding new games or features:
1. **Game logic goes in `core/`** - This ensures both platforms get the feature
2. **UI goes in `web/` or `mobile/`** - Platform-specific implementations
3. **Utilities go in `core/`** - Even if only used by one platform now, it might be useful later
4. Keep `core/` framework-agnostic and thoroughly tested

## License

See [LICENSE](LICENSE)
