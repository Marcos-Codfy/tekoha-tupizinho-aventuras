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

  // Dicionário ampliado de respostas
  const mascotResponses: {[key: string]: {tupi: string, pt: string}} = {
    'oi': { 
      tupi: 'Îauê! Marã taîné ndé rekó?', 
      pt: 'Olá! Como você está?' 
    },
    'olá': { 
      tupi: 'Îauê! Xe rurí nde repiâka!', 
      pt: 'Olá! Estou feliz em te ver!' 
    },
    'meu nome': { 
      tupi: 'Nde rerá porã! Xe rurí nde repiâka.', 
      pt: 'Seu nome é bonito! Estou feliz em te conhecer.' 
    },
    'me chamo': { 
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
    'como vai': { 
      tupi: 'Xe rekó katú! Nde?', 
      pt: 'Estou bem! E você?' 
    },
    'estou bem': { 
      tupi: 'Ikatú! Nde re\'endu porã xe nhe\'engá?', 
      pt: 'Ótimo! Você está entendendo bem minha língua?' 
    },
    'água': { 
      tupi: '\'Y\' ojauká \'água\'. Nde juse?', 
      pt: '\'Y\' significa \'água\'. Você está com sede?' 
    },
    'comida': { 
      tupi: 'Tembi\'u porã! Nde juséi?', 
      pt: 'Comida boa! Você está com fome?' 
    },
    'animal': { 
      tupi: 'Soó-etá oîkó ka\'á-pe. Xe a-ausub îaguara.', 
      pt: 'Muitos animais vivem na floresta. Eu gosto de onças.' 
    },
    'casa': { 
      tupi: 'Oka ojauká \'casa\'. Nde oka porã?', 
      pt: 'Oka significa \'casa\'. Sua casa é bonita?' 
    },
    'dia': { 
      tupi: 'Ko\'ara porã! Ara porã nde supé!', 
      pt: 'Hoje é um dia bonito! Bom dia para você!' 
    },
    'noite': { 
      tupi: 'Pytuna porã! Pytuna porã nde supé!', 
      pt: 'Boa noite! Boa noite para você!' 
    },
    'sim': { 
      tupi: 'Pá! Xe aîkuab.', 
      pt: 'Sim! Eu entendo.' 
    },
    'não': { 
      tupi: 'Aan. Mbae resé?', 
      pt: 'Não. Por quê?' 
    },
    'por favor': { 
      tupi: 'Ikatú! Xe apotar pytybõ.', 
      pt: 'Claro! Quero ajudar.' 
    },
    'amigo': { 
      tupi: 'Xe irũ! Nde xe irũ porã!', 
      pt: 'Meu amigo! Você é meu bom amigo!' 
    },
    'flores': { 
      tupi: 'Yboty poranga! Xe ausub yboty.', 
      pt: 'Flores bonitas! Eu gosto de flores.' 
    },
    'sol': { 
      tupi: 'Kuarasy oîkó ybaka-pe. Kuarasy porã.', 
      pt: 'O sol está no céu. O sol é bonito.' 
    },
    'lua': { 
      tupi: 'Îasy porã pytuna-pe. Îasy oîemoesaîng paranã-pe.', 
      pt: 'A lua é bonita à noite. A lua se reflete no rio.' 
    }
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
    
    // Find mascot response based on user input
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

  // Sugestões de frases para praticar - ampliado
  const suggestedPhrases = [
    "Olá, como vai?",
    "Meu nome é...",
    "Quero aprender Tupi",
    "Como se diz água?",
    "O que é sol em Tupi?",
    "Me ensine sobre animais",
    "Como se diz obrigado?",
    "Qual é a palavra para lua?",
    "Como está o tempo hoje?",
    "Qual é o seu animal favorito?",
    "Conte-me uma história",
    "Gosto muito de aprender idiomas"
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Prática com IA</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTranslation}
            className="focus:ring-2 focus:ring-tekoha-accent/50 bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal"
          >
            {showTranslation ? 'Ocultar Tradução' : 'Mostrar Tradução'}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md flex-1 p-4 mb-4 overflow-y-auto max-h-[50vh]">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'mascot' && (
                  <div className="flex-shrink-0 mr-2">
                    <img 
                      src="/lovable-uploads/cc714f54-db55-4def-8d46-4721adaffc91.png"
                      alt="Tupizinho" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                )}
                
                <div className={`max-w-[70%] rounded-xl p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-tekoha-secondary/60 rounded-tr-none text-white' 
                    : 'bg-gray-100 border border-tekoha-interactive/30 rounded-tl-none text-gray-800'
                }`}>
                  <p>{msg.text}</p>
                  {msg.sender === 'mascot' && showTranslation && msg.translated && (
                    <p className="text-gray-500 text-sm mt-1 border-t border-gray-200 pt-1">
                      {msg.translated}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-tekoha-interactive mb-2">Sugestões:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedPhrases.map((phrase, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(phrase)}
                className="text-xs bg-tekoha-highlight text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-highlight"
              >
                {phrase}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className={`${isRecording ? "animate-pulse" : ""} focus:ring-2 focus:ring-tekoha-accent/50 ${!isRecording ? "bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal" : ""}`}
            onClick={toggleRecording}
            title={isRecording ? "Parar gravação" : "Iniciar gravação de voz"}
            aria-label={isRecording ? "Parar gravação" : "Iniciar gravação de voz"}
          >
            {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem em português..."
            className="flex-1 border-2 border-tekoha-secondary/30 focus:border-tekoha-secondary focus:ring-2 focus:ring-tekoha-accent/50 text-tekoha-black"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="bg-tekoha-teal hover:bg-tekoha-teal/90 text-tekoha-accent hover:text-tekoha-accent active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
        size="md"
      />
    </div>
  );
};

export default PracticePage;
