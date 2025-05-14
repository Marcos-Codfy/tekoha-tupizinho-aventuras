
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Stethoscope, BookOpen, GraduationCap, Heart, Users } from 'lucide-react';
import Mascot from './Mascot';

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
      icon: <Stethoscope className="h-12 w-12 text-tekoha-interactive" />,
      message: 'Ajudando a cuidar da saúde de nossa comunidade!'
    },
    { 
      id: 'teacher', 
      name: 'Professor', 
      icon: <BookOpen className="h-12 w-12 text-tekoha-interactive" />,
      message: 'Compartilhando conhecimento e preservando nossa cultura!'
    },
    { 
      id: 'student', 
      name: 'Estudante', 
      icon: <GraduationCap className="h-12 w-12 text-tekoha-interactive" />,
      message: 'Aprendendo sobre nossa língua e tradições!'
    },
    { 
      id: 'social', 
      name: 'Assistente social', 
      icon: <Heart className="h-12 w-12 text-tekoha-interactive" />,
      message: 'Auxiliando no bem-estar de nossa comunidade!'
    },
    { 
      id: 'indigenous', 
      name: 'Indígena', 
      icon: <Users className="h-12 w-12 text-tekoha-interactive" />,
      message: 'Porã! Bem-vindo de volta à sua comunidade!'
    }
  ];

  const handleProfileSelect = (profileId: string, message: string) => {
    setSelectedProfile(profileId);
    setMascotMessage(message);
    
    // Call the onProfileSelect callback if provided
    if (onProfileSelect) {
      onProfileSelect(profileId);
    }
    
    // Delay navigation to show the mascot message
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-tekoha-accent mb-10 text-center font-comic">
          Escolha seu Perfil
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl animate-fade-in">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-card ${selectedProfile === profile.id ? 'border-tekoha-accent shadow-lg scale-105' : ''}`}
              onClick={() => handleProfileSelect(profile.id, profile.message)}
            >
              {profile.icon}
              <p className="text-white text-center font-medium">{profile.name}</p>
            </div>
          ))}
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
