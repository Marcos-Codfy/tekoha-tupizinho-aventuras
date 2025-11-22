import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Compass, User, ArrowLeft } from 'lucide-react';
import Mascot from './Mascot';

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
    setTimeout(() => {
      navigate('/profile-selection');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="content-container">
        <header className="flex items-center justify-between py-6 mb-8">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/profile-selection')}
              className="rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Aprender Tupi</h1>
          </div>
          <Compass className="h-7 w-7 text-primary" />
        </header>
        
        <div className="space-y-6">
          <div className="app-card">
            <h2 className="text-2xl font-bold text-foreground mb-3">Bem-vindo(a)!</h2>
            <p className="text-muted-foreground text-lg">
              Explore as maravilhas da língua Tupi-Guarani. Escolha seu nível e comece a aprender!
            </p>
          </div>

          <div className="app-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Níveis de Aprendizagem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="default"
                size="lg"
                onClick={() => handleLevelSelect('iniciante')}
                className="w-full"
              >
                Iniciante
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => handleLevelSelect('intermediário')}
                className="w-full"
              >
                Intermediário
              </Button>
              <Button 
                variant="accent"
                size="lg"
                onClick={() => handleLevelSelect('avançado')}
                className="w-full"
              >
                Avançado
              </Button>
            </div>
          </div>

          <div className="app-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Seu Perfil</h2>
            
            <div className="flex items-center gap-4">
              <div className="bg-muted p-4 rounded-2xl">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-bold text-lg">Professor</p>
                <p className="text-muted-foreground">Perfil selecionado</p>
              </div>
              <Button 
                variant="outline"
                onClick={handleProfileChange}
              >
                Trocar Perfil
              </Button>
            </div>
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
