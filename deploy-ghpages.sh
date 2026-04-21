#!/bin/bash
set -e

BRANCH=gh-pages
DIST=web/dist
TMP=/tmp/improvisator-ghpages

echo "Building inside Docker..."
docker-compose run --rm -e VITE_BASE=/improvisator/ improvisator sh -c "npm run build:core && cd web && npm run build"

echo "Deploying $DIST to $BRANCH..."

# Clean up any leftover worktree
git worktree remove "$TMP" --force 2>/dev/null || true
rm -rf "$TMP"

# Check out (or create) the gh-pages branch in a temp worktree
if git show-ref --quiet refs/heads/$BRANCH; then
  git worktree add "$TMP" $BRANCH
else
  git worktree add --orphan -b $BRANCH "$TMP"
fi

# Sync dist into the worktree
rsync -a --delete --exclude='.git' "$DIST/" "$TMP/"

cd "$TMP"
git add -A
git commit -m "deploy $(date '+%Y-%m-%d %H:%M')" || echo "Nothing to commit"
git push origin $BRANCH --force
cd -

git worktree remove "$TMP" --force
echo "Done. Visit https://byllc.github.io/improvisator/"
