import React from 'react';

export const GifPreview = ({ gifUrl, onDownload, onReset, showTitle = true }) => {
  if (!gifUrl) return null;

  const copyToClipboard = async () => {
    try {
      const response = await fetch(gifUrl);
      const blob = await response.blob();
      const item = new ClipboardItem({ 'image/gif': blob });
      await navigator.clipboard.write([item]);
      alert('GIFをクリップボードにコピーしました！');
    } catch (err) {
      alert('クリップボードへのコピーに失敗しました');
    }
  };

  return (
    <div className={`space-y-4 ${showTitle ? 'p-4 bg-gray-50 rounded-lg' : ''}`}>
      {showTitle && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">生成されたGIF</h3>
          {onReset && (
            <button
              onClick={onReset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              リセット
            </button>
          )}
        </div>
      )}

      <div className="flex justify-center">
        <img
          src={gifUrl}
          alt="Generated emoji"
          className="border border-gray-300 rounded-lg"
          style={{ imageRendering: 'pixelated', width: '128px', height: '128px' }}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onDownload}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          ダウンロード
        </button>
        {navigator.clipboard && navigator.clipboard.write && (
          <button
            onClick={copyToClipboard}
            className="flex-1 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            コピー
          </button>
        )}
      </div>
    </div>
  );
};