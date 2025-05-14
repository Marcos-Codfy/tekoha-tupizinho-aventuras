
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import ProfileSelection from "./components/ProfileSelection";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import TranslatorPage from "./pages/TranslatorPage";
import GlossaryPage from "./pages/GlossaryPage";
import GamesPage from "./pages/GamesPage";
import ComicsPage from "./pages/ComicsPage";
import PracticePage from "./pages/PracticePage";
import AchievementsPage from "./pages/AchievementsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showNavigation, setShowNavigation] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    // Hide splash after first load
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }

    // Check if user has selected a profile
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(profile);
      setShowNavigation(true);
    }
  }, []);

  // Update navigation visibility based on route
  const handleProfileSelect = (profileId: string) => {
    localStorage.setItem('userProfile', profileId);
    setUserProfile(profileId);
    setShowNavigation(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showSplash && window.location.pathname === '/' && <SplashScreen />}
          <div className="min-h-screen pb-20"> {/* Add padding to bottom for navigation bar */}
            <Routes>
              <Route path="/" element={showSplash ? null : <ProfileSelection onProfileSelect={handleProfileSelect} />} />
              <Route path="/profile-selection" element={<ProfileSelection onProfileSelect={handleProfileSelect} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/translator" element={<TranslatorPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {showNavigation && <Navigation />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
