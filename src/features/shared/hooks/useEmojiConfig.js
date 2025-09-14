import { useState } from "react";
import { FIXED_FONT_SIZE, DEFAULT_ANIMATION_SPEED, FONTS } from "../constants";

export const useEmojiConfig = () => {
	const [config, setConfig] = useState({
		text: "",
		font: FONTS[0].value,
		fontSize: FIXED_FONT_SIZE, // 固定フォントサイズ
		isBold: true, // デフォルトで太字
		textColor: "#000000",
		backgroundColor: "#FFFFFF",
		animationSpeed: DEFAULT_ANIMATION_SPEED,
		letterSpacing: 0,
		addBorder: false,
		borderColor: "#000000",
		borderWidth: 2,
		addShadow: false,
		shadowColor: "#888888",
		shadowBlur: 4,
	});

	const updateConfig = (key, value) => {
		const newConfig = { ...config, [key]: value };
		setConfig(newConfig);
		return newConfig;
	};

	const resetConfig = () => {
		setConfig({
			text: "",
			font: FONTS[0].value,
			fontSize: FIXED_FONT_SIZE, // 固定フォントサイズ
			isBold: true, // デフォルトで太字
			textColor: "#000000",
			backgroundColor: "#FFFFFF",
			animationSpeed: DEFAULT_ANIMATION_SPEED,
			letterSpacing: 0,
			addBorder: false,
			borderColor: "#000000",
			borderWidth: 2,
			addShadow: false,
			shadowColor: "#888888",
			shadowBlur: 4,
		});
	};

	return { config, updateConfig, resetConfig };
};
