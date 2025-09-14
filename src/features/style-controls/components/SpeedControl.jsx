import React from 'react';

export const SpeedControl = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        アニメーション速度
      </label>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">遅い</span>
        <input
          type="range"
          min="5"
          max="25"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-gray-500">速い</span>
        <span className="text-sm text-gray-600 w-8 text-right">
          {value}
        </span>
      </div>
    </div>
  );
};