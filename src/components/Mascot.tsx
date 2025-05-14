
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
    'sm': isMobile ? 'w-12 h-12' : 'w-16 h-16',
    'md': isMobile ? 'w-16 h-16' : 'w-24 h-24',
    'lg': isMobile ? 'w-24 h-24' : 'w-32 h-32'
  };

  const handleClick = () => {
    setShowMessage(!showMessage);
  };

  return isVisible ? (
    <div className={`mascot-container ${positionClasses[position]}`}>
      {showMessage && message && (
        <div className="mascot-speech mb-3 mr-4 animate-fade-in max-w-[200px] md:max-w-xs">
          <p className="text-xs md:text-sm">{message}</p>
        </div>
      )}
      <div 
        className={`${sizeClasses[size]} cursor-pointer animate-mascot-appear hover:scale-105 transition-transform duration-200`}
        onClick={handleClick}
      >
        <img 
          src="/lovable-uploads/41076821-a84a-42bb-8d32-253008ac2a21.png" 
          alt="Tupizinho mascot"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  ) : null;
};

export default Mascot;
