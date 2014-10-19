
# Stream utils

These are just some utilities for
[whatwg-streams](https://github.com/whatwg/streams), for example to make things
like csp-style programming easier.

Most of the functions herein are generator functions that yield Promises.
So use them in conjunction with a Promise-supporting coroutine library such as
[awaitable](https://github.com/thenables/awaitable) or
[co](https://github.com/visionmedia/co).

# TODO

* dealing with closed or errored streams
* listen(EventEmitter)
* figure out how to do transducer stuff nicely with these streams

# API

## `take*(ReadableStream) => Any`

This will take a value from the stream. The function will *block* (via Promise)
until a value becomes available, but will fetch a queued value synchronously.

Example:
```js
var val = yield* take(ch);
```

## `select*(Array<ReadableStream>) => [ReadableStream, Any]`

Given an array of streams, this will return the value of the first readable
stream. Note that this will try to read the streams in order.

Example:
```js
var [ch, val] = yield* select([a, b, c]);
if (ch == a) {
		// val came from channel a
} else if (ch == b) {
		// val came from channel b
} // and so on…
```

## `drain(ReadableStream) => void`

This will drain the internal queue of a readable stream.
This is useful if you have an event stream that you want to listen to, but you
are only interested in fresh events, and not old ones from the queue.

Example:
```js
drain(events);
var ev = yield* take(events);
```

## TODO: `listen(EventEmitter, event: String) => ReadableStream`

This will create a `ReadableStream` from the events of an EventEmitter

Example:
```js
var moves = listen(document, 'mousemove');
while (true) {
	var e = yield* take(moves);
}
```

# LICENSE

GPLv3

