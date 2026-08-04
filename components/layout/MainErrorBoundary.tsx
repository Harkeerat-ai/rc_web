"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class MainErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error("Page error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h2 className="font-heading text-2xl text-gold mb-4">
            Something went wrong
          </h2>
          <p className="text-text-muted text-sm max-w-md mb-6">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <pre className="text-xs text-crimson/70 max-w-xl overflow-auto mb-6 p-4 bg-surface/50 rounded-lg">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm hover:bg-gold/20 transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
