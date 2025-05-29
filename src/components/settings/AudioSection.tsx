
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Volume2, ExternalLink } from 'lucide-react';

interface AudioSectionProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onTestAudio: () => void;
}

const AudioSection: React.FC<AudioSectionProps> = ({
  apiKey,
  onApiKeyChange,
  onTestAudio
}) => {
  return (
    <div className="tekoha-card p-5 mb-6">
      <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Áudio e Fala</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="elevenlabs-key" className="text-[#F2F2F2] mb-2 block">
            Chave da API ElevenLabs
          </Label>
          <div className="flex gap-2">
            <Input
              id="elevenlabs-key"
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Insira sua chave da API do ElevenLabs"
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://elevenlabs.io/app/speech-synthesis', '_blank')}
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              Obter
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Você precisa de uma conta ElevenLabs para usar a funcionalidade de áudio
          </p>
        </div>

        {apiKey && (
          <div className="pt-4 border-t border-tekoha-secondary/30">
            <Button
              onClick={onTestAudio}
              className="flex items-center gap-2 bg-tekoha-teal text-tekoha-accent hover:bg-tekoha-accent hover:text-tekoha-teal"
            >
              <Volume2 className="h-4 w-4" />
              Testar Áudio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioSection;
