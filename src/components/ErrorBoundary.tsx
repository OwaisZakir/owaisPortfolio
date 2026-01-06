import React, { ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error details for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
            <div className="max-w-md w-full space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <AlertCircle className="w-16 h-16 text-destructive animate-pulse" />
                  <div className="absolute inset-0 bg-destructive/20 blur-xl" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h1 className="text-2xl font-display font-bold">Oops! Something went wrong</h1>
                <p className="text-foreground/70">
                  We encountered an unexpected error. Please try refreshing the page or contact support.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-card border border-border rounded-lg p-4 space-y-2 max-h-40 overflow-auto">
                  <p className="text-xs font-mono text-destructive font-semibold">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-xs text-foreground/60 font-mono">
                      <summary className="cursor-pointer font-semibold text-foreground/80 mb-2">
                        Stack Trace
                      </summary>
                      <pre className="whitespace-pre-wrap break-words">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <button
                onClick={this.resetError}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded font-display font-semibold tracking-wider uppercase transition-colors"
              >
                <RotateCw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
