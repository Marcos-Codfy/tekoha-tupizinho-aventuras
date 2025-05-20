
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
      icon: <Stethoscope className="h-12 w-12 text-tekoha-interactive" aria-hidden="true" />,
      message: 'Ajudando a cuidar da saúde de nossa comunidade!',
      ariaLabel: 'Selecionar perfil de trabalhador da saúde',
      bgColor: 'bg-tekoha-red'
    },
    { 
      id: 'teacher', 
      name: 'Professor', 
      icon: <BookOpen className="h-12 w-12 text-tekoha-interactive" aria-hidden="true" />,
      message: 'Compartilhando conhecimento e preservando nossa cultura!',
      ariaLabel: 'Selecionar perfil de professor',
      bgColor: 'bg-tekoha-red'
    },
    { 
      id: 'student', 
      name: 'Estudante', 
      icon: <GraduationCap className="h-12 w-12 text-tekoha-interactive" aria-hidden="true" />,
      message: 'Aprendendo sobre nossa língua e tradições!',
      ariaLabel: 'Selecionar perfil de estudante',
      bgColor: 'bg-tekoha-highlight'
    },
    { 
      id: 'indigenous', 
      name: 'Indígena', 
      icon: <Users className="h-12 w-12 text-tekoha-interactive" aria-hidden="true" />,
      message: 'Porã! Bem-vindo de volta à sua comunidade!',
      ariaLabel: 'Selecionar perfil indígena',
      bgColor: 'bg-tekoha-green'
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
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background" role="main">
      <div className="indigenous-border-top w-full mb-6"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-tekoha-highlight mb-10 text-center font-comic">
          Escolha seu Perfil
        </h1>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl animate-fade-in"
          role="group" 
          aria-label="Opções de perfil"
        >
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`${profile.bgColor} rounded-xl p-4 shadow-md ${selectedProfile === profile.id ? 'border-2 border-tekoha-highlight shadow-lg scale-105' : 'border border-tekoha-red/50'}`}
              onClick={() => handleProfileSelect(profile.id, profile.message)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProfileSelect(profile.id, profile.message);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={profile.ariaLabel}
              aria-selected={selectedProfile === profile.id}
            >
              <div className="flex items-center gap-3">
                <div className="bg-tekoha-background/20 p-3 rounded-full">
                  {profile.icon}
                </div>
                <p className="text-tekoha-interactive text-xl font-bold">{profile.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="indigenous-border-bottom w-full mt-6"></div>
      
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
