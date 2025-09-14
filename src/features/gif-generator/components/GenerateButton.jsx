import React from 'react';

export const GenerateButton = ({ onClick, isGenerating, progress, hasText }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        disabled={isGenerating || !hasText}
        className={`w-full py-3 px-4 rounded font-medium transition ${
          isGenerating || !hasText
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>GIF生成中...</span>
            </>
          ) : (
            <span>GIFを生成</span>
          )}
        </div>
      </button>
      {isGenerating && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="h-full bg-blue-600 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600">
            {Math.round(progress)}% 完了
          </p>
        </div>
      )}
    </div>
  );
};