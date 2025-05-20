
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Settings, VolumeX, Volume2, Download, Laptop, Moon, Sun, User, Mail, UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [mascotEnabled, setMascotEnabled] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [theme, setTheme] = useState('dark');
  const [mascotMessage, setMascotMessage] = useState('Aqui você pode personalizar o aplicativo do seu jeito!');

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setMascotMessage('Tema alterado! ' + (value === 'dark' ? 'Tema escuro é o padrão do app.' : 'Tema claro ativado!'));
  };

  const handleOfflineToggle = () => {
    const newValue = !offlineMode;
    setOfflineMode(newValue);
    
    if (newValue) {
      setMascotMessage('Modo offline ativado! Você poderá usar algumas funções do app sem internet!');
    } else {
      setMascotMessage('Modo offline desativado! Você precisará de conexão para todas as funções.');
    }
  };

  const handleMascotToggle = () => {
    const newValue = !mascotEnabled;
    setMascotEnabled(newValue);
    
    if (!newValue) {
      setMascotMessage('Você tem certeza que quer me desativar? 😢');
      
      // Delay the change to show the message
      setTimeout(() => {
        setMascotMessage('Ok, eu vou ficar mais quietinho...');
      }, 2000);
    } else {
      setMascotMessage('Oba! Estou de volta para te ajudar!');
    }
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSave = () => {
    setMascotMessage('Configurações salvas com sucesso!');
  };

  const handleChangeProfile = () => {
    setMascotMessage('Vamos escolher um novo perfil!');
    
    // Navigate to profile selection page with a small delay to show the mascot message
    setTimeout(() => {
      navigate('/profile-selection');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Configurações</h1>
        <Settings className="h-6 w-6 text-tekoha-red" />
      </header>

      <div className="flex-1">
        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Seu Perfil</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-tekoha-secondary/20 p-3 rounded-full">
                <User className="h-6 w-6 text-tekoha-red" />
              </div>
              <div className="flex-1">
                <p className="text-[#F2F2F2] font-medium">Professor</p>
                <p className="text-[#F2F2F2] text-sm">Perfil selecionado</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleChangeProfile}
                className="flex items-center gap-1 text-tekoha-highlight border-tekoha-highlight hover:bg-tekoha-background hover:text-tekoha-accent"
              >
                <UserCircle2 className="h-4 w-4 text-tekoha-red" />
                Trocar Perfil
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <Mail className="h-5 w-5 text-tekoha-red" />
              <Input 
                type="email" 
                placeholder="Seu email (opcional)"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="tekoha-input text-tekoha-secondary bg-tekoha-background/50 border-tekoha-secondary/30 focus:border-tekoha-highlight"
              />
            </div>
          </div>
        </div>

        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Aparência</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="h-5 w-5 text-tekoha-red" /> : <Sun className="h-5 w-5 text-tekoha-red" />}
                <span className="text-[#F2F2F2]">Tema</span>
              </div>
              
              <RadioGroup defaultValue={theme} onValueChange={handleThemeChange} className="flex gap-2">
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
              
              <RadioGroup defaultValue={fontSize} onValueChange={setFontSize} className="flex gap-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="small" id="font-small" />
                  <Label htmlFor="font-small" className="text-[#F2F2F2]">P</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <Label htmlFor="font-medium" className="text-[#F2F2F2]">M</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="large" id="font-large" />
                  <Label htmlFor="font-large" className="text-[#F2F2F2]">G</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Preferências</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="h-5 w-5 text-tekoha-red" /> : <VolumeX className="h-5 w-5 text-tekoha-red" />}
                <span className="text-[#F2F2F2]">Sons</span>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={handleSoundToggle} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#F2F2F2]">Notificações</span>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
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
              <Switch checked={mascotEnabled} onCheckedChange={handleMascotToggle} />
            </div>
          </div>
        </div>

        <div className="tekoha-card p-5 mb-6">
          <h2 className="text-xl font-medium text-tekoha-highlight mb-4">Aplicativo</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-tekoha-red" />
                <span className="text-[#F2F2F2]">Modo Offline</span>
              </div>
              <Switch checked={offlineMode} onCheckedChange={handleOfflineToggle} />
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

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="bg-tekoha-secondary hover:bg-tekoha-secondary/90 text-tekoha-accent">
            Salvar Configurações
          </Button>
        </div>
      </div>

      {mascotEnabled && (
        <Mascot 
          position="bottom-right" 
          message={mascotMessage}
          autoHide={false}
        />
      )}
    </div>
  );
};

export default SettingsPage;
