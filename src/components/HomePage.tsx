import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Compass, BookOpen, User } from 'lucide-react';
import Mascot from './Mascot';
import BackButton from './BackButton';

const HomePage = () => {
  const navigate = useNavigate();
  const [learningPath, setLearningPath] = useState('beginner');
  const [mascotMessage, setMascotMessage] = useState('Olá! Escolha um nível para começar a aprender!');

  const handleLevelSelect = (level: string) => {
    setLearningPath(level);
    setMascotMessage(`Você escolheu o nível ${level}! Vamos começar!`);
  };

  const handleProfileChange = () => {
    setMascotMessage('Vamos trocar de perfil?');
    
    // Navigate to profile selection page with a small delay to show the mascot message
    setTimeout(() => {
      navigate('/profile-selection');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton to="/profile-selection" />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Aprender Tupi</h1>
        </div>
        <Compass className="h-6 w-6 text-tekoha-red" />
      </header>
      
      {/* Content goes here */}
      <div className="flex-1 flex flex-col">
        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Bem-vindo(a)!</h2>
          <p className="text-[#F2F2F2]">
            Explore as maravilhas da língua Tupi-Guarani. Escolha seu nível e comece a aprender!
          </p>
        </div>

        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Níveis de Aprendizagem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="secondary" 
              className="bg-tekoha-secondary hover:bg-tekoha-secondary/90 text-tekoha-accent"
              onClick={() => handleLevelSelect('beginner')}
            >
              Iniciante
            </Button>
            <Button 
              variant="secondary" 
              className="bg-tekoha-secondary hover:bg-tekoha-secondary/90 text-tekoha-accent"
              onClick={() => handleLevelSelect('intermediate')}
            >
              Intermediário
            </Button>
            <Button 
              variant="secondary" 
              className="bg-tekoha-secondary hover:bg-tekoha-secondary/90 text-tekoha-accent"
              onClick={() => handleLevelSelect('advanced')}
            >
              Avançado
            </Button>
          </div>
        </div>

        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Seu Perfil</h2>
          
          <div className="flex items-center gap-4">
            <div className="bg-tekoha-secondary/20 p-3 rounded-full">
              <User className="h-6 w-6 text-tekoha-red" />
            </div>
            <div className="flex-1">
              <p className="text-[#F2F2F2] font-medium">Professor</p>
              <p className="text-[#F2F2F2] text-sm">Perfil selecionado</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleProfileChange}
              className="flex items-center gap-1 text-tekoha-highlight border-tekoha-highlight hover:bg-tekoha-background hover:text-tekoha-accent"
            >
              Trocar Perfil
            </Button>
          </div>
        </div>
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
      />
    </div>
  );
};

export default HomePage;
