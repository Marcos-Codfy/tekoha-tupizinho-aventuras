
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mic, Send, StopCircle } from 'lucide-react';
import Mascot from '../components/Mascot';

const PracticePage: React.FC = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'mascot', translated?: string}[]>([
    {
      text: 'Îauê! Xe rerá Tupizinho. Marã taîné nde rerá?',
      sender: 'mascot',
      translated: 'Olá! Meu nome é Tupizinho. Como é o seu nome?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [mascotMessage, setMascotMessage] = useState('Vamos conversar em Tupi! Eu vou te ajudar com a pronúncia e tradução.');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const mascotResponses: {[key: string]: {tupi: string, pt: string}} = {
    'oi': { 
      tupi: 'Îauê! Marã taîné ndé rekó?', 
      pt: 'Olá! Como você está?' 
    },
    'meu nome': { 
      tupi: 'Nde rerá porã! Xe rurí nde repiâka.', 
      pt: 'Seu nome é bonito! Estou feliz em te conhecer.' 
    },
    'tupi': { 
      tupi: 'Îe. Xe apurunga kunumĩ-gûé supé.', 
      pt: 'Sim. Eu ensino as crianças.' 
    },
    'obrigado': { 
      tupi: 'Aguîebéte! Nde îe porang.', 
      pt: 'De nada! Você fala bem.' 
    },
    'aprender': { 
      tupi: 'Îapysyk taîné nde re py\'aî. Re înhéeng kuab.', 
      pt: 'Entendo que você tem interesse. Você pode aprender a falar.' 
    },
    'tchau': { 
      tupi: 'Îawewé! Îasó îebyr oîourí.', 
      pt: 'Tchau! Nos vemos novamente em breve.' 
    },
    'ajuda': { 
      tupi: 'Mbae taîné re potár xe pytybõ?', 
      pt: 'Como posso te ajudar?' 
    },
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { text: input, sender: 'user' as const }
    ];
    setMessages(newMessages);
    setInput('');
    
    // Simulate mascot response
    setTimeout(() => {
      let responseFound = false;
      const inputLower = input.toLowerCase();
      
      // Check if any keywords match
      for (const keyword in mascotResponses) {
        if (inputLower.includes(keyword)) {
          const response = mascotResponses[keyword];
          setMessages([
            ...newMessages,
            { 
              text: response.tupi, 
              sender: 'mascot' as const, 
              translated: response.pt 
            }
          ]);
          responseFound = true;
          break;
        }
      }
      
      // Default response if no keywords match
      if (!responseFound) {
        setMessages([
          ...newMessages,
          { 
            text: 'Xe n\'a înhéeng kuábi. Amboé taîné ndébe?', 
            sender: 'mascot' as const, 
            translated: 'Não entendi. Posso te ensinar algo?' 
          }
        ]);
      }
    }, 1000);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setMascotMessage('Reconhecimento de voz será implementado em breve!');
    } else {
      setIsRecording(true);
      setMascotMessage('Estou te ouvindo! Fale em português e eu vou tentar entender.');
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setInput('Quero aprender mais palavras em Tupi');
      }, 3000);
    }
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
    setMascotMessage(showTranslation 
      ? 'Agora você verá apenas o texto em Tupi. Desafie-se!' 
      : 'Agora você verá as traduções. Isso ajuda no aprendizado!'
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-accent font-comic">Prática com IA</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleTranslation}
        >
          {showTranslation ? 'Ocultar Tradução' : 'Mostrar Tradução'}
        </Button>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="tekoha-card flex-1 p-4 mb-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'mascot' && (
                  <div className="flex-shrink-0 mr-2">
                    <img 
                      src="/lovable-uploads/9620d32b-42f8-4faa-8659-e65d986e769b.png"
                      alt="Tupizinho" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
                
                <div className={`max-w-[70%] rounded-xl p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-tekoha-secondary/60 rounded-tr-none' 
                    : 'bg-tekoha-background/60 border border-tekoha-interactive/30 rounded-tl-none'
                }`}>
                  <p className="text-white">{msg.text}</p>
                  {msg.sender === 'mascot' && showTranslation && msg.translated && (
                    <p className="text-white/70 text-sm mt-1 border-t border-white/20 pt-1">
                      {msg.translated}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className={isRecording ? "animate-pulse" : ""}
            onClick={toggleRecording}
          >
            {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem em português..."
            className="tekoha-input flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="bg-tekoha-interactive hover:bg-tekoha-interactive/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
