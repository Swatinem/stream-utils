/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

export default function drain(ch) {
	while (ch.state === 'readable')
		ch.read();
};

