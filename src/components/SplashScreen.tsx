import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showMascot, setShowMascot] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const mascotTimer = setTimeout(() => {
      setShowMascot(true);
    }, 500);

    const navigationTimer = setTimeout(() => {
      navigate('/profile-selection');
    }, 3000);

    return () => {
      clearTimeout(mascotTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-12 tracking-tight animate-fade-in">
          TEKOHÁ
        </h1>
        
        {showMascot && (
          <div className="animate-mascot-appear">
            <img 
              src="/lovable-uploads/41076821-a84a-42bb-8d32-253008ac2a21.png" 
              alt="Tupizinho mascot" 
              className={`${isMobile ? 'w-36 h-36' : 'w-48 h-48'} mx-auto animate-float object-contain drop-shadow-lg`}
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
