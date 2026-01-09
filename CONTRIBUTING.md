# Contributing to Owais's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report any issues or concerns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Code Style

- Follow the existing code style in the project
- Use TypeScript for type safety
- Follow the naming conventions used in components
- Keep components focused and reusable

### Commit Messages

Use clear, descriptive commit messages:
```bash
git commit -m "feat: add new animation to hero section"
git commit -m "fix: resolve 3D icon rendering issue on mobile"
git commit -m "docs: update deployment instructions"
```

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Build system, dependencies, etc

### Before Submitting a PR

1. **Run linter**
   ```bash
   npm run lint
   ```

2. **Type checking**
   ```bash
   npm run type-check
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test on different browsers** if UI changes were made

5. **Update documentation** if needed

## Submitting a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub
   - Use the PR template
   - Provide clear description of changes
   - Reference any related issues
   - Add screenshots for UI changes

3. **Respond to feedback** promptly

4. **Ensure CI/CD passes**
   - All checks must pass
   - No new warnings or errors
   - Build must complete successfully

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Shadcn UI components
│   ├── sections/    # Page sections
│   └── ...          # Other components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── config/          # Configuration files
├── context/         # React context
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Component Guidelines

### Creating New Components

```typescript
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ComponentProps {
  title: string;
  // ... other props
}

const YourComponent = ({ title }: ComponentProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Component content */}
    </motion.div>
  );
};

export default YourComponent;
```

### Best Practices

- **Accessibility**: Always consider screen readers and keyboard navigation
- **Performance**: Use `React.memo` for expensive components
- **Animations**: Respect `prefers-reduced-motion` preference
- **Responsive**: Test on mobile, tablet, and desktop
- **Types**: Always use TypeScript types
- **Comments**: Add comments for complex logic

## Testing

### Running Tests

```bash
npm run test
```

### Writing Tests

- Write tests for utility functions
- Test component rendering
- Test user interactions
- Test edge cases

## Documentation

### Update README if you:
- Add a new major feature
- Change installation instructions
- Add new dependencies

### Update JSDoc comments for:
- Complex functions
- Exported components
- Custom hooks

## Performance Considerations

- Minimize bundle size
- Lazy load heavy components
- Use proper image optimization
- Avoid unnecessary re-renders
- Profile with browser DevTools

## Accessibility Requirements

- Use semantic HTML
- Ensure color contrast ratios meet WCAG AA
- Test with keyboard navigation only
- Test with screen readers (NVDA, JAWS)
- Include alt text for images
- Use aria labels where needed

## Reporting Issues

When reporting issues, please include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots/videos if applicable
- Console errors

## Questions or Need Help?

- Check existing issues and PRs
- Review the documentation
- Open a discussion on GitHub

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🚀
