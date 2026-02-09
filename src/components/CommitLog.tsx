import { useState } from 'react';
import { GitCommit, GitPullRequest, Copy, ChevronDown, ChevronRight, Tag, X } from 'lucide-react';
import { memories, type Memory } from '../data/memories';
import { motion, AnimatePresence } from 'framer-motion';

interface CommitLogProps {
  onOpenPR: () => void;
}

const CommitLog: React.FC<CommitLogProps> = ({ onOpenPR }) => {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const toggleCommit = (hash: string) => {
    setExpandedCommit(expandedCommit === hash ? null : hash);
  };

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'feat': return 'text-git-green';
      case 'fix': return 'text-blue-400';
      case 'refactor': return 'text-purple-400';
      case 'merge': return 'text-purple-400';
      case 'initial': return 'text-yellow-400';
      default: return 'text-git-text';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="relative border border-git-border rounded-md bg-git-gray/30">
        <div className="flex items-center justify-between p-3 bg-git-gray border-b border-git-border rounded-t-md">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-git-text/70" />
            <span className="font-semibold text-sm">Commits</span>
            <span className="bg-git-border/50 px-2 py-0.5 rounded-full text-xs text-git-text/70">{memories.length}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-git-text/70">
            <span>Branch:</span>
            <span className="bg-git-border/30 px-2 py-0.5 rounded font-mono text-git-pink">main</span>
          </div>
        </div>

        <div className="divide-y divide-git-border/50">
          {memories.map((memory) => (
            <div key={memory.hash} className="group hover:bg-git-gray/40 transition-colors">
              <div 
                className="p-3 flex items-start gap-3 cursor-pointer"
                onClick={() => toggleCommit(memory.hash)}
              >
                <div className="pt-1 text-git-text/50">
                  {expandedCommit === memory.hash ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-mono text-sm font-semibold hover:underline ${getTypeColor(memory.type)}`}>
                      {memory.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-git-border/50 rounded text-git-text/70">
                          <Copy size={12} />
                        </button>
                      </div>
                      <span className="font-mono text-xs text-git-text/50 border border-git-border/50 rounded px-1.5 py-0.5">
                         {memory.hash}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-3 text-xs text-git-text/60">
                    <div className="flex items-center gap-1">
                      <img 
                        src="https://github.com/ARYAAN.png" 
                        alt="ARYAAN" 
                        className="w-4 h-4 rounded-full border border-git-border" 
                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=ARYAAN&background=0d1117&color=c9d1d9` }}
                      />
                      <span className="font-semibold">ARYAAN</span>
                      <span>committed on {memory.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedCommit === memory.hash && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-git-dark/50"
                  >
                    <div className="p-4 pl-10 border-t border-git-border/30 border-dashed">
                      <p className="text-sm text-git-text/80 mb-3">{memory.description}</p>
                      
                      {memory.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {memory.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-300 text-xs border border-blue-900/50">
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Photos Grid */}
                      {memory.photos && memory.photos.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {memory.photos.map((photo, i) => (
                            <div 
                              key={i} 
                              className="aspect-video bg-git-gray border border-git-border rounded overflow-hidden relative group/photo cursor-zoom-in"
                              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(photo); }}
                            >
                               <img 
                                 src={photo} 
                                 alt={`${memory.title} - ${i + 1}`}
                                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                 loading="lazy"
                               />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-git-text/50 text-xs italic mt-2">No photos committed yet.</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenPR}
          className="flex items-center gap-2 bg-git-green text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-900/20"
        >
          <GitPullRequest size={20} />
          Compare & Pull Request
        </motion.button>
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedPhoto}
              alt="Memory"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl border border-git-border"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitLog;
