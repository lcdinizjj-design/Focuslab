
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { AppView } from './types';

// View Imports
import { LandingPage } from './views/LandingPage';
import { Auth } from './views/Auth';
import { Dashboard } from './views/Dashboard';
import { FocusMode } from './views/FocusMode';
import { Journey } from './views/Journey';
import { Library } from './views/Library';
import { Habits } from './views/Habits';
import { Settings } from './views/Settings';
import { Validation } from './views/Validation';
import { Modes } from './views/Modes';
import { Quiz } from './views/Quiz';
import { Productivity } from './views/Productivity';
import { ProtocolSelector } from './views/ProtocolSelector';
import { Gamification } from './views/Gamification';
import { Journal } from './views/Journal';
import { Community } from './views/Community';
import { Plans } from './views/Plans';
// New Views
import { ContextQuiz } from './views/ContextQuiz';
import { CustomRoutines } from './views/CustomRoutines';
// Components
import { NotificationSystem } from './components/NotificationSystem';

const ViewRouter: React.FC = () => {
  const { view, user } = useApp();

  // Route Guard
  // Logic: Allow Landing, Auth, Quiz, and ProtocolSelector (preview) without login
  // ProtocolSelector might trigger Auth if not logged in upon selection
  if (!user && ![AppView.LANDING, AppView.AUTH, AppView.QUIZ, AppView.PROTOCOL_SELECTOR, AppView.PLANS, AppView.CONTEXT_QUIZ].includes(view)) {
    return <LandingPage />;
  }

  switch (view) {
    case AppView.LANDING: return <LandingPage />;
    case AppView.QUIZ: return <Quiz />;
    case AppView.CONTEXT_QUIZ: return <ContextQuiz />;
    case AppView.AUTH: return <Auth />;
    case AppView.PROTOCOL_SELECTOR: return <ProtocolSelector />;
    case AppView.ONBOARDING: return <div className="p-8 text-center text-white">Onboarding Component Placeholder (Auto-skips in Auth logic)</div>;
    case AppView.DASHBOARD: return <Dashboard />;
    case AppView.FOCUS: return <FocusMode />;
    case AppView.JOURNEY: return <Journey />;
    case AppView.LIBRARY: return <Library />;
    case AppView.HABITS: return <Habits />;
    case AppView.SETTINGS: return <Settings />;
    case AppView.VALIDATION: return <Validation />;
    case AppView.MODES: return <Modes />;
    case AppView.PRODUCTIVITY: return <Productivity />;
    case AppView.GAMIFICATION: return <Gamification />;
    case AppView.JOURNAL: return <Journal />;
    case AppView.COMMUNITY: return <Community />;
    case AppView.PLANS: return <Plans />;
    case AppView.CUSTOM_ROUTINES: return <CustomRoutines />;
    default: return <Dashboard />;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <NotificationSystem />
      <Layout>
        <ViewRouter />
      </Layout>
    </AppProvider>
  );
};

export default App;
