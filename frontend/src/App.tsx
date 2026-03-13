import { Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ScenarioSelect } from './pages/ScenarioSelect';
import { Game } from './pages/Game';
import { DecisionTreePage } from './pages/DecisionTreePage';
import './App.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1>Something went wrong</h1>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>{this.state.error?.message}</p>
          <a href="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Return to scenario select</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1>Page not found</h1>
      <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Return to scenario select</Link>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScenarioSelect />} />
          <Route path="/game" element={<Game />} />
          <Route path="/narrative/:scenarioId" element={<DecisionTreePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
