
import React from 'react';
import { Switch } from '../ui/switch';
import { VolumeX, Volume2 } from 'lucide-react';

interface PreferencesSectionProps {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  mascotEnabled: boolean;
  onSoundToggle: () => void;
  onNotificationsToggle: (value: boolean) => void;
  onMascotToggle: () => void;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  soundEnabled,
  notificationsEnabled,
  mascotEnabled,
  onSoundToggle,
  onNotificationsToggle,
  onMascotToggle
}) => {
  return (
    <div className="tekoha-card p-5 mb-6">
      <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Preferências</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="h-5 w-5 text-tekoha-red" /> : <VolumeX className="h-5 w-5 text-tekoha-red" />}
            <span className="text-[#F2F2F2]">Sons</span>
          </div>
          <Switch checked={soundEnabled} onCheckedChange={onSoundToggle} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#F2F2F2]">Notificações</span>
          </div>
          <Switch checked={notificationsEnabled} onCheckedChange={onNotificationsToggle} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9620d32b-42f8-4faa-8659-e65d986e769b.png"
              alt="Tupizinho"
              className="w-5 h-5" 
            />
            <span className="text-[#F2F2F2]">Tupizinho (Mascote)</span>
          </div>
          <Switch checked={mascotEnabled} onCheckedChange={onMascotToggle} />
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
