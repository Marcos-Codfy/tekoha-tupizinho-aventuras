
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageSquare, BookMarked, Gamepad2, Mic, Trophy, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      id: 'home',
      name: 'Aprender', 
      path: '/home', 
      icon: <BookOpen className="h-6 w-6" /> 
    },
    { 
      id: 'translator',
      name: 'Tradutor', 
      path: '/translator', 
      icon: <MessageSquare className="h-6 w-6" /> 
    },
    { 
      id: 'glossary',
      name: 'Glossário', 
      path: '/glossary', 
      icon: <BookMarked className="h-6 w-6" /> 
    },
    { 
      id: 'games',
      name: 'Jogos', 
      path: '/games', 
      icon: <Gamepad2 className="h-6 w-6" /> 
    },
    { 
      id: 'practice',
      name: 'Prática', 
      path: '/practice', 
      icon: <Mic className="h-6 w-6" /> 
    },
    { 
      id: 'achievements',
      name: 'Conquistas', 
      path: '/achievements', 
      icon: <Trophy className="h-6 w-6" /> 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-tekoha-background border-t-2 border-tekoha-secondary/30">
      <nav className="flex justify-between items-center px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                isActive ? 'text-tekoha-accent' : 'text-white/70 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-full ${isActive ? 'bg-tekoha-secondary/20' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
        
        <Link 
          to="/settings"
          className="flex flex-col items-center justify-center p-2 rounded-lg text-white/70 hover:text-white"
        >
          <div className="p-2 rounded-full">
            <Settings className="h-6 w-6" />
          </div>
          <span className="text-xs mt-1">Config</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
