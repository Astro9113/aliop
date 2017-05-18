// const EventEmitter = require('events');
//
// const myEmitter = new EventEmitter();
// myEmitter.on('event', function(a, b) {
//     console.log(a, b, this);
//     // Prints:
//     //   a b MyEmitter {
//     //     domain: null,
//     //     _events: { event: [Function] },
//     //     _eventsCount: 1,
//     //     _maxListeners: undefined }
// });
//
// for (const ll of [1, 2 , 3]) {
//     if (ll === 2) {
//         console.log('ll === 2 ? => ', ll);
//         myEmitter.emit('event', 'a', 'b');
//     } else {
//         console.log('ll !== 2 ? => ', ll);
//     }
// }

console.log(parseInt(89 / 10, 0));

console.log(89 % 10);



const tt = {1: '1', 2: '', 3:'', 4: ''};
const ttLength = [];
for (let aa in tt) {
    console.log('a', tt[aa].length);
    if (tt[aa].length !== 0) {
        ttLength.push(aa);
    }
}
console.log('ttLength', ttLength.length);