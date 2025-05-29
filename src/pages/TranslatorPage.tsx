import React, { useState } from 'react';
import Mascot from '../components/Mascot';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { MessageSquare, Mic, Volume2, ArrowRightLeft } from 'lucide-react';
import BackButton from '../components/BackButton';

const TranslatorPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [translateDirection, setTranslateDirection] = useState<'tupi-pt' | 'pt-tupi'>('tupi-pt');
  const [mascotMessage, setMascotMessage] = useState('Posso te ajudar a traduzir frases em Tupi para Português e vice-versa!');

  // Dicionário muito ampliado de traduções
  const mockTupiToPt: Record<string, string> = {
    'kunhã poranga': 'mulher bonita',
    'nde porã': 'você é bonito/bom',
    'xe py\'a pe': 'no meu coração',
    'paranã': 'rio grande, mar',
    'oka': 'casa',
    'ara porã': 'dia bom, bom dia',
    'pytuna porã': 'boa noite',
    'xe potar nde': 'eu te quero',
    'îasy': 'lua',
    'kuarasy': 'sol',
    'ybaka': 'céu',
    'guyrá': 'pássaro',
    'îakaré': 'jacaré',
    'îaguara': 'onça',
    'y': 'água',
    'kaá': 'mato, floresta',
    'abá': 'homem, pessoa',
    'kurumĩ': 'menino',
    'kunhãtaĩ': 'menina',
    'tetama': 'família',
    'mbo\'esaba': 'trabalho',
    'aypxó': 'amor',
    'rurí': 'feliz',
    'poxyî': 'triste',
    'purakî': 'música, cantar',
    'poraîé': 'dança',
    'xe rerá': 'meu nome',
    'nde rerá': 'seu nome',
    'xe ausub': 'eu gosto',
    'xe r-ory': 'me alegra',
    'aguîebéte': 'obrigado',
    'îauê': 'olá',
    'îawewé': 'tchau',
    'porã': 'bom, bonito',
    'poxy': 'feio, ruim',
    'tuixáua': 'chefe',
    'morubixaba': 'chefe principal',
    'xe ratá': 'meu fogo',
    'xe ro\'y': 'meu frio',
    'xe rexáî': 'eu choro',
    'xe rory': 'eu me alegro',
    'xe resá': 'meu olho',
    'xe rembi\'u': 'minha comida',
    'xe roka': 'minha casa',
    'tembi\'u': 'comida',
    'îbotî': 'flor',
    'ybyrá': 'árvore',
    'yby': 'terra',
    'tatá': 'fogo',
    'ybytú': 'vento',
    'amana': 'chuva',
    'moroti': 'branco',
    'piranga': 'vermelho',
    'oby': 'azul, verde',
    'asáî': 'dor',
    'katu': 'bom',
    'soó': 'animal',
    'pirá': 'peixe',
    'guyra': 'pássaro',
    'tapyra': 'anta',
    'tatu': 'tatu',
    'kaitú': 'macaco',
    'akutí': 'cutia',
    'kururu': 'sapo',
    'mboyá': 'cobra',
    'nhandú': 'ema'
  };

  const mockPtToTupi: Record<string, string> = {
    'bom dia': 'ara porã',
    'água boa': 'y porã',
    'eu te amo': 'xe ro-payxu',
    'obrigado': 'aguyjewete',
    'mulher': 'kunhã',
    'homem': 'abá',
    'menino': 'kurumĩ',
    'menina': 'kunhãtaĩ',
    'casa': 'oka',
    'rio': 'paranã',
    'floresta': 'kaá',
    'sol': 'kuarasy',
    'lua': 'îasy',
    'céu': 'ybaka',
    'coração': 'py\'a',
    'água': 'y',
    'fogo': 'tatá',
    'terra': 'yby',
    'pássaro': 'guyrá',
    'onça': 'îaguara',
    'família': 'tetama',
    'trabalho': 'mbo\'esaba',
    'amor': 'aypxó',
    'feliz': 'rurí',
    'triste': 'poxyî',
    'música': 'purakî',
    'dança': 'poraîé',
    'meu nome': 'xe rerá',
    'seu nome': 'nde rerá',
    'eu gosto': 'xe ausub',
    'olá': 'îauê',
    'tchau': 'îawewé',
    'bom': 'porã',
    'bonito': 'porã',
    'feio': 'poxy',
    'ruim': 'poxy',
    'chefe': 'tuixáua',
    'comida': 'tembi\'u',
    'flor': 'îbotî',
    'árvore': 'ybyrá',
    'vento': 'ybytú',
    'chuva': 'amana',
    'branco': 'moroti',
    'vermelho': 'piranga',
    'azul': 'oby',
    'verde': 'oby',
    'dor': 'asáî',
    'animal': 'soó',
    'peixe': 'pirá',
    'anta': 'tapyra',
    'tatu': 'tatu',
    'macaco': 'kaitú',
    'cutia': 'akutí',
    'sapo': 'kururu',
    'cobra': 'mboyá',
    'ema': 'nhandú',
    'jacaré': 'îakaré',
    'mato': 'kaá',
    'pessoa': 'abá',
    'cantar': 'purakî',
    'alegrar': 'ory',
    'chorar': 'exáî',
    'olho': 'esá',
    'minha casa': 'xe roka',
    'meu fogo': 'xe ratá',
    'meu frio': 'xe ro\'y'
  };

  // Tradução
  const translateText = () => {
    if (!inputText.trim()) {
      setMascotMessage('Digite algum texto para eu traduzir!');
      return;
    }

    if (translateDirection === 'tupi-pt') {
      // Tentar encontrar correspondência exata
      if (mockTupiToPt[inputText.toLowerCase()]) {
        setOutputText(mockTupiToPt[inputText.toLowerCase()]);
        setMascotMessage('Tradução concluída! Quer aprender mais palavras?');
      } else {
        // Verificar palavras individuais
        const palavras = inputText.toLowerCase().split(' ');
        const traducoes = palavras.map(palavra => mockTupiToPt[palavra] || palavra);
        
        if (traducoes.some(t => t !== palavras[traducoes.indexOf(t)])) {
          setOutputText(traducoes.join(' '));
          setMascotMessage('Tradução parcial concluída. Algumas palavras não foram reconhecidas.');
        } else {
          setOutputText('(Tradução não disponível - isso é uma demonstração)');
          setMascotMessage('Desculpe, ainda estou aprendendo essa palavra!');
        }
      }
    } else {
      // Tentar encontrar correspondência exata
      if (mockPtToTupi[inputText.toLowerCase()]) {
        setOutputText(mockPtToTupi[inputText.toLowerCase()]);
        setMascotMessage('Porã! Essa é uma boa tradução!');
      } else {
        // Verificar palavras individuais
        const palavras = inputText.toLowerCase().split(' ');
        const traducoes = palavras.map(palavra => mockPtToTupi[palavra] || palavra);
        
        if (traducoes.some(t => t !== palavras[traducoes.indexOf(t)])) {
          setOutputText(traducoes.join(' '));
          setMascotMessage('Tradução parcial concluída. Algumas palavras não foram reconhecidas.');
        } else {
          setOutputText('(Tradução não disponível - isso é uma demonstração)');
          setMascotMessage('Ainda estou aprendendo essa palavra em Tupi!');
        }
      }
    }
  };

  const handleSwitchDirection = () => {
    setTranslateDirection(prev => prev === 'tupi-pt' ? 'pt-tupi' : 'tupi-pt');
    setInputText('');
    setOutputText('');
    setMascotMessage(`Agora traduzindo de ${translateDirection === 'tupi-pt' ? 'Português para Tupi' : 'Tupi para Português'}!`);
  };

  const playSpeech = () => {
    setMascotMessage('Função de áudio será implementada em breve!');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background" role="main">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Tradutor</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSwitchDirection}
          className="flex items-center gap-2 focus:ring-2 focus:ring-tekoha-accent/50 text-tekoha-interactive border-tekoha-highlight bg-tekoha-highlight text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-highlight"
          aria-label={`Mudar direção: ${translateDirection === 'tupi-pt' ? 'Tupi para Português' : 'Português para Tupi'}`}
        >
          <span>{translateDirection === 'tupi-pt' ? 'Tupi → Pt' : 'Pt → Tupi'}</span>
          <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
        </Button>
      </header>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md p-4">
          <label htmlFor="translationInput" className="text-tekoha-black text-sm mb-2 block">
            {translateDirection === 'tupi-pt' ? 'Texto em Tupi' : 'Texto em Português'}:
          </label>
          <div className="flex gap-2">
            <Textarea
              id="translationInput"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={translateDirection === 'tupi-pt' ? 'Digite em Tupi...' : 'Digite em Português...'}
              className="min-h-[100px] w-full border-2 border-tekoha-secondary/30 focus:border-tekoha-highlight text-tekoha-black"
              aria-label={translateDirection === 'tupi-pt' ? 'Digite o texto em Tupi para traduzir' : 'Digite o texto em Português para traduzir'}
            />
            <Button 
              size="icon" 
              className="bg-tekoha-teal hover:bg-tekoha-teal/80 text-tekoha-accent hover:text-tekoha-accent active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50"
              aria-label="Usar microfone para entrada de voz"
              title="Esta funcionalidade será implementada em breve"
            >
              <Mic className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {outputText && (
          <div className="bg-white border-2 border-tekoha-secondary/30 rounded-xl shadow-md p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="translationOutput" className="text-tekoha-black text-sm block">
                {translateDirection === 'tupi-pt' ? 'Tradução para Português' : 'Tradução para Tupi'}:
              </label>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={playSpeech} 
                className="text-tekoha-secondary hover:text-tekoha-accent focus:ring-2 focus:ring-tekoha-accent/50"
                aria-label="Ouvir a tradução"
                title="Esta funcionalidade será implementada em breve"
              >
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <div 
              id="translationOutput"
              className="bg-gray-50 rounded-xl p-4 border border-tekoha-secondary/30"
              aria-live="polite"
              role="region" 
              aria-label="Resultado da tradução"
            >
              <p className="text-gray-800">{outputText}</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button 
            onClick={translateText}
            className="w-full bg-tekoha-highlight hover:bg-tekoha-highlight/90 py-6 text-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-tekoha-accent/50 text-tekoha-accent"
            aria-label="Traduzir o texto digitado"
          >
            <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" /> Traduzir
          </Button>
        </div>

        <div className="mt-4" aria-labelledby="suggestionsHeading">
          <h3 id="suggestionsHeading" className="text-lg font-medium text-tekoha-interactive mb-2">Sugestões:</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sugestões de palavras para tradução">
            {translateDirection === 'tupi-pt' ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setInputText('kunhã poranga')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">kunhã poranga</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('nde porã')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">nde porã</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('xe py\'a pe')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">xe py'a pe</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('paranã')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">paranã</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('îaguara')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">îaguara</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('ara porã')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">ara porã</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('tetama')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">tetama</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('purakî')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">purakî</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setInputText('bom dia')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">bom dia</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('água boa')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">água boa</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('eu te amo')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">eu te amo</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('obrigado')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">obrigado</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('floresta')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">floresta</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('pássaro')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">pássaro</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('família')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">família</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('música')} className="bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal border-tekoha-teal">música</Button>
              </>
            )}
          </div>
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

export default TranslatorPage;
