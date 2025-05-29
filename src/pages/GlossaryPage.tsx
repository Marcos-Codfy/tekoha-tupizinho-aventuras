import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookMarked, Search, Volume2, BookOpen } from 'lucide-react';
import Mascot from '../components/Mascot';
import BackButton from '../components/BackButton';

interface GlossaryItem {
  id: string;
  tupiWord: string;
  ptTranslation: string;
  grammarClass: string;
  category: string;
  imageUrl: string;
}

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [mascotMessage, setMascotMessage] = useState('No glossário você encontra palavras em Tupi com imagens e áudio! Explore por categorias!');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('elevenLabsApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Glossário ampliado com mais palavras
  const glossaryItems: GlossaryItem[] = [
    {
      id: '1',
      tupiWord: 'Paranã',
      ptTranslation: 'Rio, mar',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '2',
      tupiWord: 'Kurumĩ',
      ptTranslation: 'Menino',
      grammarClass: 'Substantivo',
      category: 'pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80'
    },
    {
      id: '3',
      tupiWord: 'Îaguara',
      ptTranslation: 'Onça',
      grammarClass: 'Substantivo',
      category: 'animais',
      imageUrl: 'https://images.unsplash.com/photo-1551797802-f2dd1ec0033e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
    },
    {
      id: '4',
      tupiWord: 'Yba',
      ptTranslation: 'Fruta',
      grammarClass: 'Substantivo',
      category: 'comida',
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '5',
      tupiWord: 'Porã',
      ptTranslation: 'Bom, bonito',
      grammarClass: 'Adjetivo',
      category: 'adjetivos',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80'
    },
    {
      id: '6',
      tupiWord: 'Oka',
      ptTranslation: 'Casa',
      grammarClass: 'Substantivo',
      category: 'lugares',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80'
    },
    {
      id: '7',
      tupiWord: 'Ara',
      ptTranslation: 'Dia, tempo',
      grammarClass: 'Substantivo',
      category: 'tempo',
      imageUrl: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80'
    },
    {
      id: '8',
      tupiWord: 'Pitanga',
      ptTranslation: 'Fruta vermelha',
      grammarClass: 'Substantivo',
      category: 'comida',
      imageUrl: 'https://images.unsplash.com/photo-1597268621819-dcc5a5fa3050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '9',
      tupiWord: 'Piá',
      ptTranslation: 'Coração',
      grammarClass: 'Substantivo',
      category: 'corpo',
      imageUrl: 'https://images.unsplash.com/photo-1514483127413-f72f273478c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '10',
      tupiWord: 'Îasy',
      ptTranslation: 'Lua',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1532117182244-7847342bb70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '11',
      tupiWord: 'Kaá',
      ptTranslation: 'Mato, floresta',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80'
    },
    {
      id: '12',
      tupiWord: 'Abá',
      ptTranslation: 'Pessoa, gente',
      grammarClass: 'Substantivo',
      category: 'pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '13',
      tupiWord: 'Poxy',
      ptTranslation: 'Feio, ruim',
      grammarClass: 'Adjetivo',
      category: 'adjetivos',
      imageUrl: 'https://images.unsplash.com/photo-1594007759138-855170ec8dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
    },
    {
      id: '14',
      tupiWord: 'Guyrá',
      ptTranslation: 'Pássaro',
      grammarClass: 'Substantivo',
      category: 'animais',
      imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80'
    },
    // Novas palavras adicionadas
    {
      id: '15',
      tupiWord: 'Pirá',
      ptTranslation: 'Peixe',
      grammarClass: 'Substantivo',
      category: 'animais',
      imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '16',
      tupiWord: 'Tayra',
      ptTranslation: 'Filha',
      grammarClass: 'Substantivo',
      category: 'pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1543342384-1f1350e27861?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80'
    },
    {
      id: '17',
      tupiWord: 'Ta\'yra',
      ptTranslation: 'Filho',
      grammarClass: 'Substantivo',
      category: 'pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1545205895-a708087acb5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80'
    },
    {
      id: '18',
      tupiWord: 'Ybytú',
      ptTranslation: 'Vento',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1533656139395-ce317fd6ce07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '19',
      tupiWord: 'Amana',
      ptTranslation: 'Chuva',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
    {
      id: '20',
      tupiWord: 'Kuaracy',
      ptTranslation: 'Sol',
      grammarClass: 'Substantivo',
      category: 'natureza',
      imageUrl: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80'
    }
  ];

  // Filter items based on search and category
  const filteredItems = glossaryItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.tupiWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ptTranslation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    const categoryMessages: Record<string, string> = {
      'all': 'Veja todas as palavras do glossário!',
      'natureza': 'Palavras sobre a natureza - rios, florestas, céu...',
      'animais': 'Aprenda os nomes dos animais em Tupi!',
      'pessoas': 'Palavras relacionadas a pessoas e família.',
      'comida': 'Frutas, alimentos e bebidas em Tupi!',
      'lugares': 'Nomes de lugares e construções.',
      'adjetivos': 'Palavras que descrevem características.',
      'tempo': 'Palavras relacionadas ao tempo e clima.',
      'corpo': 'Partes do corpo humano em Tupi.'
    };
    
    setMascotMessage(categoryMessages[category] || 'Explore as categorias!');
  };

  const playAudio = (word: string) => {
    if (!apiKey) {
      setMascotMessage('Configure sua chave do ElevenLabs nas configurações para ouvir o áudio!');
    } else {
      setMascotMessage(`Reproduzindo "${word}"...`);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    setMascotMessage(`Modo de visualização alterado para ${viewMode === 'grid' ? 'lista' : 'grade'}!`);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Glossário</h1>
        </div>
        <BookMarked className="h-6 w-6 text-tekoha-red" />
      </header>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar palavra em Tupi ou Português..."
              className="pl-10 border-2 border-tekoha-secondary/30 focus:border-tekoha-secondary text-tekoha-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={toggleViewMode}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-tekoha-interactive text-tekoha-interactive hover:bg-tekoha-accent hover:text-tekoha-interactive"
          >
            <BookOpen className="h-4 w-4" />
            <span>{viewMode === 'grid' ? 'Lista' : 'Grade'}</span>
          </Button>
        </div>

        <Tabs defaultValue="all" onValueChange={handleCategoryChange}>
          <div className="overflow-x-auto">
            <TabsList className="bg-gray-100 p-1 justify-start w-full flex">
              <TabsTrigger value="all" className="text-sm text-gray-800">Todos</TabsTrigger>
              <TabsTrigger value="natureza" className="text-sm text-gray-800">Natureza</TabsTrigger>
              <TabsTrigger value="animais" className="text-sm text-gray-800">Animais</TabsTrigger>
              <TabsTrigger value="pessoas" className="text-sm text-gray-800">Pessoas</TabsTrigger>
              <TabsTrigger value="comida" className="text-sm text-gray-800">Comida</TabsTrigger>
              <TabsTrigger value="lugares" className="text-sm text-gray-800">Lugares</TabsTrigger>
              <TabsTrigger value="adjetivos" className="text-sm text-gray-800">Adjetivos</TabsTrigger>
              <TabsTrigger value="tempo" className="text-sm text-gray-800">Tempo</TabsTrigger>
              <TabsTrigger value="corpo" className="text-sm text-gray-800">Corpo</TabsTrigger>
            </TabsList>
          </div>
          
          {['all', 'natureza', 'animais', 'pessoas', 'comida', 'lugares', 'adjetivos', 'tempo', 'corpo'].map(category => (
            <TabsContent key={category} value={category} className="mt-4">
              {filteredItems.length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-3"}>
                  {filteredItems.map((item) => (
                    <GlossaryCard key={item.id} item={item} onPlayAudio={playAudio} viewMode={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Nenhuma palavra encontrada para esta categoria ou busca.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={true}
        hideTime={3000}
        size="md"
      />
    </div>
  );
};

interface GlossaryCardProps {
  item: GlossaryItem;
  onPlayAudio: (word: string) => void;
  viewMode: 'grid' | 'list';
}

const GlossaryCard: React.FC<GlossaryCardProps> = ({ item, onPlayAudio, viewMode }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('elevenLabsApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  if (viewMode === 'list') {
    return (
      <div className="animate-fade-in bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md p-3 flex items-center">
        <img 
          src={item.imageUrl} 
          alt={item.tupiWord} 
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-tekoha-highlight">{item.tupiWord}</h3>
            <AudioButton
              text={item.tupiWord}
              apiKey={apiKey}
              variant="ghost"
              size="sm"
              className="text-tekoha-secondary hover:text-tekoha-accent"
            />
          </div>
          <p className="text-gray-800 mt-1">{item.ptTranslation}</p>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-700">{item.grammarClass}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-tekoha-secondary/30 text-gray-800">
              {item.category}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden animate-fade-in bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md">
      <div className="h-36 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.tupiWord} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-tekoha-highlight">{item.tupiWord}</h3>
          <AudioButton
            text={item.tupiWord}
            apiKey={apiKey}
            variant="ghost"
            size="sm"
            className="text-tekoha-secondary hover:text-tekoha-accent"
          />
        </div>
        <p className="text-gray-800 mt-1">{item.ptTranslation}</p>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-700">{item.grammarClass}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-tekoha-secondary/30 text-gray-800">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
