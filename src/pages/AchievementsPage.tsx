import React, { useState } from 'react';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Trophy, Star, BookOpen, MessageSquare, Gamepad2, Medal } from 'lucide-react';
import Mascot from '../components/Mascot';
import BackButton from '../components/BackButton';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
  category: 'translator' | 'glossary' | 'games' | 'comics' | 'practice';
}

interface Badge {
  id: string;
  name: string;
  image: string;
  description: string;
  unlocked: boolean;
  level: 'bronze' | 'silver' | 'gold';
}

const AchievementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [mascotMessage, setMascotMessage] = useState('Aqui estão suas conquistas! Continue aprendendo para ganhar mais medalhas!');

  const achievements: Achievement[] = [
    {
      id: 'a1',
      name: 'Primeiras Palavras',
      description: 'Aprenda 10 palavras em Tupi',
      icon: <BookOpen className="h-5 w-5 text-tekoha-highlight" />,
      progress: 70,
      unlocked: false,
      category: 'glossary'
    },
    {
      id: 'a2',
      name: 'Tradutor Iniciante',
      description: 'Complete 5 traduções',
      icon: <MessageSquare className="h-5 w-5 text-tekoha-highlight" />,
      progress: 100,
      unlocked: true,
      category: 'translator'
    },
    {
      id: 'a3',
      name: 'Jogador Dedicado',
      description: 'Jogue todos os jogos disponíveis',
      icon: <Gamepad2 className="h-5 w-5 text-tekoha-highlight" />,
      progress: 50,
      unlocked: false,
      category: 'games'
    },
    {
      id: 'a4',
      name: 'Mestre da Memória',
      description: 'Complete o jogo da memória 3 vezes',
      icon: <Star className="h-5 w-5 text-tekoha-highlight" />,
      progress: 33,
      unlocked: false,
      category: 'games'
    },
    {
      id: 'a5',
      name: 'Leitor Ávido',
      description: 'Leia todas as histórias disponíveis',
      icon: <BookOpen className="h-5 w-5 text-tekoha-highlight" />,
      progress: 30,
      unlocked: false,
      category: 'comics'
    },
    {
      id: 'a6',
      name: 'Conversador',
      description: 'Tenha 10 interações com o Tupizinho',
      icon: <MessageSquare className="h-5 w-5 text-tekoha-highlight" />,
      progress: 60,
      unlocked: false,
      category: 'practice'
    },
  ];

  const badges: Badge[] = [
    {
      id: 'b1',
      name: 'Iniciante em Tupi',
      image: '🥉',
      description: 'Complete 5 lições básicas',
      unlocked: true,
      level: 'bronze'
    },
    {
      id: 'b2',
      name: 'Explorador Cultural',
      image: '🥈',
      description: 'Descubra 10 fatos sobre a cultura indígena',
      unlocked: false,
      level: 'silver'
    },
    {
      id: 'b3',
      name: 'Falante Fluente',
      image: '🥇',
      description: 'Domine 100 palavras em Tupi',
      unlocked: false,
      level: 'gold'
    },
    {
      id: 'b4',
      name: 'Jogador Dedicado',
      image: '🎮',
      description: 'Complete todos os jogos com pontuação máxima',
      unlocked: false,
      level: 'silver'
    },
    {
      id: 'b5',
      name: 'Contador de Histórias',
      image: '📚',
      description: 'Leia e traduza 5 histórias em quadrinhos',
      unlocked: false,
      level: 'bronze'
    }
  ];

  const learningStats = {
    wordsLearned: 32,
    daysStreak: 5,
    minutesStudied: 120,
    completedLessons: 8,
    level: 3,
    xp: 750,
    nextLevel: 1000
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const tabMessages: Record<string, string> = {
      'achievements': 'Complete conquistas para ganhar XP e subir de nível!',
      'badges': 'Colecione medalhas conforme avança no seu aprendizado!',
      'stats': 'Veja suas estatísticas de aprendizado. Continue praticando!'
    };
    
    setMascotMessage(tabMessages[value] || 'Acompanhe seu progresso!');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Conquistas</h1>
        </div>
        <Trophy className="h-6 w-6 text-tekoha-red" />
      </header>

      <Tabs defaultValue="achievements" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="badges">Medalhas</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`tekoha-card p-4 ${achievement.unlocked ? 'border-tekoha-accent' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-tekoha-accent/20' : 'bg-tekoha-secondary/20'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-lg font-medium text-[#F2F2F2] flex items-center">
                      {achievement.name}
                      {achievement.unlocked && (
                        <Medal className="h-4 w-4 text-tekoha-accent ml-2" />
                      )}
                    </h3>
                    <p className="text-[#F2F2F2] text-sm">{achievement.description}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={achievement.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-[#F2F2F2] mt-1">
                    <span>{achievement.progress}%</span>
                    {achievement.unlocked ? (
                      <span className="text-tekoha-accent">Conquistado!</span>
                    ) : (
                      <span className="text-[#F2F2F2]">Em progresso</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`tekoha-card p-4 text-center ${
                  badge.unlocked ? 'border-tekoha-accent/70' : 'opacity-70'
                }`}
              >
                <div className="text-4xl mb-2">{badge.image}</div>
                <h3 className={`text-lg font-medium ${
                  badge.unlocked ? 'text-[#F2F2F2]' : 'text-[#F2F2F2]/70'
                }`}>
                  {badge.name}
                </h3>
                <p className="text-[#F2F2F2] text-sm mt-1">{badge.description}</p>
                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    badge.level === 'bronze' ? 'bg-orange-700/30 text-orange-200' :
                    badge.level === 'silver' ? 'bg-slate-500/30 text-slate-200' :
                    'bg-yellow-600/30 text-yellow-200'
                  }`}>
                    {badge.level === 'bronze' ? 'Bronze' :
                     badge.level === 'silver' ? 'Prata' :
                     'Ouro'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="tekoha-card p-5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-medium text-[#F2F2F2]">Nível {learningStats.level}</h3>
                <p className="text-[#F2F2F2]">Aprendiz de Tupi</p>
              </div>
              <div className="bg-tekoha-accent rounded-full w-16 h-16 flex items-center justify-center text-3xl text-black">
                {learningStats.level}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#F2F2F2] mb-1">
                <span>XP: {learningStats.xp}/{learningStats.nextLevel}</span>
                <span>{Math.round(learningStats.xp/learningStats.nextLevel*100)}%</span>
              </div>
              <Progress value={learningStats.xp/learningStats.nextLevel*100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <StatCard title="Palavras Aprendidas" value={learningStats.wordsLearned} icon={<BookOpen className="h-5 w-5" />} />
              <StatCard title="Dias Consecutivos" value={learningStats.daysStreak} icon={<Star className="h-5 w-5" />} />
              <StatCard title="Minutos Estudados" value={learningStats.minutesStudied} icon={<Trophy className="h-5 w-5" />} />
              <StatCard title="Lições Completadas" value={learningStats.completedLessons} icon={<MessageSquare className="h-5 w-5" />} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-tekoha-background/60 p-4 rounded-xl border border-tekoha-secondary/30">
      <div className="flex items-center mb-2">
        <div className="p-2 rounded-full bg-tekoha-secondary/20 text-[#F2F2F2]">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-[#F2F2F2]">{value}</div>
      <div className="text-sm text-[#F2F2F2]">{title}</div>
    </div>
  );
};

export default AchievementsPage;
