import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import Mascot from '../components/Mascot';
import BackButton from '../components/BackButton';

interface ComicPage {
  id: number;
  imageUrl: string;
  title: string;
  dialogues: {
    original: string;
    translation: string;
    character: string;
    position: 'left' | 'right';
  }[];
}

const ComicsPage: React.FC = () => {
  const [activeComic, setActiveComic] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('Veja histórias em quadrinhos em Tupi! Toque nos balões para ver a tradução.');

  const comics = [
    {
      id: 1,
      title: 'A Lenda do Guaraná',
      coverImage: 'https://images.unsplash.com/photo-1515168985862-04944d3fb1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      pages: 3,
      level: 'Iniciante'
    },
    {
      id: 2,
      title: 'O Curupira',
      coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      pages: 4,
      level: 'Intermediário'
    },
    {
      id: 3,
      title: 'A Origem da Vitória-Régia',
      coverImage: 'https://images.unsplash.com/photo-1509259305526-037fbbf698fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
      pages: 5,
      level: 'Avançado'
    },
    {
      id: 4,
      title: 'O Boto Cor-de-Rosa',
      coverImage: 'https://images.unsplash.com/photo-1589634749000-1e72e2c5f71f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      pages: 3,
      level: 'Intermediário'
    },
    {
      id: 5,
      title: 'A Festa da Jurema',
      coverImage: 'https://images.unsplash.com/photo-1566807387450-b74aea0e727e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80',
      pages: 4,
      level: 'Iniciante'
    },
    {
      id: 6,
      title: 'Mboitatá: O Guardião das Florestas',
      coverImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
      pages: 5,
      level: 'Avançado'
    }
  ];

  // Sample comic pages for "A Lenda do Guaraná"
  const comicPages: ComicPage[] = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1635372722656-389f87a941db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      title: 'A Lenda do Guaraná - Página 1',
      dialogues: [
        {
          original: 'Kô ybytépe, oiko kunhãmuku i porãbae.',
          translation: 'Nesta terra, vivia uma jovem muito bonita.',
          character: 'Narrador',
          position: 'left'
        },
        {
          original: 'Ahẽ oguerekó ybá-eté.',
          translation: 'Ela conhecia todos os frutos da floresta.',
          character: 'Narrador',
          position: 'right'
        }
      ]
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1597826368522-9f4cb5a6ba48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1828&q=80',
      title: 'A Lenda do Guaraná - Página 2',
      dialogues: [
        {
          original: 'Mbuesába rupi, îandé abá-eté.',
          translation: 'Segundo a lenda, nosso povo...',
          character: 'Ancião',
          position: 'left'
        },
        {
          original: 'Nde erembaéú kûá ybá?',
          translation: 'Você vai comer esta fruta?',
          character: 'Criança',
          position: 'right'
        }
      ]
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'A Lenda do Guaraná - Página 3',
      dialogues: [
        {
          original: 'Guaranaíba îandé pytuérameté.',
          translation: 'O guaraná nos dá força e energia.',
          character: 'Xamã',
          position: 'left'
        },
        {
          original: 'Abá-eté opysyrõ kô ybá.',
          translation: 'Nosso povo sempre protegerá esta fruta.',
          character: 'Líder',
          position: 'right'
        }
      ]
    }
  ];

  const handleComicSelect = (comicId: number) => {
    setActiveComic(comicId);
    setCurrentPage(0);
    setMascotMessage('Toque nos balões para ver a tradução entre Tupi e Português!');
  };

  const handleNextPage = () => {
    if (currentPage < comicPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayAudio = (text: string) => {
    setMascotMessage(`A pronúncia de "${text.slice(0, 20)}..." será implementada em breve!`);
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const renderComicContent = () => {
    if (activeComic === null) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {comics.map((comic) => (
            <Card 
              key={comic.id}
              className="tekoha-card overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleComicSelect(comic.id)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={comic.coverImage} 
                  alt={comic.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-black">{comic.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-white/70">{comic.pages} páginas</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-tekoha-secondary/30 text-white/90">
                    {comic.level}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    const page = comicPages[currentPage];

    return (
      <div className="mt-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={() => setActiveComic(null)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
          <h3 className="text-lg font-medium text-black">{page.title}</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTranslation}
          >
            {showTranslation ? 'Mostrar Tupi' : 'Mostrar Português'}
          </Button>
        </div>

        <div className="tekoha-card p-0 overflow-hidden relative mb-4">
          <img 
            src={page.imageUrl} 
            alt={page.title} 
            className="w-full object-cover min-h-[300px]"
          />

          {page.dialogues.map((dialogue, index) => (
            <div 
              key={index}
              className={`absolute p-3 max-w-[45%] bg-white rounded-lg shadow-lg cursor-pointer
                ${dialogue.position === 'left' ? 'left-4' : 'right-4'}
                ${index === 0 ? 'top-4' : 'bottom-4'}
              `}
              onClick={toggleTranslation}
            >
              <div className="flex justify-between items-start">
                <p className="text-tekoha-background text-sm">
                  {showTranslation ? dialogue.translation : dialogue.original}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 ml-2 mt-[-4px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(dialogue.original);
                  }}
                >
                  <Volume2 className="h-4 w-4 text-tekoha-secondary" />
                </Button>
              </div>
              <div className="text-xs text-tekoha-secondary mt-1 text-right">
                {dialogue.character}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>
          
          <span className="text-white/70">
            Página {currentPage + 1} de {comicPages.length}
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === comicPages.length - 1}
          >
            Próximo <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-accent font-comic">Histórias em Quadrinhos</h1>
        </div>
        <BookOpen className="h-6 w-6 text-tekoha-interactive" />
      </header>

      <div className="flex-1">
        {renderComicContent()}
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
      />
    </div>
  );
};

export default ComicsPage;
