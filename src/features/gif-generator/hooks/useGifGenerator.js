import { useState } from 'react';
import { generateGifFrames, createGifFromFrames } from '../utils/gifGenerator';

export const useGifGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [gifUrl, setGifUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateGif = async (config) => {
    if (!config.text) {
      setError('テキストを入力してください');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      setProgress(10);
      const frames = await generateGifFrames(config, (p) => {
        setProgress(10 + p * 60); // 10-70%
      });

      setProgress(75);
      const blob = await createGifFromFrames(frames, config);

      setProgress(95);
      const url = URL.createObjectURL(blob);

      if (gifUrl) {
        URL.revokeObjectURL(gifUrl);
      }

      setGifUrl(url);
      setProgress(100);
    } catch (err) {
      console.error('GIF generation error:', err);
      setError(err.message || 'GIF生成中にエラーが発生しました');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadGif = (filename = 'slack-emoji.gif') => {
    if (!gifUrl) return;

    const a = document.createElement('a');
    a.href = gifUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetGif = () => {
    if (gifUrl) {
      URL.revokeObjectURL(gifUrl);
    }
    setGifUrl(null);
    setProgress(0);
    setError(null);
  };

  return {
    isGenerating,
    progress,
    gifUrl,
    error,
    generateGif,
    downloadGif,
    resetGif,
  };
};