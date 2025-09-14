import React, { useRef, useEffect } from 'react';
import { CANVAS_SIZE } from '../../shared/constants';
import { clearCanvas, drawBackground, drawText, measureTextWidth } from '../utils/canvasUtils';

export const CanvasRenderer = ({ config, frameOffset = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !config.text) return;

    const ctx = canvas.getContext('2d');
    clearCanvas(ctx);
    drawBackground(ctx, config.backgroundColor);

    const textWidth = measureTextWidth(ctx, config.text, config.font, config.fontSize, config.letterSpacing, config.isBold);
    const totalWidth = textWidth + CANVAS_SIZE;
    const x = CANVAS_SIZE - (frameOffset % totalWidth);
    const y = CANVAS_SIZE / 2;

    drawText(ctx, config.text, x, y, config);

    if (x + textWidth < 0) {
      drawText(ctx, config.text, x + totalWidth, y, config);
    }
  }, [config, frameOffset]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="border border-gray-300 rounded-lg"
      style={{
        imageRendering: 'auto',
        willChange: 'transform'
      }}
    />
  );
};