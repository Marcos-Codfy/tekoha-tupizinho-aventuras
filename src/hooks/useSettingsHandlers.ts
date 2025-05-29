
import { useNavigate } from 'react-router-dom';

interface UseSettingsHandlersProps {
  setTheme: (theme: string) => void;
  setFontSize: (size: string) => void;
  setOfflineMode: (mode: boolean) => void;
  setMascotEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMascotMessage: (message: string) => void;
  offlineMode: boolean;
  mascotEnabled: boolean;
  soundEnabled: boolean;
}

export const useSettingsHandlers = ({
  setTheme,
  setFontSize,
  setOfflineMode,
  setMascotEnabled,
  setSoundEnabled,
  setMascotMessage,
  offlineMode,
  mascotEnabled,
  soundEnabled
}: UseSettingsHandlersProps) => {
  const navigate = useNavigate();

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setMascotMessage('Tema alterado! ' + (value === 'dark' ? 'Tema escuro é o padrão do app.' : 'Tema claro ativado!'));
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    let message = 'Tamanho da fonte alterado! ';
    switch (value) {
      case 'small':
        message += 'Fonte pequena selecionada.';
        break;
      case 'medium':
        message += 'Fonte média (padrão) selecionada.';
        break;
      case 'large':
        message += 'Fonte grande selecionada.';
        break;
    }
    setMascotMessage(message);
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

  return {
    handleThemeChange,
    handleFontSizeChange,
    handleOfflineToggle,
    handleMascotToggle,
    handleSoundToggle,
    handleSave,
    handleChangeProfile
  };
};
