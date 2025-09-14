import React from 'react';

export const TextEffects = ({ config, updateConfig }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.isBold}
            onChange={(e) => updateConfig('isBold', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">太字</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.addBorder}
            onChange={(e) => updateConfig('addBorder', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">縁取り</span>
        </label>
        {config.addBorder && (
          <div className="ml-6 space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs text-gray-600">色:</label>
              <input
                type="color"
                value={config.borderColor}
                onChange={(e) => updateConfig('borderColor', e.target.value)}
                className="h-6 w-12 rounded border border-gray-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-xs text-gray-600">太さ:</label>
              <input
                type="range"
                min="1"
                max="15"
                value={config.borderWidth}
                onChange={(e) => updateConfig('borderWidth', Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-gray-600 w-6">{config.borderWidth}</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.addShadow}
            onChange={(e) => updateConfig('addShadow', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">影</span>
        </label>
        {config.addShadow && (
          <div className="ml-6 space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs text-gray-600">色:</label>
              <input
                type="color"
                value={config.shadowColor}
                onChange={(e) => updateConfig('shadowColor', e.target.value)}
                className="h-6 w-12 rounded border border-gray-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-xs text-gray-600">ぼかし:</label>
              <input
                type="range"
                min="0"
                max="10"
                value={config.shadowBlur}
                onChange={(e) => updateConfig('shadowBlur', Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs text-gray-600 w-4">{config.shadowBlur}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};