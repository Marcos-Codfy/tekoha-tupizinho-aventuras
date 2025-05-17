
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mascot from './Mascot';
import { BookOpen, MessageSquare, Mic, BookMarked, Gamepad2, Trophy, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState('Bem-vindo ao TEKOHÁ! Aqui você pode explorar várias trilhas de aprendizado. Por onde quer começar?');

  const features = [
    {
      id: 'translator',
      name: 'Tradutor Tupi-Português',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'bg-tekoha-highlight',
      path: '/translator'
    },
    {
      id: 'glossary',
      name: 'Glossário Ilustrado',
      icon: <BookMarked className="h-8 w-8" />,
      color: 'bg-tekoha-secondary',
      path: '/glossary'
    },
    {
      id: 'games',
      name: 'Jogos Educativos',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'bg-tekoha-interactive',
      path: '/games'
    },
    {
      id: 'comics',
      name: 'Histórias em Quadrinhos',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-tekoha-accent/90',
      path: '/comics'
    },
    {
      id: 'practice',
      name: 'Prática com IA',
      icon: <Mic className="h-8 w-8" />,
      color: 'bg-tekoha-secondary',
      path: '/practice'
    },
    {
      id: 'achievements',
      name: 'Níveis e Conquistas',
      icon: <Trophy className="h-8 w-8" />,
      color: 'bg-tekoha-highlight',
      path: '/achievements'
    }
  ];

  const handleFeatureClick = (feature: string, path: string) => {
    const messages: {[key: string]: string} = {
      translator: 'No tradutor você pode converter textos entre Tupi e Português. Muito útil para aprender novas palavras!',
      glossary: 'O glossário ilustrado tem imagens e áudios para aprender palavras em Tupi!',
      games: 'Jogos divertidos para treinar seu vocabulário e gramática!',
      comics: 'Histórias interativas para praticar leitura em Tupi!',
      practice: 'Pratique conversação com o Tupizinho! Vamos conversar?',
      achievements: 'Veja seu progresso e conquistas! Continue aprendendo para ganhar medalhas!'
    };
    
    setWelcomeMessage(messages[feature] || welcomeMessage);
    
    // Navegar para a página após uma pequena pausa
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-tekoha-accent font-comic">TEKOHÁ</h1>
        <button 
          className="p-2 rounded-full bg-tekoha-secondary/20 hover:bg-tekoha-secondary/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50"
          onClick={() => navigate('/settings')}
          aria-label="Ir para configurações"
        >
          <Settings className="h-6 w-6 text-gray-700" />
        </button>
      </header>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel Principal</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md p-4 flex flex-col items-center text-center gap-3 cursor-pointer hover:scale-105 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50"
              onClick={() => handleFeatureClick(feature.id, feature.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFeatureClick(feature.id, feature.path);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Acessar ${feature.name}`}
            >
              <div className={`${feature.color} p-4 rounded-full`}>
                {feature.icon}
              </div>
              <h3 className="text-gray-800 font-medium">{feature.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Progresso Semanal</h3>
          <div className="bg-white border-2 border-tekoha-secondary/30 rounded-xl p-4 shadow-md">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
              <div className="bg-tekoha-accent h-4 rounded-full" style={{width: '35%'}}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>35% concluído</span>
              <span>7 dias restantes</span>
            </div>
          </div>
        </div>
      </div>

      <Mascot 
        position="bottom-right" 
        message={welcomeMessage}
        autoHide={false}
        size="md"
      />
    </div>
  );
};

export default HomePage;
