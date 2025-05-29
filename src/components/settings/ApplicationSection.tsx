
import React from 'react';
import { Switch } from '../ui/switch';
import { Download, Laptop } from 'lucide-react';

interface ApplicationSectionProps {
  offlineMode: boolean;
  onOfflineToggle: () => void;
}

const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  offlineMode,
  onOfflineToggle
}) => {
  return (
    <div className="tekoha-card p-5 mb-6">
      <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Aplicativo</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-tekoha-red" />
            <span className="text-[#F2F2F2]">Modo Offline</span>
          </div>
          <Switch checked={offlineMode} onCheckedChange={onOfflineToggle} />
        </div>
        
        <div className="mt-4 pt-4 border-t border-tekoha-secondary/30">
          <div className="flex items-center gap-2">
            <Laptop className="h-5 w-5 text-tekoha-red" />
            <span className="text-[#F2F2F2]">Versão do App</span>
            <span className="text-tekoha-highlight text-sm ml-auto">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSection;
