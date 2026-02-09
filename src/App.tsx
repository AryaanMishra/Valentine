import { useState } from 'react';
import RepoHeader from './components/RepoHeader';
import CommitLog from './components/CommitLog';
import PullRequest from './components/PullRequest';
import { BookOpen } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('story');
  const [view, setView] = useState<'main' | 'pr'>('main');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentView = () => {
    if (view === 'pr') {
      return <PullRequest />;
    }

    switch (activeTab) {
      case 'story':
      case 'memories':
        return <CommitLog onOpenPR={() => { setView('pr'); scrollToTop(); }} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-git-text/50">
            <BookOpen size={48} className="mb-4 opacity-50" />
            <h2 className="text-xl font-semibold">This content is currently being written...</h2>
            <p>Check back in the future!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-git-dark text-git-text font-sans pb-20">
      <RepoHeader activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setView('main'); }} />
      
      <main className="container mx-auto px-4 py-6">
        {currentView()}
      </main>

      <footer className="border-t border-git-border mt-10 py-6 text-center text-xs text-git-text/50">
        <div className="flex items-center justify-center gap-4 mb-2">
           <span className="hover:text-blue-400 cursor-pointer">Terms</span>
           <span className="hover:text-blue-400 cursor-pointer">Privacy</span>
           <span className="hover:text-blue-400 cursor-pointer">Security</span>
           <span className="hover:text-blue-400 cursor-pointer">Status</span>
           <span className="hover:text-blue-400 cursor-pointer">Docs</span>
        </div>
        <p>© 2026 The Repository of Us. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
