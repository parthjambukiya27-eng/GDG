import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ThreeDCanvas from './components/ThreeDCanvas';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import Organizers from './components/Organizers';
import ChapterVideo from './components/ChapterVideo';
import WebCreator from './components/WebCreator';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AssistantShell from './components/AssistantShell';
import { initLegacyUI } from './utils/legacy-script';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash route on mount
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (currentPath === '#/') {
      const timer = setTimeout(() => {
        const cleanup = initLegacyUI();
        window._legacyCleanup = cleanup;
      }, 50);

      return () => {
        clearTimeout(timer);
        if (window._legacyCleanup) {
          window._legacyCleanup();
          window._legacyCleanup = null;
        }
      };
    }
  }, [currentPath]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [currentPath]);

  useEffect(() => {
    if (user && (currentPath === '#/login' || currentPath === '#/register')) {
      navigate('#/');
    } else if (!user && currentPath === '#/dashboard') {
      navigate('#/login');
    }
  }, [user, currentPath]);

  const navigate = (hash) => {
    window.location.hash = hash;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('#/');
  };

  const isAuthRoute = currentPath === '#/login' || currentPath === '#/register';
  const isDashboardRoute = currentPath === '#/dashboard';

  return (
    <>
      <Loader />
      <ThreeDCanvas />

      {isDashboardRoute && user ? (
        <DashboardPage 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={(updatedUser) => {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
          }}
          navigate={navigate} 
        />
      ) : isAuthRoute ? (
        <AuthPage currentPath={currentPath} navigate={navigate} />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen justify-between px-4 max-w-[1440px] mx-auto w-full max-sm:px-2">
          <Header 
            user={user} 
            onLogout={handleLogout} 
            onOpenLogin={() => navigate('#/login')} 
            onOpenRegister={() => navigate('#/register')} 
            onOpenDashboard={() => navigate('#/dashboard')}
          />
          
          <main className="flex-grow">
            <Hero user={user} onOpenRegister={() => navigate('#/register')} />
            <About />
            <UpcomingEvents />
            <PastEvents />
            <Organizers />
            <ChapterVideo />
            <WebCreator />
          </main>
          
          <Footer />
        </div>
      )}

      <AssistantShell />
    </>
  );
}

export default App;
