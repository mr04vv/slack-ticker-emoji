import React from 'react';

export const FontSizeControl = ({ value, onChange }) => {
  const presetSizes = [
    { value: 16, label: '小' },
    { value: 24, label: '中' },
    { value: 32, label: '大' },
    { value: 40, label: '特大' },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        文字サイズ
      </label>

      <div className="flex items-center gap-2">
        {presetSizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onChange(size.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              value === size.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="12"
          max="48"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-gray-600 w-12 text-right">
          {value}px
        </span>
      </div>
    </div>
  );
};