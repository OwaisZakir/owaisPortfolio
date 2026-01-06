const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-primary text-primary-foreground font-display font-semibold tracking-wider uppercase rounded focus:outline-none focus:ring-2 focus:ring-secondary"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
