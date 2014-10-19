/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

export default function* take(ch) {
	while (ch.state === 'waiting')
		yield ch.wait();

	return ch.read();
};

