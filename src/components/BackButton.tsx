
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  to?: string; // Optional specific route to go back to
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ to, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      // If we're at the root, go to profile selection
      if (location.pathname === '/home') {
        navigate('/profile-selection');
      } else {
        navigate(-1); // Default go back behavior
      }
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBack}
      className={`p-2 hover:bg-tekoha-secondary/20 ${className}`}
      aria-label="Voltar"
    >
      <ArrowLeft className="h-5 w-5 text-tekoha-red" />
    </Button>
  );
};

export default BackButton;
