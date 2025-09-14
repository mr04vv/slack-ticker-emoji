import React from 'react';

export const TextInput = ({ value, onChange, maxLength = 20 }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        テキスト入力
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder="絵文字にする文字を入力してください..."
          className="w-full px-3 py-2 bg-gray-100 rounded focus:bg-white transition"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
      {value.length === maxLength && (
        <p className="text-xs text-amber-600">
          最大文字数に達しました
        </p>
      )}
    </div>
  );
};