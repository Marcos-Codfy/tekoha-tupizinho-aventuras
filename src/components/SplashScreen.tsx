
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showMascot, setShowMascot] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show mascot with animation after a short delay
    const mascotTimer = setTimeout(() => {
      setShowMascot(true);
    }, 500);

    // Navigate to profile selection after splash screen duration
    const navigationTimer = setTimeout(() => {
      navigate('/profile-selection');
    }, 3500);

    return () => {
      clearTimeout(mascotTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-tekoha-background z-50">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-tekoha-accent mb-8 tracking-wider animate-fade-in font-comic">
          TEKOHÁ
        </h1>
        
        {showMascot && (
          <div className="transition-all duration-1000 animate-mascot-appear">
            <img 
              src="/lovable-uploads/41076821-a84a-42bb-8d32-253008ac2a21.png" 
              alt="Tupizinho mascot" 
              className={`${isMobile ? 'w-32 h-32' : 'w-40 h-40'} mx-auto animate-float object-contain`}
            />
          </div>
        )}
        
        <div className="mt-16 flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
