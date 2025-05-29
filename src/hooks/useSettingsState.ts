
import { useState, useEffect } from 'react';

export const useSettingsState = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [mascotEnabled, setMascotEnabled] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [theme, setTheme] = useState('dark');
  const [mascotMessage, setMascotMessage] = useState('Aqui você pode personalizar o aplicativo do seu jeito!');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');

  // Apply font size to document root
  useEffect(() => {
    const root = document.documentElement;
    
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '20px';
        break;
      default:
        root.style.fontSize = '16px';
    }
    
    // Save to localStorage
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedApiKey = localStorage.getItem('elevenLabsApiKey');
    
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
    if (savedApiKey) {
      setElevenLabsApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (elevenLabsApiKey) {
      localStorage.setItem('elevenLabsApiKey', elevenLabsApiKey);
    }
  }, [elevenLabsApiKey]);

  return {
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
    setMascotMessage,
    elevenLabsApiKey,
    setElevenLabsApiKey
  };
};
