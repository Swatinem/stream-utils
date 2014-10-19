/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

export default function* select(chs) {
	while (true) {
		// first, try if one of the streams has a queued value
		for (var i = 0; i < chs.length; i++) {
			var ch = chs[i];
			if (ch.state === 'readable')
				return [ch, ch.read()];
		}
		// otherwise, wait on either of them
		yield Promise.race(chs.map(ch => ch.wait()));
	}
};

