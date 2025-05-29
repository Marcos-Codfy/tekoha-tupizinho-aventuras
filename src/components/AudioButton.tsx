
import React from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface AudioButtonProps {
  text: string;
  apiKey?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'default';
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  apiKey,
  size = 'sm',
  variant = 'ghost',
  className = ''
}) => {
  const { speak, isPlaying } = useTextToSpeech({ apiKey });

  const handleClick = () => {
    speak(text);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      disabled={!apiKey}
      title={!apiKey ? 'Configure sua chave do ElevenLabs nas configurações' : 'Ouvir áudio'}
    >
      {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  );
};

export default AudioButton;
