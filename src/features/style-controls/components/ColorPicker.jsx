import React from 'react';
import { PRESET_COLORS } from '../../shared/constants';

export const ColorPicker = ({ label, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
          placeholder="#000000"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
              value === color ? 'border-blue-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select ${color}`}
          />
        ))}
      </div>
    </div>
  );
};