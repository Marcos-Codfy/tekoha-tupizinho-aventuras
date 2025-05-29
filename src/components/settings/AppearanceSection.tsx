
import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Moon, Sun } from 'lucide-react';

interface AppearanceSectionProps {
  theme: string;
  fontSize: string;
  onThemeChange: (value: string) => void;
  onFontSizeChange: (value: string) => void;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  theme,
  fontSize,
  onThemeChange,
  onFontSizeChange
}) => {
  return (
    <div className="tekoha-card p-5 mb-6">
      <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Aparência</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-5 w-5 text-tekoha-red" /> : <Sun className="h-5 w-5 text-tekoha-red" />}
            <span className="text-[#F2F2F2]">Tema</span>
          </div>
          
          <RadioGroup defaultValue={theme} onValueChange={onThemeChange} className="flex gap-2">
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark" className="text-[#F2F2F2]">Escuro</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light" className="text-[#F2F2F2]">Claro</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#F2F2F2]">Tamanho da Fonte</span>
          </div>
          
          <RadioGroup value={fontSize} onValueChange={onFontSizeChange} className="flex gap-2">
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="small" id="font-small" />
              <Label htmlFor="font-small" className="text-[#F2F2F2] text-xs">P</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="medium" id="font-medium" />
              <Label htmlFor="font-medium" className="text-[#F2F2F2] text-base">M</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="large" id="font-large" />
              <Label htmlFor="font-large" className="text-[#F2F2F2] text-lg">G</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSection;
