
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { User, Mail, UserCircle2 } from 'lucide-react';

interface ProfileSectionProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  onChangeProfile: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userEmail,
  setUserEmail,
  onChangeProfile
}) => {
  return (
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
            onClick={onChangeProfile}
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
  );
};

export default ProfileSection;
