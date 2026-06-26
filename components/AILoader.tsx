
import React from 'react';
import { motion } from 'framer-motion';

// Fix for framer-motion type errors
const Motion = motion as any;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const QuantumLoader: React.FC = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    radius: random(20, 35),
    speed: random(2, 4),
    size: random(2, 4)
  }));

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Central Core */}
      <Motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 10px rgba(99, 102, 241, 0.4)',
            '0 0 30px rgba(99, 102, 241, 0.7)',
            '0 0 10px rgba(99, 102, 241, 0.4)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-6 h-6 bg-gradient-to-br from-indigo-400 to-pink-600 rounded-full blur-[2px]"
      />
      <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
      
      {/* Orbiting Particles */}
      {particles.map((p) => (
        <Motion.div
          key={p.id}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: p.speed, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-full h-full"
          style={{ rotate: p.angle }}
        >
          <Motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: p.speed * 0.3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
            style={{ 
              width: p.size, 
              height: p.size, 
              top: `calc(50% - ${p.radius}px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: `0 0 ${p.size * 2}px rgba(6, 182, 212, 0.6)`
            }}
          />
        </Motion.div>
      ))}

      {/* Orbit Rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <circle
          cx="50%"
          cy="50%"
          r="28"
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
};

export default QuantumLoader;
