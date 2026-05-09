/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Dumbbell, 
  Terminal, 
  Clock, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { WORKOUT_ROUTINES } from './constants';
import { WorkoutRoutine } from './types';

const DURATIONS = [1, 5, 10, 15, 20, 30];

export default function App() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRoutine | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 1 && isActive) {
      handleComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const handleGenerate = () => {
    if (selectedDuration) {
      const workout = WORKOUT_ROUTINES[selectedDuration];
      setActiveWorkout(workout);
      setTimeLeft(selectedDuration * 60);
      setIsActive(false);
      setIsCompleted(false);
      setShowConfetti(false);
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    if (activeWorkout) {
      setTimeLeft(activeWorkout.duration * 60);
      setIsActive(false);
      setIsCompleted(false);
      setShowConfetti(false);
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
    setShowConfetti(true);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 font-sans text-slate-200">
      <div className="flex-1 flex flex-col p-8 max-w-5xl mx-auto w-full justify-between">
        {/* Header Section */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8 mt-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Cali<span className="text-emerald-400">Code</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 ml-2 font-mono">
                v1.0.4
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Turn long-running tasks into body-sculpting reps.</p>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
            <span className="text-xs text-slate-300 font-mono">
              {isActive ? 'AI AGENT: COMPILING REPS...' : 'AI AGENT: ON STANDBY'}
            </span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full">
            {/* Left Column: Controls & Selection */}
            <div className="lg:col-span-4 space-y-6">
              <section className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Select Queue Duration</h3>
                <div className="grid grid-cols-3 gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`
                        py-3 rounded-md border transition-all font-mono text-sm font-semibold
                        ${selectedDuration === d 
                          ? 'bg-slate-800 border-emerald-500 text-emerald-400' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}
                      `}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </section>

              <button
                disabled={!selectedDuration}
                onClick={handleGenerate}
                className={`
                  w-full py-4 rounded-xl font-bold uppercase tracking-tighter transition-all flex items-center justify-center gap-2
                  ${selectedDuration 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/10' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
                `}
              >
                <Dumbbell size={18} />
                Generate Routine
              </button>

              {activeWorkout && (
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase mb-2 tracking-widest">Active Instructions</p>
                  <ul className="space-y-3">
                    {activeWorkout.exercises.map((ex, i) => (
                      <li key={i} className="flex justify-between items-center text-xs">
                        <span className="text-slate-300">{ex.name}</span>
                        <span className="text-emerald-400 font-mono">{ex.duration || ex.reps}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 pt-3 border-t border-emerald-500/10 text-[10px] text-emerald-500/60 italic">
                    Repeat for {activeWorkout.totalSets} cycles total.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Workout Stage */}
            <div className="lg:col-span-8 h-full min-h-[400px]">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-full flex flex-col justify-between glow relative overflow-hidden">
                {!activeWorkout ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <Activity size={48} className="text-slate-800" />
                    <p className="text-slate-500 font-mono text-sm">NO ACTIVE ROUTINE IN BUFFER</p>
                    <p className="text-slate-600 text-xs max-w-xs">Select a duration and click generate to populate the workout queue.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          Current Active Task
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-2">{activeWorkout.title}</h2>
                      <p className="text-slate-400 text-sm max-w-md">{activeWorkout.subtitle}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 relative z-10">
                      <div className="text-8xl md:text-[7rem] font-black text-emerald-400 font-mono tracking-tighter mb-8 mono-display">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleStartPause}
                          className="px-10 py-3 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
                        >
                          {isActive ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                          {isActive ? 'PAUSE' : 'START'}
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-6 py-3 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors text-sm"
                        >
                          RESET
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-6 flex justify-between items-center relative z-10">
                      <div className="flex gap-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500/50' : 'bg-slate-700'}`}></span>
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500/30' : 'bg-slate-700'}`}></span>
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500/10' : 'bg-slate-700'}`}></span>
                      </div>
                      <button 
                        onClick={handleComplete}
                        className="text-emerald-400 text-sm font-bold flex items-center gap-2 hover:text-emerald-300 transition-colors group"
                      >
                        MARK AS DONE 
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-8 pt-6 border-t border-slate-900 flex justify-between items-center opacity-40 text-[10px] font-mono tracking-widest text-slate-500">
          <p>&copy; 2024 CALICODE OS // ENGINE FOR ELITE DEVELOPERS</p>
          <div className="hidden sm:flex gap-6 uppercase">
            <span>LOC: /DEV/WORKOUT</span>
            <span>MEM: 100%_COMMIT</span>
          </div>
        </footer>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border-2 border-emerald-500 p-10 rounded-[2.5rem] text-center max-w-sm w-full success-glow shadow-2xl shadow-emerald-500/20"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <CheckCircle2 size={40} className="text-slate-950" />
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-2 font-mono uppercase tracking-tighter">Success Report</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                Routine completed. High-performance mindset maintained. System efficiency at peak levels.
              </p>
              <button
                onClick={() => setShowConfetti(false)}
                className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs"
              >
                Return to Buffer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
