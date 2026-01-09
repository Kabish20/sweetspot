import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100">
                        <div className="text-5xl mb-6">🤕</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            The application encountered an error. Please try refreshing the page.
                        </p>

                        <div className="bg-red-50 rounded-xl p-4 mb-6 overflow-auto max-h-60">
                            <p className="font-mono text-xs text-red-800 whitespace-pre-wrap">
                                {this.state.error?.toString()}
                            </p>
                            {this.state.errorInfo && (
                                <pre className="font-mono text-xs text-red-600 mt-2">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            )}
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-6 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
