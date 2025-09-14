import React, { useCallback, useRef, useEffect } from "react";
import { TextInput } from "./features/text-input";
import {
	ColorPicker,
	FontSelector,
	SpeedControl,
	TextEffects,
	LetterSpacingControl,
} from "./features/style-controls";
import { GifPreview } from "./features/preview";
import { useGifGenerator } from "./features/gif-generator";
import { useEmojiConfig } from "./features/shared/hooks/useEmojiConfig";

function App() {
	const { config, updateConfig, resetConfig } = useEmojiConfig();
	const {
		isGenerating,
		progress,
		gifUrl,
		error,
		generateGif,
		downloadGif,
		resetGif,
	} = useGifGenerator();
	const timeoutRef = useRef();

	// デバウンス付きでGIF生成
	const generateWithDebounce = useCallback(
		(config) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			const text = config.text;
			timeoutRef.current = setTimeout(() => {
				if (text?.trim()) {
					generateGif({ ...config, text });
				} else {
					resetGif();
				}
			}, 500); // 300msに短縮
		},
		[generateGif, resetGif],
	);

	const generateImmediately = useCallback(
		(config) => {
			generateGif({ ...config });
		},
		[generateGif],
	);

	// 設定変更ハンドラー
	const handleConfigChange = useCallback(
		(key, value) => {
			const newConfig = updateConfig(key, value);
			generateImmediately(newConfig);
		},
		[updateConfig, generateImmediately],
	);

	// テキスト変更ハンドラー
	const handleTextChange = useCallback(
		(value) => {
			const newConfig = updateConfig("text", value);
			generateWithDebounce(newConfig);
		},
		[updateConfig, generateWithDebounce],
	);

	const handleReset = () => {
		resetConfig();
		resetGif();
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-6 py-8 max-w-6xl">
				<header className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						流れる文字のSlack絵文字ジェネレーター
					</h1>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="space-y-6">
						<div className="bg-white rounded-lg p-6 space-y-6">
							<TextInput value={config.text} onChange={handleTextChange} />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ColorPicker
									label="文字色"
									value={config.textColor}
									onChange={(value) => handleConfigChange("textColor", value)}
								/>
								<ColorPicker
									label="背景色"
									value={config.backgroundColor}
									onChange={(value) =>
										handleConfigChange("backgroundColor", value)
									}
								/>
							</div>

							<FontSelector
								value={config.font}
								onChange={(value) => handleConfigChange("font", value)}
							/>

							<SpeedControl
								value={config.animationSpeed}
								onChange={(value) =>
									handleConfigChange("animationSpeed", value)
								}
							/>

							<LetterSpacingControl
								value={config.letterSpacing}
								onChange={(value) => handleConfigChange("letterSpacing", value)}
							/>

							<TextEffects config={config} updateConfig={handleConfigChange} />

							{error && (
								<div className="p-3 bg-red-50 text-red-700 rounded text-sm">
									{error}
								</div>
							)}
						</div>
					</div>

					<div className="space-y-6">
						<div className="bg-white rounded-lg p-6">
							<div className="space-y-6">
								<div className="flex items-center space-x-3">
									<span className="text-xl">👀</span>
									<h3 className="text-xl font-bold text-gray-800">
										プレビュー
									</h3>
								</div>

								{isGenerating ? (
									<div className="flex flex-col items-center justify-center py-8">
										<div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
										<p className="text-sm text-gray-600 mb-2">GIF生成中...</p>
										<div className="w-full max-w-xs bg-gray-200 rounded h-2">
											<div
												className="h-full bg-blue-600 rounded transition-all duration-500"
												style={{ width: `${progress}%` }}
											/>
										</div>
										<p className="text-xs text-gray-500 mt-2">
											{Math.round(progress)}% 完了
										</p>
									</div>
								) : gifUrl ? (
									<GifPreview
										gifUrl={gifUrl}
										onDownload={() =>
											downloadGif(`slack-emoji-${config.text}.gif`)
										}
										showTitle={false}
									/>
								) : (
									<div className="flex items-center justify-center py-12 text-gray-400">
										<p>テキストを入力するとプレビューが表示されます</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
