# Contributing to Blockchain Data Ingestion

Thank you for your interest in extending this educational project! This guide will help you make meaningful contributions.

## Ways to Contribute

### 1. Add New Blockchain Support
- Implement new collector for Ethereum, Polygon, or other chains
- Follow the existing Bitcoin/Solana collector patterns
- Update schema and create migration scripts

### 2. Enhance Data Analysis
- Create new SQL queries in `docs/SAMPLE_QUERIES.md`
- Add visualization components to the dashboard
- Implement new metrics or insights

### 3. Improve Documentation
- Fix typos or unclear explanations
- Add more exercises in `docs/EXERCISES.md`
- Translate documentation to other languages

### 4. Fix Bugs
- Check GitHub Issues for reported bugs
- Test edge cases and report findings
- Submit fixes with test cases

## Development Setup

### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/big_data_architecture.git
cd big_data_architecture
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow existing code style
- Test locally with `docker compose up`
- Update documentation as needed

### 4. Test Your Changes
```bash
# Start all services
docker compose up -d

# Check logs
docker compose logs -f

# Run collector tests (if added)
docker exec -it blockchain-collector pytest

# Verify dashboard builds
cd dashboard && npm run build
```

### 5. Submit Pull Request
- Push to your fork
- Create PR with clear description
- Reference any related issues

## Code Style Guidelines

### Python (Collector)
- Follow PEP 8
- Use type hints
- Add docstrings to functions
- Keep functions under 50 lines

### TypeScript (Dashboard)
- Use functional components
- Leverage TypeScript types
- Follow existing naming conventions
- Keep components focused (single responsibility)

### SQL (Queries)
- Use uppercase for keywords
- Add comments explaining complex logic
- Optimize for ClickHouse columnar storage

## Commit Message Format

```
type(scope): Brief description

Detailed explanation of changes if needed.

Fixes #123
```

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Build/config changes

**Examples:**
```
feat(collector): Add Ethereum blockchain support
fix(dashboard): Fix pagination state on data refresh
docs(exercises): Add cross-chain analysis exercise
```

## Questions?

- Open a GitHub Discussion
- Check existing Issues
- Review the main README.md
