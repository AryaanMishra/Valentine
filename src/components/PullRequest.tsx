import React, { useState } from 'react';
import { GitPullRequest, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalModal from './TerminalModal';
import confetti from 'canvas-confetti';

const PullRequest: React.FC = () => {
  const [rejectionLevel, setRejectionLevel] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const handleNoClick = () => {
    if (rejectionLevel === 0) {
      setShowToast(true);
      setRejectionLevel(1);
      setTimeout(() => setShowToast(false), 4000);
    } else if (rejectionLevel === 1) {
      setIsModalOpen(true);
    } else if (rejectionLevel >= 2) {
       // It's really a yes now
       handleMerge();
    }
  };

  const handleModalComplete = () => {
    setRejectionLevel(2);
    setTimeout(() => {
        setIsModalOpen(false);
    }, 2500);
  };

  const handleMerge = () => {
    setIsMerged(true);
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var random = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    var interval: any = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h1 className="text-2xl font-semibold text-git-text">feat: Be My Valentine? <span className="text-git-text/40 font-light">#143</span></h1>
           </div>
           <div className="flex items-center gap-2 text-sm text-git-text/70">
             <div className={`px-2 py-0.5 rounded-full text-white flex items-center gap-1 ${isMerged ? 'bg-git-purple' : 'bg-git-green'}`}>
               <GitPullRequest size={14} />
               {isMerged ? 'Merged' : 'Open'}
             </div>
             <span className="font-semibold text-git-text">ARYAAN</span>
             <span>wants to merge 1 commit into <code className="bg-git-gray px-1 rounded">main</code> from <code className="bg-git-gray px-1 rounded">feature/valentine-proposal</code></span>
           </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column (Content) */}
        <div className="flex-1">
          <div className="border border-git-border rounded-md bg-git-dark">
            <div className="bg-git-gray/50 border-b border-git-border p-2 px-3 flex items-center justify-between">
               <span className="text-sm font-light">Write Preview</span>
            </div>
            <div className="p-6 prose prose-invert max-w-none prose-p:text-git-text prose-headings:text-git-text">
              <p>Hey,</p>
              <p>From our first "commit" at UC Merced to navigating the "merge conflicts" of distance, every version of us has been my favorite.</p>
              <p>We've shipped 3 years of memories, handled major refactors (transfers), and kept our connection stable with 99.9% uptime.</p>
              <p>I'm ready to push to production for the long haul.</p>
              <h3>Will you be my Valentine?</h3>
              <ul className="list-disc pl-5 space-y-1">
                 <li>[ ] No</li>
                 <li>[x] Yes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border border-git-border rounded-md bg-git-gray/20 p-4">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 {isMerged ? (
                    <div className="bg-git-purple/20 text-git-purple p-2 rounded-full border border-git-purple/50">
                        <GitPullRequest size={24} />
                    </div>
                 ) : (
                    <div className="bg-git-green/20 text-git-green p-2 rounded-full border border-git-green/50">
                        <GitPullRequest size={24} />
                    </div>
                 )}
                 <div>
                    <h3 className="font-semibold text-lg">{isMerged ? 'Pull request successfully merged and closed' : 'This branch has no conflicts with the base branch'}</h3>
                    <p className="text-sm text-git-text/70">{isMerged ? 'You are now officially my Valentine!' : 'Merging can be performed automatically.'}</p>
                 </div>
               </div>
            </div>
            
            {!isMerged && (
               <div className="flex items-center gap-3 justify-end">
                   {rejectionLevel < 2 && (
                      <button 
                        onClick={handleNoClick}
                        className="px-4 py-2 border border-git-border rounded text-git-red hover:bg-git-red/10 transition-colors font-semibold text-sm"
                      >
                         Close Pull Request
                      </button>
                   )}
                   
                   {rejectionLevel >= 2 && (
                      <button 
                         onClick={handleMerge}
                         className="px-4 py-2 border border-gray-600 rounded bg-gray-700 text-gray-400 cursor-not-allowed font-mono text-sm"
                         disabled
                      >
                         git push --force (Yes)
                      </button>
                   )}

                   <button 
                      onClick={handleMerge}
                      className="px-4 py-2 bg-git-green text-white rounded hover:bg-green-600 transition-colors font-semibold text-sm flex items-center gap-2"
                   >
                      Merge Pull Request
                   </button>
               </div>
            )}
            
            {isMerged && (
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-git-purple/10 text-git-purple border border-git-purple rounded text-sm font-semibold">
                       Revert
                    </button>
                </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full md:w-64 space-y-4">
          <div className="border-b border-git-border pb-4">
            <h3 className="text-xs font-semibold text-git-text/60 uppercase mb-2">Reviewers</h3>
            <div className="flex items-center gap-2 text-sm">
               <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                  GF
               </div>
               <span>Girlfriend</span>
               <Check size={14} className="text-git-green ml-auto opacity-0" />
            </div>
          </div>
          
           <div className="border-b border-git-border pb-4">
            <h3 className="text-xs font-semibold text-git-text/60 uppercase mb-2">Assignees</h3>
            <div className="flex items-center gap-2 text-sm">
               <img src="https://github.com/ARYAAN.png" className="w-5 h-5 rounded-full" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=ARYAAN&background=0d1117&color=c9d1d9` }}/>
               <span>ARYAAN</span>
            </div>
          </div>
          
          <div className="border-b border-git-border pb-4">
            <h3 className="text-xs font-semibold text-git-text/60 uppercase mb-2">Labels</h3>
            <div className="flex flex-wrap gap-1">
               <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs">love</span>
               <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs">question</span>
            </div>
          </div>
        </div>
      </div>

      <TerminalModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onComplete={handleModalComplete} 
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 bg-git-red text-white px-4 py-3 rounded shadow-lg border border-red-800 flex items-center gap-3 z-50 whitespace-nowrap"
          >
             <div className="p-1 bg-white/20 rounded-full">
               <X size={14} />
             </div>
             <span className="font-mono text-sm">Error: User 'Girlfriend' does not have write access to 'break_heart'</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PullRequest;
