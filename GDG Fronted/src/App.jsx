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
import CoordinatorDashboardPage from './pages/CoordinatorDashboardPage';
import SettingsPage from './pages/SettingsPage';
import CoordinatorSettingsPage from './pages/CoordinatorSettingsPage';
import PublicProfilePage from './pages/PublicProfilePage';
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
    } else {
      // If navigating away from home, run cleanup
      if (window._legacyCleanup) {
        window._legacyCleanup();
        window._legacyCleanup = null;
      }
    }
  }, [currentPath]);

  const syncUser = (updatedUser) => {
    const normalizedUser = {
      ...updatedUser,
      avatarUrl: updatedUser?.avatarUrl || updatedUser?.profilePhotoUrl,
      profilePhotoUrl: updatedUser?.profilePhotoUrl || updatedUser?.avatarUrl
    };

    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const normalizedUser = {
          ...parsedUser,
          avatarUrl: parsedUser?.avatarUrl || parsedUser?.profilePhotoUrl,
          profilePhotoUrl: parsedUser?.profilePhotoUrl || parsedUser?.avatarUrl
        };
        setUser(normalizedUser);
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
      navigate(user.role === 'coordinator' ? '#/coordinator-dashboard' : '#/');
    } else if (!user && currentPath === '#/dashboard') {
      navigate('#/login');
    } else if (user && currentPath === '#/dashboard' && user.role === 'coordinator') {
      navigate('#/coordinator-dashboard');
    } else if (user && currentPath === '#/coordinator-dashboard' && user.role !== 'coordinator') {
      navigate('#/dashboard');
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
  const isCoordinatorDashboardRoute = currentPath === '#/coordinator-dashboard';
  const isSettingsRoute = currentPath === '#/settings';
  const isCoordinatorSettingsRoute = currentPath === '#/coordinator-settings';
  const isProfileRoute = currentPath.startsWith('#/profile/');
  const profileUserId = isProfileRoute ? currentPath.split('/')[2] : null;

  return (
    <>
      <Loader />
      <ThreeDCanvas />

      {isProfileRoute && profileUserId ? (
        <PublicProfilePage userId={profileUserId} navigate={navigate} />
      ) : isCoordinatorSettingsRoute && user?.role === 'coordinator' ? (
        <CoordinatorSettingsPage user={user} onLogout={handleLogout} onUserUpdate={syncUser} navigate={navigate} />
      ) : isSettingsRoute && user ? (
        <SettingsPage user={user} onLogout={handleLogout} onUserUpdate={syncUser} navigate={navigate} />
      ) : isCoordinatorDashboardRoute && user?.role === 'coordinator' ? (
        <CoordinatorDashboardPage user={user} onLogout={handleLogout} onUserUpdate={syncUser} navigate={navigate} />
      ) : isDashboardRoute && user ? (
        <DashboardPage 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={async (updatedUser) => {
            syncUser(updatedUser);
            try {
              const token = localStorage.getItem('token');
              const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
              const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  fullName: updatedUser.fullName || updatedUser.name,
                  profilePhotoUrl: updatedUser.profilePhotoUrl || updatedUser.avatarUrl,
                  bio: updatedUser.bio || ''
                })
              });
              if (!response.ok) {
                console.error('Failed to sync profile with database');
              }
            } catch (err) {
              console.error('Network error syncing profile with database:', err);
            }
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
