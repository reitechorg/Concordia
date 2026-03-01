import twemoji from "@discordapp/twemoji";
import emojiOrdering from "../components/emoji/emojiOrdering.json";

export type EmojiMetadata = {
	base: number[];
	alternates: number[][];
	emoticons: string[];
	shortcodes: string[];
	animated: boolean;
	directional?: boolean;
};

const twemojiOptions = {
	base: "/emoji",
	ext: ".svg",
	size: "/svg",
	className: "w-5 h-5 inline",
};

export const parseEmoji = (text: string) => {
	return twemoji.parse(text, twemojiOptions);
};

const codepointRedirects: Record<string, string> = {
	"23-fe0f-20e3": "23-20e3",
	"2a-fe0f-20e3": "2a-20e3",
	"30-fe0f-20e3": "30-20e3",
	"31-fe0f-20e3": "31-20e3",
	"32-fe0f-20e3": "32-20e3",
	"33-fe0f-20e3": "33-20e3",
	"34-fe0f-20e3": "34-20e3",
	"35-fe0f-20e3": "35-20e3",
	"36-fe0f-20e3": "36-20e3",
	"37-fe0f-20e3": "37-20e3",
	"38-fe0f-20e3": "38-20e3",
	"39-fe0f-20e3": "39-20e3",
	"1f441-fe0f-200d-1f5e8-fe0f": "1f441-200d-1f5e8",
};

export const hexCodepointFromDecRaw = (codePoints: number[]) => codePoints.map((point) => point.toString(16)).join("-");
export const emojiFromDecCodepoint = (codePoints: number[]) => codePoints.map((point) => String.fromCodePoint(point)).join("");

export const hexCodepointFromDec = (codePoints: number[]) => {
	codePoints = [...codePoints];
	const last = codePoints[codePoints.length - 1];
	if (codePoints.length === 2 && (last === 0xfe0f || last === 0xff0e)) codePoints.pop();
	const hexCodepoint = hexCodepointFromDecRaw(codePoints);

	const redirectedCodepoint = codepointRedirects[hexCodepoint] || hexCodepoint;
	return redirectedCodepoint;
};
export const getEmojiFromCodepoint = (codepoint: string) => twemoji.convert.fromCodePoint(codepoint);
export const getCodepointFromEmoji = (emoji: string) => twemoji.convert.toCodePoint(emoji);
export const getEmojiUrlFromCodepoint = (codepoint: string) => `/emoji/svg/${codepoint}.svg`;
export const getEmojiUrl = (emoji: string) => getEmojiFromCodepoint(getCodepointFromEmoji(emoji));

const emojiCahce = new Map<string, string>();
async function prefetchEmoji(codepoint: string) {
	if (emojiCahce.has(codepoint)) return;
	const url = getEmojiUrlFromCodepoint(codepoint);
	const response = await fetch(url);
	const code = await response.text();
	emojiCahce.set(codepoint, code);
}

export const getEmojiSvgFromCodepoint = async (codepoint: string) => {
	await prefetchEmoji(codepoint);
	return emojiCahce.get(codepoint);
};
export const getEmojiSvg = (emoji: string) => getEmojiUrlFromCodepoint(getCodepointFromEmoji(emoji));
