import React, { useEffect, useState, useRef } from 'react';
import { CanvasRenderer } from '../../canvas-renderer';

export const Preview = ({ config, isAnimating = true }) => {
  const [frameOffset, setFrameOffset] = useState(0);
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!isAnimating || !config.text) return;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;

      if (deltaTime >= 25) { // ~40fps (GIFと同じ)
        setFrameOffset((prev) => prev + config.animationSpeed);
        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [isAnimating, config.animationSpeed, config.text]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <span className="text-xl">👀</span>
        <h3 className="text-xl font-bold text-gray-800">プレビュー</h3>
      </div>

      <div className="flex justify-center">
        <div className="p-4 bg-gray-100 rounded-lg">
          <CanvasRenderer config={config} frameOffset={frameOffset} />
        </div>
      </div>
    </div>
  );
};