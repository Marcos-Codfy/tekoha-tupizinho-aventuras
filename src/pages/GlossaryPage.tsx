import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookMarked, Search, Volume2 } from 'lucide-react';
import Mascot from '../components/Mascot';

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

  // Sample glossary data
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
      'adjetivos': 'Palavras que descrevem características.'
    };
    
    setMascotMessage(categoryMessages[category] || 'Explore as categorias!');
  };

  const playAudio = (word: string) => {
    setMascotMessage(`A pronúncia de "${word}" será implementada em breve!`);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-accent font-comic">Glossário Ilustrado</h1>
        <BookMarked className="h-6 w-6 text-tekoha-interactive" />
      </header>

      <div className="flex-1 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
          <Input
            type="text"
            placeholder="Buscar palavra em Tupi ou Português..."
            className="tekoha-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={handleCategoryChange}>
          <TabsList className="bg-tekoha-secondary/20 overflow-x-auto flex p-1 justify-start w-full">
            <TabsTrigger value="all" className="text-sm">Todos</TabsTrigger>
            <TabsTrigger value="natureza" className="text-sm">Natureza</TabsTrigger>
            <TabsTrigger value="animais" className="text-sm">Animais</TabsTrigger>
            <TabsTrigger value="pessoas" className="text-sm">Pessoas</TabsTrigger>
            <TabsTrigger value="comida" className="text-sm">Comida</TabsTrigger>
            <TabsTrigger value="lugares" className="text-sm">Lugares</TabsTrigger>
            <TabsTrigger value="adjetivos" className="text-sm">Adjetivos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <GlossaryCard key={item.id} item={item} onPlayAudio={playAudio} />
              ))}
            </div>
          </TabsContent>
          
          {['natureza', 'animais', 'pessoas', 'comida', 'lugares', 'adjetivos'].map(category => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <GlossaryCard key={item.id} item={item} onPlayAudio={playAudio} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
      />
    </div>
  );
};

interface GlossaryCardProps {
  item: GlossaryItem;
  onPlayAudio: (word: string) => void;
}

const GlossaryCard: React.FC<GlossaryCardProps> = ({ item, onPlayAudio }) => {
  return (
    <div className="tekoha-card overflow-hidden animate-fade-in">
      <div className="h-36 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.tupiWord} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-tekoha-interactive">{item.tupiWord}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onPlayAudio(item.tupiWord)}
            className="text-tekoha-accent"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-white mt-1">{item.ptTranslation}</p>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-white/70">{item.grammarClass}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-tekoha-secondary/30 text-white/90">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
