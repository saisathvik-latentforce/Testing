# Contributing to CuppaCart

First off, thank you for considering contributing to CuppaCart! It's people like you that make CuppaCart such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a branch for your changes

## Development Setup

### Prerequisites

- Node.js >= 18.0.0 (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm >= 9.0.0

### Installation

```bash
# Clone your fork
git clone https://github.com/your-username/Testing.git
cd Testing

# Use the correct Node version
nvm use

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests once (for CI)
npm run test:ci
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check Prettier formatting
npm run format:check

# Format code with Prettier
npm run format
```

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the existing issues to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

When you create a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some similar features in other projects if applicable**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and ensure they pass
5. Run linting and fix any issues
6. Commit your changes (see [Commit Messages](#commit-messages))
7. Push to your fork
8. Open a Pull Request

## Style Guidelines

### JavaScript/React Style

- We use ESLint with Airbnb configuration
- We use Prettier for code formatting
- Use functional components with hooks
- Use PropTypes for type checking
- Write self-documenting code with clear variable names

### File Organization

```
src/
├── components/        # Reusable UI components
├── assets/           # Static assets (images, fonts, data)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── services/         # API calls and external services
├── context/          # React context providers
└── __tests__/        # Test files
```

### Naming Conventions

- Components: PascalCase (e.g., `CoffeeCard.js`)
- Utilities/Hooks: camelCase (e.g., `useCart.js`)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```
feat(cart): add localStorage persistence

fix(payment): validate UPI ID format

docs(readme): add installation instructions

test(coffee): add unit tests for Coffee component
```

## Pull Request Process

1. Update the README.md with details of changes to the interface if applicable
2. Ensure all tests pass and there are no linting errors
3. Update the documentation if needed
4. Link any related issues in the PR description
5. Request review from maintainers
6. Once approved, your PR will be merged by a maintainer

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for contributing! ☕
