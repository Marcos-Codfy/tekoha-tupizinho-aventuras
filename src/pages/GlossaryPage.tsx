import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Heart, Clock, Volume2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import BackButton from '../components/BackButton';
import Mascot from '../components/Mascot';
import AudioButton from '../components/AudioButton';

interface Word {
  id: number;
  tupi: string;
  portuguese: string;
  category: string;
  example: string;
  translation: string;
  favorite: boolean;
}

const initialWords: Word[] = [
  {
    "id": 1,
    "tupi": "Abá",
    "portuguese": "Cabelo",
    "category": "Corpo Humano",
    "example": "Acuã abaeté",
    "translation": "Cabelo comprido",
    "favorite": false
  },
  {
    "id": 2,
    "tupi": "Abaeté",
    "portuguese": "Cabeludo",
    "category": "Adjetivos",
    "example": "Abaeté catu",
    "translation": "Muito cabeludo",
    "favorite": false
  },
  {
    "id": 3,
    "tupi": "Acuã",
    "portuguese": "Comprido",
    "category": "Adjetivos",
    "example": "Acuã oco",
    "translation": "Nariz comprido",
    "favorite": false
  },
  {
    "id": 4,
    "tupi": "Acuruí",
    "portuguese": "Agulha",
    "category": "Objetos",
    "example": "Acuruí mirim",
    "translation": "Pequena agulha",
    "favorite": false
  },
  {
    "id": 5,
    "tupi": "Açu",
    "portuguese": "Grande",
    "category": "Adjetivos",
    "example": "Açu oca",
    "translation": "Casa grande",
    "favorite": false
  },
  {
    "id": 6,
    "tupi": "Açuaba",
    "portuguese": "Cercado grande",
    "category": "Construções",
    "example": "Açuaba catu",
    "translation": "Cercado muito grande",
    "favorite": false
  },
  {
    "id": 7,
    "tupi": "Aguapé",
    "portuguese": "Folha chata",
    "category": "Plantas",
    "example": "Aguapé mirim",
    "translation": "Pequena folha chata",
    "favorite": false
  },
  {
    "id": 8,
    "tupi": "Aimbé",
    "portuguese": "Cipó",
    "category": "Plantas",
    "example": "Aimbé pucu",
    "translation": "Cipó comprido",
    "favorite": false
  },
  {
    "id": 9,
    "tupi": "Aimiri",
    "portuguese": "Pequeno",
    "category": "Adjetivos",
    "example": "Aimiri curumim",
    "translation": "Menino pequeno",
    "favorite": false
  },
  {
    "id": 10,
    "tupi": "Aipim",
    "portuguese": "Mandioca",
    "category": "Alimentos",
    "example": "Aipim rô",
    "translation": "Mandioca doce",
    "favorite": false
  },
  {
    "id": 11,
    "tupi": "Airuoca",
    "portuguese": "Casa de Marimbondo",
    "category": "Animais",
    "example": "Airuoca catu",
    "translation": "Casa de marimbondo grande",
    "favorite": false
  },
  {
    "id": 12,
    "tupi": "Aiti",
    "portuguese": "Pai",
    "category": "Família",
    "example": "Aiti porang",
    "translation": "Pai bonito",
    "favorite": false
  },
  {
    "id": 13,
    "tupi": "Aiyrá",
    "portuguese": "Papagaio",
    "category": "Animais",
    "example": "Aiyrá tinga",
    "translation": "Papagaio branco",
    "favorite": false
  },
  {
    "id": 14,
    "tupi": "Akaîú",
    "portuguese": "Caju",
    "category": "Alimentos",
    "example": "Akaîú pitangui",
    "translation": "Caju vermelho",
    "favorite": false
  },
  {
    "id": 15,
    "tupi": "Akang",
    "portuguese": "Cabeça",
    "category": "Corpo Humano",
    "example": "Akang pucu",
    "translation": "Cabeça comprida",
    "favorite": false
  },
  {
    "id": 16,
    "tupi": "Akangatá",
    "portuguese": "Duro",
    "category": "Adjetivos",
    "example": "Akangatá itá",
    "translation": "Pedra dura",
    "favorite": false
  },
  {
    "id": 17,
    "tupi": "Akaranda'y",
    "portuguese": "Jacarandá",
    "category": "Plantas",
    "example": "Akaranda'y rô",
    "translation": "Jacarandá doce",
    "favorite": false
  },
  {
    "id": 18,
    "tupi": "Akaratinga",
    "portuguese": "Garça branca",
    "category": "Animais",
    "example": "Akaratinga mirim",
    "translation": "Pequena garça branca",
    "favorite": false
  },
  {
    "id": 19,
    "tupi": "Akarauçu",
    "portuguese": "Gaivota",
    "category": "Animais",
    "example": "Akarauçu tinga",
    "translation": "Gaivota branca",
    "favorite": false
  },
  {
    "id": 20,
    "tupi": "Ake",
    "portuguese": "Doença",
    "category": "Saúde",
    "example": "Ake catu",
    "translation": "Doença grave",
    "favorite": false
  }
];

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState(initialWords);
  const mascotMessage = 'Explore o vocabulário Tupi-Guarani! Use a busca para encontrar palavras específicas.';

  const filteredWords = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return words.filter(word =>
      word.tupi.toLowerCase().includes(term) ||
      word.portuguese.toLowerCase().includes(term) ||
      word.category.toLowerCase().includes(term)
    );
  }, [searchTerm, words]);

  const toggleFavorite = (id: number) => {
    setWords(prevWords =>
      prevWords.map(word =>
        word.id === id ? { ...word, favorite: !word.favorite } : word
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Vocabulário Tupi</h1>
        </div>
        <div className="w-64">
          <Input
            type="search"
            placeholder="Buscar palavra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tekoha-input border-tekoha-red/50 focus:border-tekoha-highlight text-tekoha-interactive"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredWords.map((word) => (
          <Card key={word.id} className="tekoha-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg font-bold text-tekoha-highlight">
                    {word.tupi}
                  </CardTitle>
                  <AudioButton 
                    text={word.tupi}
                    apiKey={localStorage.getItem('elevenLabsApiKey') || ''}
                    size="sm"
                    variant="ghost"
                  />
                </div>
                <Badge variant="outline" className="text-xs bg-tekoha-secondary/20 text-tekoha-secondary border-tekoha-secondary/50">
                  {word.category}
                </Badge>
              </div>
              <CardDescription className="text-tekoha-interactive font-medium text-base">
                {word.portuguese}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-tekoha-accent">Exemplo:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-tekoha-interactive italic">{word.example}</span>
                    <AudioButton 
                      text={word.example}
                      apiKey={localStorage.getItem('elevenLabsApiKey') || ''}
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-tekoha-interactive">
                    Tradução: <span className="italic">{word.translation}</span>
                  </span>
                  <button
                    onClick={() => toggleFavorite(word.id)}
                    className={`p-2 rounded-full hover:bg-tekoha-red/20 transition-colors duration-200 ${word.favorite ? 'text-tekoha-red' : 'text-gray-400'}`}
                    aria-label={word.favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart className="h-5 w-5" fill={word.favorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={true}
        hideTime={2000}
        size="md"
      />
    </div>
  );
};

export default GlossaryPage;
