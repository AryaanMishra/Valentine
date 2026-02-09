import React from 'react';
import { BookOpen, Camera, Telescope, GitFork, Star, Eye } from 'lucide-react';

interface RepoHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RepoHeader: React.FC<RepoHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-git-border bg-git-dark pt-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs and Repo Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-git-text">
            <BookOpen className="w-5 h-5 text-git-text/70" />
            <span className="text-blue-400 hover:underline cursor-pointer">ARYAAN</span>
            <span className="text-git-text/70">/</span>
            <span className="font-bold text-blue-400 hover:underline cursor-pointer">our-love-story</span>
            <span className="ml-2 px-2 py-0.5 text-xs border border-git-border rounded-full text-git-text/70 font-medium">Public</span>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-3 py-1 text-xs border border-git-border rounded-md bg-git-gray hover:bg-git-border transition-colors">
              <Eye className="w-4 h-4" />
              <span>Watch</span>
              <span className="ml-1 px-1 bg-git-border/50 rounded-full text-[10px]">1</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 text-xs border border-git-border rounded-md bg-git-gray hover:bg-git-border transition-colors">
              <GitFork className="w-4 h-4" />
              <span>Fork</span>
              <span className="ml-1 px-1 bg-git-border/50 rounded-full text-[10px]">0</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 text-xs border border-git-border rounded-md bg-git-gray hover:bg-git-border transition-colors">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>Star</span>
              <span className="ml-1 px-1 bg-git-border/50 rounded-full text-[10px]">∞</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-1 overflow-x-auto">
          <Tab 
            icon={<BookOpen className="w-4 h-4" />} 
            label="Our Story" 
            isActive={activeTab === 'story'} 
            onClick={() => setActiveTab('story')} 
          />
          <Tab 
            icon={<Camera className="w-4 h-4" />} 
            label="Memories" 
            isActive={activeTab === 'memories'} 
            onClick={() => setActiveTab('memories')} 
            count={124}
          />
          <Tab 
            icon={<Telescope className="w-4 h-4" />} 
            label="Future Plans" 
            isActive={activeTab === 'future'} 
            onClick={() => setActiveTab('future')} 
          />
        </nav>
      </div>
    </div>
  );
};

const Tab = ({ icon, label, isActive, onClick, count }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, count?: number }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap
      ${isActive 
        ? 'border-git-pink text-git-text font-semibold' 
        : 'border-transparent text-git-text/70 hover:border-git-border hover:text-git-text'}
    `}
  >
    {icon}
    {label}
    {count && (
      <span className="ml-1 px-1.5 py-0.5 bg-git-border/50 rounded-full text-xs">
        {count}
      </span>
    )}
  </button>
);

export default RepoHeader;
