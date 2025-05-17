
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MascotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  message?: string;
  autoHide?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Mascot: React.FC<MascotProps> = ({
  position = 'bottom-right',
  message,
  autoHide = true,
  size = 'md'
}) => {
  const [isVisible, setIsVisible] = useState(!!message);
  const [showMessage, setShowMessage] = useState(!!message);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setIsVisible(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => setIsVisible(false), 500);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    } else {
      setShowMessage(false);
    }
  }, [message, autoHide]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'center': 'bottom-16 inset-x-0 mx-auto'
  };
  
  const sizeClasses = {
    'sm': isMobile ? 'w-8 h-8' : 'w-10 h-10',
    'md': isMobile ? 'w-12 h-12' : 'w-16 h-16',
    'lg': isMobile ? 'w-16 h-16' : 'w-24 h-24'
  };

  const handleClick = () => {
    setShowMessage(!showMessage);
  };

  return isVisible ? (
    <div 
      className={`mascot-container fixed ${positionClasses[position]} z-50`}
      role="complementary" 
      aria-live="polite"
    >
      {showMessage && message && (
        <div 
          className="mascot-speech mb-2 mr-2 animate-fade-in max-w-[180px] md:max-w-xs bg-white text-tekoha-background p-3 md:p-4 rounded-2xl shadow-lg relative"
          role="status"
        >
          <p className="text-xs md:text-sm">{message}</p>
          <div className="absolute bottom-[-10px] right-10 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
        </div>
      )}
      <div 
        className={`${sizeClasses[size]} cursor-pointer animate-mascot-appear hover:scale-105 transition-transform duration-200`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Interagir com o mascote Tupizinho"
      >
        <img 
          src="/lovable-uploads/cc714f54-db55-4def-8d46-4721adaffc91.png" 
          alt="Tupizinho, o mascote do aplicativo Tekoha"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  ) : null;
};

export default Mascot;
