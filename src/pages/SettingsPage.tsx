
import React from 'react';
import { Button } from '../components/ui/button';
import { Settings } from 'lucide-react';
import BackButton from '../components/BackButton';
import Mascot from '../components/Mascot';
import ProfileSection from '../components/settings/ProfileSection';
import AppearanceSection from '../components/settings/AppearanceSection';
import PreferencesSection from '../components/settings/PreferencesSection';
import ApplicationSection from '../components/settings/ApplicationSection';
import { useSettingsState } from '../hooks/useSettingsState';
import { useSettingsHandlers } from '../hooks/useSettingsHandlers';

const SettingsPage: React.FC = () => {
  const {
    soundEnabled,
    setSoundEnabled,
    notificationsEnabled,
    setNotificationsEnabled,
    offlineMode,
    setOfflineMode,
    fontSize,
    setFontSize,
    mascotEnabled,
    setMascotEnabled,
    userEmail,
    setUserEmail,
    theme,
    setTheme,
    mascotMessage,
    setMascotMessage
  } = useSettingsState();

  const {
    handleThemeChange,
    handleFontSizeChange,
    handleOfflineToggle,
    handleMascotToggle,
    handleSoundToggle,
    handleSave,
    handleChangeProfile
  } = useSettingsHandlers({
    setTheme,
    setFontSize,
    setOfflineMode,
    setMascotEnabled,
    setSoundEnabled,
    setMascotMessage,
    offlineMode,
    mascotEnabled,
    soundEnabled
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Configurações</h1>
        </div>
        <Settings className="h-6 w-6 text-tekoha-red" />
      </header>

      <div className="flex-1">
        <ProfileSection
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          onChangeProfile={handleChangeProfile}
        />

        <AppearanceSection
          theme={theme}
          fontSize={fontSize}
          onThemeChange={handleThemeChange}
          onFontSizeChange={handleFontSizeChange}
        />

        <PreferencesSection
          soundEnabled={soundEnabled}
          notificationsEnabled={notificationsEnabled}
          mascotEnabled={mascotEnabled}
          onSoundToggle={handleSoundToggle}
          onNotificationsToggle={setNotificationsEnabled}
          onMascotToggle={handleMascotToggle}
        />

        <ApplicationSection
          offlineMode={offlineMode}
          onOfflineToggle={handleOfflineToggle}
        />

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
