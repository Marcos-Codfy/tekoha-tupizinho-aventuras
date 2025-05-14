import React, { useState } from 'react';
import Mascot from '../components/Mascot';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { MessageSquare, Mic, Volume2, ArrowRightLeft } from 'lucide-react';

const TranslatorPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [translateDirection, setTranslateDirection] = useState<'tupi-pt' | 'pt-tupi'>('tupi-pt');
  const [mascotMessage, setMascotMessage] = useState('Posso te ajudar a traduzir frases em Tupi para Português e vice-versa!');

  // Mock translation function
  const translateText = () => {
    if (!inputText.trim()) {
      setMascotMessage('Digite algum texto para eu traduzir!');
      return;
    }

    // Simulating translation with mock responses
    const mockTupiToPt: Record<string, string> = {
      'kunhã poranga': 'mulher bonita',
      'nde porã': 'você é bonito/bom',
      'xe py\'a pe': 'no meu coração',
      'paranã': 'rio grande, mar',
    };

    const mockPtToTupi: Record<string, string> = {
      'bom dia': 'ara porã',
      'água boa': 'y porã',
      'eu te amo': 'xe ro-payxu',
      'obrigado': 'aguyjewete',
    };

    if (translateDirection === 'tupi-pt') {
      // Try to find an exact match in our dictionary
      if (mockTupiToPt[inputText.toLowerCase()]) {
        setOutputText(mockTupiToPt[inputText.toLowerCase()]);
        setMascotMessage('Tradução concluída! Quer aprender mais palavras?');
      } else {
        setOutputText('(Tradução não disponível - isso é uma demonstração)');
        setMascotMessage('Desculpe, ainda estou aprendendo essa palavra!');
      }
    } else {
      // Try to find an exact match in our dictionary
      if (mockPtToTupi[inputText.toLowerCase()]) {
        setOutputText(mockPtToTupi[inputText.toLowerCase()]);
        setMascotMessage('Porã! Essa é uma boa tradução!');
      } else {
        setOutputText('(Tradução não disponível - isso é uma demonstração)');
        setMascotMessage('Ainda estou aprendendo essa palavra em Tupi!');
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
    <div className="min-h-screen flex flex-col p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-accent font-comic">Tradutor</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSwitchDirection}
          className="flex items-center gap-2"
        >
          <span>{translateDirection === 'tupi-pt' ? 'Tupi → Pt' : 'Pt → Tupi'}</span>
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex-1 flex flex-col gap-4">
        <div className="tekoha-card p-4">
          <label className="text-white text-sm mb-2 block">
            {translateDirection === 'tupi-pt' ? 'Texto em Tupi' : 'Texto em Português'}:
          </label>
          <div className="flex gap-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={translateDirection === 'tupi-pt' ? 'Digite em Tupi...' : 'Digite em Português...'}
              className="tekoha-input min-h-[100px] w-full"
            />
            <Button size="icon" className="bg-tekoha-interactive">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {outputText && (
          <div className="tekoha-card p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <label className="text-white text-sm block">
                {translateDirection === 'tupi-pt' ? 'Tradução para Português' : 'Tradução para Tupi'}:
              </label>
              <Button size="sm" variant="ghost" onClick={playSpeech} className="text-tekoha-interactive">
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="bg-tekoha-background/60 rounded-xl p-4 border border-tekoha-secondary/30">
              <p className="text-white">{outputText}</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Button 
            onClick={translateText}
            className="w-full bg-tekoha-secondary hover:bg-tekoha-secondary/90 py-6 text-lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" /> Traduzir
          </Button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-white mb-2">Sugestões:</h3>
          <div className="flex flex-wrap gap-2">
            {translateDirection === 'tupi-pt' ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setInputText('kunhã poranga')}>kunhã poranga</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('nde porã')}>nde porã</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('xe py\'a pe')}>xe py'a pe</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('paranã')}>paranã</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setInputText('bom dia')}>bom dia</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('água boa')}>água boa</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('eu te amo')}>eu te amo</Button>
                <Button variant="outline" size="sm" onClick={() => setInputText('obrigado')}>obrigado</Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Mascot 
        position="bottom-right" 
        message={mascotMessage}
        autoHide={false}
      />
    </div>
  );
};

export default TranslatorPage;
