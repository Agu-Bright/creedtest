import { Link } from "react-router-dom";

export function linkUsernames(text) {
	const regex = /@(\w+)/g;
	const elements = [];
	let lastIndex = 0;

	text.replace(regex, (match, username, offset) => {
		// Push the text before the matched username
		elements.push(
			<span key={lastIndex++}>{text.substring(lastIndex, offset)}</span>
		);

		// Assuming you have a function to generate profile links
		const profileLink = `/profile/${username}/posts`;

		// Push the username as a Link component
		elements.push(
			<Link
				style={{ color: "rgb(218 165 32)" }}
				to={profileLink}
				key={lastIndex++}
			>
				@{username}
			</Link>
		);

		// Update lastIndex to the end of the match
		lastIndex = offset + match.length;

		return match; // Return the match itself (no change)
	});

	// Push any remaining text
	elements.push(<span key={lastIndex++}>{text.substring(lastIndex)}</span>);

	return elements;
}
