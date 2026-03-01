import insane, { type SanitizeOptions } from "insane";
import { parseEmoji } from "./emoji";

const escapeHtml = (unsafe: string) => {
	if (unsafe) return unsafe.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
	return "";
};

const parseMakrdown = (markdown: string) => {
	return (
		markdown
			// New Line
			.replaceAll(/(?:\r\n|\r|\n)/g, "<br />")

			// [Link](https://www.example.com)
			.replaceAll(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 underline" title="$2">$1</a>')

			// __***underline bold italics***__
			.replaceAll(/__\*\*\*(.*?)\*\*\*__/g, '<span class="underline font-bold italic">$1</span>')

			// ***bold italics***
			.replaceAll(/\*\*\*(.*?)\*\*\*/g, '<span class="italic font-bold">$1</span>')

			// __**underline bold**__
			.replaceAll(/__\*\*(.*?)\*\*__/g, '<span class="underline font-bold">$1</span>')

			// __*underline italics*__
			.replaceAll(/__\*(.*?)\*__/g, '<span class="underline italic">$1</span>')

			// **bold**
			.replaceAll(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')

			// __underline__
			.replaceAll(/__(.*?)__/g, '<span class="underline">$1</span>')

			// *italics*
			.replaceAll(/\*(.*?)\*/g, '<span class="italic">$1</span>')

			// _italics_
			.replaceAll(/_(.*?)_/g, '<span class="italic">$1</span>')

			// ~~strikethrough~~
			.replaceAll(/~~(.*?)~~/g, '<span class="line-through">$1</span>')
	);
};

const insaneConfig: SanitizeOptions = {
	allowedAttributes: {
		a: ["href", "class", "target", "title"],
		span: ["class"],
		img: ["class", "dragable", "src", "alt"],
	},
	allowedClasses: {},
	allowedSchemes: ["http", "https"],
	allowedTags: ["br", "a", "span", "img"],
};

export function parseMarkdownToHtml(markdown: string): string {
	const escaped = escapeHtml(markdown);
	const emojiParsed = parseEmoji(escaped);
	const markdownParsed = parseMakrdown(emojiParsed);

	return insane(markdownParsed, insaneConfig);
}
