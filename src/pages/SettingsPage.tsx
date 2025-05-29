
import React from 'react';
import { Button } from '../components/ui/button';
import { Save } from 'lucide-react';
import Mascot from '../components/Mascot';
import BackButton from '../components/BackButton';
import ProfileSection from '../components/settings/ProfileSection';
import AppearanceSection from '../components/settings/AppearanceSection';
import PreferencesSection from '../components/settings/PreferencesSection';
import ApplicationSection from '../components/settings/ApplicationSection';
import AudioSection from '../components/settings/AudioSection';
import { useSettingsState } from '../hooks/useSettingsState';
import { useSettingsHandlers } from '../hooks/useSettingsHandlers';

const SettingsPage: React.FC = () => {
  const settingsState = useSettingsState();
  const settingsHandlers = useSettingsHandlers(settingsState);

  return (
    <div className="min-h-screen flex flex-col p-6 bg-tekoha-background">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-2xl font-bold text-tekoha-highlight font-comic">Configurações</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6">
        <ProfileSection
          userEmail={settingsState.userEmail}
          onEmailChange={settingsState.setUserEmail}
          onChangeProfile={settingsHandlers.handleChangeProfile}
        />

        <AppearanceSection
          theme={settingsState.theme}
          fontSize={settingsState.fontSize}
          onThemeChange={settingsHandlers.handleThemeChange}
          onFontSizeChange={settingsHandlers.handleFontSizeChange}
        />

        <AudioSection
          apiKey={settingsState.elevenLabsApiKey}
          onApiKeyChange={settingsHandlers.handleApiKeyChange}
          onTestAudio={settingsHandlers.handleTestAudio}
        />

        <PreferencesSection
          soundEnabled={settingsState.soundEnabled}
          notificationsEnabled={settingsState.notificationsEnabled}
          mascotEnabled={settingsState.mascotEnabled}
          onSoundToggle={settingsHandlers.handleSoundToggle}
          onNotificationsToggle={() => settingsState.setNotificationsEnabled(!settingsState.notificationsEnabled)}
          onMascotToggle={settingsHandlers.handleMascotToggle}
        />

        <ApplicationSection
          offlineMode={settingsState.offlineMode}
          onOfflineToggle={settingsHandlers.handleOfflineToggle}
        />

        <div className="pt-6">
          <Button 
            onClick={settingsHandlers.handleSave}
            className="w-full bg-tekoha-highlight hover:bg-tekoha-highlight/90 py-6 text-lg text-tekoha-accent"
          >
            <Save className="mr-2 h-5 w-5" /> Salvar Configurações
          </Button>
        </div>
      </div>

      <Mascot 
        position="bottom-right" 
        message={settingsState.mascotMessage}
        autoHide={true}
        hideTime={2000}
        size="md"
      />
    </div>
  );
};

export default SettingsPage;
