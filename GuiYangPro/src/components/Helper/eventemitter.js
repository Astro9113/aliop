const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('an event ouccurred!');
});

myEmitter.on('event2', (a, b) => {
    console.log(a, b);
});

myEmitter.emit('ewwwvent2', 'Astro', 'Hello World');

myEmitter.emit('event');
