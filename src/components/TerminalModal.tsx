import { useState, useEffect, useRef } from 'react';
import { X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'prompt' | 'error'>('prompt');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setInput('');
      setPhase('prompt');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'prompt') {
       // Simulate processing
       setPhase('error');
       setTimeout(() => {
          onComplete();
       }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#1e1e1e] border border-gray-600 rounded-lg shadow-2xl overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-600">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-gray-400 text-sm">bash — 80x24</span>
              </div>
              <div className="flex gap-2">
                 <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
                   <X size={14} className="text-gray-400" />
                 </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-64 overflow-y-auto text-sm" onClick={() => inputRef.current?.focus()}>
              <div className="text-green-400 mb-2">
                $ sudo reject_ARYAAN
              </div>
              
              {phase === 'prompt' && (
                <form onSubmit={handleSubmit} className="flex items-center">
                  <span className="text-white mr-2">[sudo] password for girlfriend:</span>
                  <input
                    ref={inputRef}
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-transparent caret-white"
                    autoFocus
                  />
                  {/* Keep cursor blinking but hide text */}
                </form>
              )}

              {phase === 'error' && (
                <div>
                   <div className="flex items-center">
                    <span className="text-white mr-2">[sudo] password for girlfriend:</span>
                    <span className="text-white">***********</span>
                  </div>
                  <div className="mt-2 text-white">
                    Sorry, user is not in the sudoers file. This incident will be reported to Santa.
                  </div>
                </div>
              )}
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
