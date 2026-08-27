import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (in production, you'd send to a logging service)
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
              <p className="text-slate-400 mb-6">
                I apologize for the inconvenience. Please refresh the page or try again later.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                Refresh Page
              </button>
              <a
                href="mailto:abdullahamarmusa.dev@gmail.com"
                className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Report Issue
              </a>
            </div>

            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-slate-400 cursor-pointer mb-2">Error Details (Development)</summary>
                <pre className="text-xs text-red-400 bg-slate-900 p-4 rounded-lg overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
