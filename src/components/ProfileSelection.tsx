import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, BookOpen, GraduationCap, Users } from 'lucide-react';
import Mascot from './Mascot';
import { Button } from './ui/button';

interface ProfileSelectionProps {
  onProfileSelect?: (profileId: string) => void;
}

const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onProfileSelect }) => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [mascotMessage, setMascotMessage] = useState('Olá! Eu sou o Tupizinho! Selecione seu perfil para continuarmos nossa jornada!');

  const profiles = [
    { 
      id: 'health', 
      name: 'Trabalhador da saúde', 
      icon: Stethoscope,
      message: 'Ajudando a cuidar da saúde de nossa comunidade!',
      color: 'text-destructive'
    },
    { 
      id: 'teacher', 
      name: 'Professor', 
      icon: BookOpen,
      message: 'Compartilhando conhecimento e preservando nossa cultura!',
      color: 'text-secondary'
    },
    { 
      id: 'student', 
      name: 'Estudante', 
      icon: GraduationCap,
      message: 'Aprendendo sobre nossa língua e tradições!',
      color: 'text-accent'
    },
    { 
      id: 'indigenous', 
      name: 'Indígena', 
      icon: Users,
      message: 'Porã! Bem-vindo de volta à sua comunidade!',
      color: 'text-primary'
    }
  ];

  const handleProfileSelect = (profileId: string, message: string) => {
    setSelectedProfile(profileId);
    setMascotMessage(message);
    
    if (onProfileSelect) {
      onProfileSelect(profileId);
    }
    
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-foreground">
          Escolha seu Perfil
        </h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Personalize sua experiência de aprendizado
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedProfile === profile.id;
            
            return (
              <button
                key={profile.id}
                className={`profile-card ${isSelected ? 'border-primary scale-105' : ''}`}
                onClick={() => handleProfileSelect(profile.id, profile.message)}
                aria-label={`Selecionar perfil de ${profile.name}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-muted ${profile.color}`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xl font-bold text-foreground">{profile.name}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <Mascot 
        position="center" 
        message={mascotMessage}
        autoHide={false}
        size="md"
      />
    </div>
  );
};

export default ProfileSelection;
