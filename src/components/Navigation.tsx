
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageSquare, BookMarked, Gamepad2, Mic, Trophy, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { 
      id: 'home',
      name: 'Aprender', 
      path: '/home', 
      icon: <BookOpen className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para a página de aprendizagem'
    },
    { 
      id: 'translator',
      name: 'Tradutor', 
      path: '/translator', 
      icon: <MessageSquare className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para o tradutor'
    },
    { 
      id: 'glossary',
      name: 'Glossário', 
      path: '/glossary', 
      icon: <BookMarked className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para o glossário'
    },
    { 
      id: 'games',
      name: 'Jogos', 
      path: '/games', 
      icon: <Gamepad2 className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para os jogos'
    },
    { 
      id: 'practice',
      name: 'Prática', 
      path: '/practice', 
      icon: <Mic className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para a página de prática'
    },
    { 
      id: 'achievements',
      name: 'Conquistas', 
      path: '/achievements', 
      icon: <Trophy className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Ir para as conquistas'
    },
    { 
      id: 'settings',
      name: 'Config', 
      path: '/settings', 
      icon: <Settings className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />,
      ariaLabel: 'Configurações do aplicativo'
    }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-tekoha-secondary/30 z-40"
      role="navigation" 
      aria-label="Menu principal"
    >
      <nav className={`flex justify-between items-center ${isMobile ? 'px-1 py-1' : 'px-2 py-1'}`}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.id} 
              to={item.path}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center ${isMobile ? 'p-1' : 'p-2'} rounded-lg ${
                isActive ? 'text-tekoha-accent bg-tekoha-secondary/10' : 'text-gray-600 hover:text-tekoha-accent hover:bg-gray-100'
              } active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50`}
            >
              <div className={`${isMobile ? 'p-1' : 'p-2'} rounded-full ${isActive ? 'bg-tekoha-secondary/20' : ''}`}>
                {item.icon}
              </div>
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} mt-1`}>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
};

export default Navigation;
