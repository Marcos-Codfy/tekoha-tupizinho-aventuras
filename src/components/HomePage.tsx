
import React, { useState, useEffect } from 'react';
import Mascot from './Mascot';
import { BookOpen, MessageSquare, Mic, BookMarked, Gamepad2, Trophy, Settings } from 'lucide-react';

const HomePage: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('Bem-vindo ao TEKOHÁ! Aqui você pode explorar várias trilhas de aprendizado. Por onde quer começar?');

  const features = [
    {
      id: 'translator',
      name: 'Tradutor Tupi-Português',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'bg-tekoha-highlight'
    },
    {
      id: 'glossary',
      name: 'Glossário Ilustrado',
      icon: <BookMarked className="h-8 w-8" />,
      color: 'bg-tekoha-secondary'
    },
    {
      id: 'games',
      name: 'Jogos Educativos',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'bg-tekoha-interactive'
    },
    {
      id: 'comics',
      name: 'Histórias em Quadrinhos',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-tekoha-accent/90'
    },
    {
      id: 'practice',
      name: 'Prática com IA',
      icon: <Mic className="h-8 w-8" />,
      color: 'bg-tekoha-secondary'
    },
    {
      id: 'achievements',
      name: 'Níveis e Conquistas',
      icon: <Trophy className="h-8 w-8" />,
      color: 'bg-tekoha-highlight'
    }
  ];

  const handleFeatureClick = (feature: string) => {
    const messages: {[key: string]: string} = {
      translator: 'No tradutor você pode converter textos entre Tupi e Português. Muito útil para aprender novas palavras!',
      glossary: 'O glossário ilustrado tem imagens e áudios para aprender palavras em Tupi!',
      games: 'Jogos divertidos para treinar seu vocabulário e gramática!',
      comics: 'Histórias interativas para praticar leitura em Tupi!',
      practice: 'Pratique conversação com o Tupizinho! Vamos conversar?',
      achievements: 'Veja seu progresso e conquistas! Continue aprendendo para ganhar medalhas!'
    };
    
    setWelcomeMessage(messages[feature] || welcomeMessage);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-tekoha-accent font-comic">TEKOHÁ</h1>
        <button className="p-2 rounded-full bg-tekoha-secondary/20 hover:bg-tekoha-secondary/30">
          <Settings className="h-6 w-6 text-white" />
        </button>
      </header>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white mb-6">Painel Principal</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="tekoha-card p-4 flex flex-col items-center text-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className={`${feature.color} p-4 rounded-full`}>
                {feature.icon}
              </div>
              <h3 className="text-white font-medium">{feature.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Progresso Semanal</h3>
          <div className="tekoha-card p-4">
            <div className="w-full bg-white/10 rounded-full h-4 mb-1">
              <div className="bg-tekoha-accent h-4 rounded-full" style={{width: '35%'}}></div>
            </div>
            <div className="flex justify-between text-sm text-white/70">
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
      />
    </div>
  );
};

export default HomePage;
