import React from 'react';
import { FONTS } from '../../shared/constants';

export const FontSelector = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        フォント
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 rounded-md focus:bg-white transition"
      >
        {FONTS.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
};