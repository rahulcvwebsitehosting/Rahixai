
import React, { useEffect, useRef } from 'react';

export const RahiRobot: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const robot = wrapperRef.current;
      const leftPupil = leftPupilRef.current;
      const rightPupil = rightPupilRef.current;

      if (!robot || !leftPupil || !rightPupil) return;

      // Get robot's position on screen
      const robotRect = robot.getBoundingClientRect();
      const robotCenterX = robotRect.left + robotRect.width / 2;
      const robotCenterY = robotRect.top + robotRect.height / 2;

      // Calculate angle between robot and cursor
      const angle = Math.atan2(
        e.clientY - robotCenterY,
        e.clientX - robotCenterX
      );

      // Calculate distance (max 10px pupil movement)
      const distance = Math.min(
        10,
        Math.hypot(e.clientX - robotCenterX, e.clientY - robotCenterY) / 20
      );

      // Calculate pupil offset coordinates
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      // Apply transform to pupils
      const transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      leftPupil.style.transform = transform;
      rightPupil.style.transform = transform;

      // Subtle head tilt based on cursor position (parallax effect)
      const tiltX = (e.clientX - window.innerWidth / 2) / 50;
      const tiltY = (e.clientY - window.innerHeight / 2) / 50;

      robot.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY
        } as MouseEvent);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-[400px] h-[500px] flex items-center justify-center select-none scale-90 md:scale-100">
      <style>{`
        .robot-wrapper {
          position: relative;
          width: 400px;
          height: 500px;
          animation: robotFloat 4s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .robot {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .robot-head {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 180px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 50% 50% 45% 45%;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.2),
            inset 0 -10px 20px rgba(0,0,0,0.05),
            inset 0 10px 20px rgba(255,255,255,0.8);
          z-index: 20;
        }
        
        .dark .robot-head {
          background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
        }

        .robot-face {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 100px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
          border: 2px solid rgba(255,255,255,0.1);
        }

        .eyes-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 30px;
        }

        .eye {
          width: 40px;
          height: 40px;
          background: #000;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }

        .eye::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          border-radius: 50%;
          opacity: 0.8;
        }

        .pupil {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          background: #000;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
          z-index: 5;
        }

        .pupil::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 3px;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
        }

        .eye-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
          opacity: 0.5;
          animation: eyePulse 2s ease-in-out infinite;
        }

        @keyframes eyePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .robot-body {
          position: absolute;
          top: 220px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 200px;
          background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
          border-radius: 40px;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.15),
            inset 0 -10px 20px rgba(0,0,0,0.05);
        }
        
        .dark .robot-body {
          background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%);
        }

        .robot-chest {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 80px;
          background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.4);
        }

        .robot-arm {
          position: absolute;
          top: 240px;
          width: 50px;
          height: 110px;
          background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%);
          border-radius: 25px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .arm-left {
          left: 65px;
          transform: rotate(15deg);
        }

        .arm-right {
          right: 65px;
          transform: rotate(-15deg);
        }

        .speech-bubble {
          position: absolute;
          top: 0px;
          right: 0px;
          background: white;
          color: #1e293b;
          padding: 12px 24px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 800;
          opacity: 0;
          transform: scale(0.8) translateY(10px);
          animation: popIn 0.5s 1s forwards, floatBubble 3s ease-in-out infinite 1s;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          z-index: 50;
          border: 2px solid #6366f1;
        }

        @keyframes popIn {
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes floatBubble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 20px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid #6366f1;
        }
      `}</style>

      <div className="robot-wrapper" ref={wrapperRef}>
        <div className="speech-bubble">Hi I'm Rahi!</div>
        
        <div className="robot">
          {/* Robot Head */}
          <div className="robot-head">
            <div className="robot-face">
              <div className="eyes-container">
                <div className="eye">
                  <div className="eye-glow"></div>
                  <div className="pupil" ref={leftPupilRef}></div>
                </div>
                <div className="eye">
                  <div className="eye-glow"></div>
                  <div className="pupil" ref={rightPupilRef}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Robot Body */}
          <div className="robot-body">
            <div className="robot-chest"></div>
          </div>
          
          {/* Arms */}
          <div className="robot-arm arm-left"></div>
          <div className="robot-arm arm-right"></div>
        </div>
      </div>
    </div>
  );
};
