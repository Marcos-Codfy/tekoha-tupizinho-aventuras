
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Gamepad2, CheckCircle, XCircle } from 'lucide-react';
import Mascot from '../components/Mascot';
 
const GamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [mascotMessage, setMascotMessage] = useState('Vamos jogar e aprender Tupi! Escolha um jogo para começar.');
  
  // Memory Game state
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  
  // Word Blocks Game state
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [isCorrectSentence, setIsCorrectSentence] = useState<boolean | null>(null);

  const games = [
    {
      id: 'memory',
      title: 'Jogo da Memória',
      description: 'Encontre os pares de palavras em Tupi e Português',
      icon: '🎴',
      level: 'Iniciante'
    },
    {
      id: 'blocks',
      title: 'Blocos de Palavras',
      description: 'Monte frases em Tupi arrastando os blocos na ordem correta',
      icon: '🧩',
      level: 'Intermediário'
    },
    {
      id: 'quiz',
      title: 'Quiz de Palavras',
      description: 'Escolha a tradução correta para as palavras em Tupi',
      icon: '❓',
      level: 'Iniciante'
    },
    {
      id: 'listen',
      title: 'Escute e Repita',
      description: 'Ouça palavras em Tupi e repita-as corretamente',
      icon: '🔊',
      level: 'Avançado'
    }
  ];

  // Memory game cards - ampliado para mais pares
  const memoryCards = [
    { id: 1, content: 'Paranã', pairId: 1 },
    { id: 2, content: 'Rio', pairId: 1 },
    { id: 3, content: 'Kurumĩ', pairId: 2 },
    { id: 4, content: 'Menino', pairId: 2 },
    { id: 5, content: 'Îaguara', pairId: 3 },
    { id: 6, content: 'Onça', pairId: 3 },
    { id: 7, content: 'Yba', pairId: 4 },
    { id: 8, content: 'Fruta', pairId: 4 },
    { id: 9, content: 'Ybytú', pairId: 5 },
    { id: 10, content: 'Vento', pairId: 5 },
    { id: 11, content: 'Pindá', pairId: 6 },
    { id: 12, content: 'Anzol', pairId: 6 },
    { id: 13, content: 'Abá', pairId: 7 },
    { id: 14, content: 'Pessoa', pairId: 7 },
    { id: 15, content: 'Kuaracy', pairId: 8 },
    { id: 16, content: 'Sol', pairId: 8 },
  ];

  // Word blocks for the sentence building game
  const wordBlocks = [
    'Xe', 'nde', 'a-jusu', 'oka', 'porã'
  ];
  
  const correctSentence = 'Xe a-jusu nde oka porã';

  const handleGameSelect = (gameId: string) => {
    setActiveGame(gameId);
    
    const gameMessages: Record<string, string> = {
      'memory': 'Encontre os pares! Cada palavra em Tupi combina com sua tradução em Português!',
      'blocks': 'Arraste os blocos para formar a frase "Eu gosto da sua casa bonita" em Tupi!',
      'quiz': 'Escolha a tradução correta para cada palavra!',
      'listen': 'Ouça com atenção e repita as palavras em Tupi!'
    };
    
    setMascotMessage(gameMessages[gameId] || 'Vamos jogar!');
  };

  const handleCardFlip = (cardId: number) => {
    // Don't allow more than 2 cards flipped or already matched cards
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) return;
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // Check for matches if we have 2 cards flipped
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = memoryCards.find(card => card.id === firstCardId);
      const secondCard = memoryCards.find(card => card.id === secondCardId);
      
      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs([...matchedPairs, firstCardId, secondCardId]);
        setScore(score + 1);
        setMascotMessage('Parabéns! Você encontrou um par!');
        
        // Check if game completed
        if (matchedPairs.length + 2 === memoryCards.length) {
          setMascotMessage('Você completou o jogo! Parabéns!');
        }
        
        // Reset flipped cards
        setFlippedCards([]);
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleBlockSelect = (block: string) => {
    const newSelected = [...selectedBlocks, block];
    setSelectedBlocks(newSelected);
    
    const currentSentence = newSelected.join(' ');
    
    // Check if the sequence is correct so far
    const isCorrect = correctSentence.startsWith(currentSentence);
    
    if (!isCorrect) {
      setIsCorrectSentence(false);
      setMascotMessage('Hmm, essa ordem não está correta. Tente novamente!');
      setTimeout(() => {
        setSelectedBlocks([]);
        setIsCorrectSentence(null);
      }, 1500);
    } else if (currentSentence === correctSentence) {
      setIsCorrectSentence(true);
      setMascotMessage('Perfeito! Você formou a frase corretamente!');
    }
  };

  const resetBlocksGame = () => {
    setSelectedBlocks([]);
    setIsCorrectSentence(null);
    setMascotMessage('Tente montar a frase novamente!');
  };

  const renderGameContent = () => {
    switch(activeGame) {
      case 'memory':
        return (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Pares encontrados: {score}/{memoryCards.length/2}</h3>
              <Button size="sm" onClick={() => setActiveGame(null)}>Voltar</Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {memoryCards.map((card) => (
                <div
                  key={card.id}
                  className={`aspect-square flex items-center justify-center rounded-lg text-lg font-medium transition-all duration-300 cursor-pointer
                    ${flippedCards.includes(card.id) || matchedPairs.includes(card.id) 
                      ? 'bg-tekoha-interactive text-tekoha-background rotate-y-0' 
                      : 'bg-tekoha-secondary text-transparent rotate-y-180'}
                    ${matchedPairs.includes(card.id) ? 'opacity-70' : 'opacity-100'}
                  `}
                  onClick={() => handleCardFlip(card.id)}
                >
                  {(flippedCards.includes(card.id) || matchedPairs.includes(card.id)) ? card.content : '?'}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'blocks':
        return (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Monte a frase em Tupi</h3>
              <Button size="sm" onClick={() => setActiveGame(null)}>Voltar</Button>
            </div>
            
            <div className="tekoha-card p-4 mb-6">
              <p className="text-white text-center mb-2">Objetivo: "Eu gosto da sua casa bonita"</p>
              <div className="min-h-16 p-3 border-2 border-dashed border-tekoha-interactive/50 rounded-lg flex flex-wrap gap-2">
                {selectedBlocks.map((block, index) => (
                  <div 
                    key={index}
                    className="py-2 px-3 bg-tekoha-interactive text-tekoha-background rounded-lg font-medium"
                  >
                    {block}
                  </div>
                ))}
              </div>
              
              {isCorrectSentence !== null && (
                <div className={`flex items-center justify-center mt-3 ${isCorrectSentence ? 'text-tekoha-interactive' : 'text-tekoha-secondary'}`}>
                  {isCorrectSentence ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <span>{isCorrectSentence ? 'Correto!' : 'Incorreto!'}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {wordBlocks.filter(block => !selectedBlocks.includes(block)).map((block, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-tekoha-secondary/20 border-tekoha-secondary/40"
                  onClick={() => handleBlockSelect(block)}
                  disabled={isCorrectSentence !== null}
                >
                  {block}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={resetBlocksGame} 
              className="w-full"
              disabled={selectedBlocks.length === 0 && isCorrectSentence === null}
            >
              Recomeçar
            </Button>
          </div>
        );
        
      case 'quiz':
      case 'listen':
        return (
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="mb-8 text-center">
              <h3 className="text-lg font-medium text-white mb-4">Jogo em desenvolvimento!</h3>
              <p className="text-white/70">Este jogo estará disponível em breve!</p>
              
              <div className="mt-8">
                <Button onClick={() => setActiveGame(null)}>Voltar aos jogos</Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {games.map((game) => (
              <Card 
                key={game.id}
                className="tekoha-card cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleGameSelect(game.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-tekoha-secondary">
                      {game.title}
                    </CardTitle>
                    <span className="text-3xl">{game.icon}</span>
                  </div>
                  <CardDescription className="text-white/80">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-tekoha-teal text-white/90">
                      {game.level}
                    </span>
                    <Progress value={game.id === 'memory' ? 100 : 60} className="w-1/2 h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Jogos Educativos</h1>
        <Gamepad2 className="h-6 w-6 text-tekoha-interactive" />
      </header>

      <div className="flex-1">
        {renderGameContent()}
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={true}
        hideTime={3000}
      />
    </div>
  );
};

export default GamesPage;
