import React from 'react';

export const LetterSpacingControl = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        文字間隔
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="-5"
          max="20"
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