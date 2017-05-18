// first func
let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("My First Promise Func Success!");
    }, 500);
});

myPromise1.then((successMessage) => {
    console.log('==>my first promise func<==Yay! Hello World ' + successMessage);
});

// second func
let myPromise2 = new Promise((resolve, reject) => {

    const num = 1;
    if (num > 2) {
        resolve(num);
    } else {
        reject(num);
    }
});

myPromise2.then((num) => {
    console.log('==>my second promise func<== num > 2 :', num);
})
    .catch((num) => {
        console.log('==>my second promise func<== num < 2 :', num);
    });

// third func: promise模块化
const promiseClass = (data) => {
    const myPromise3 = new Promise((resolve, reject) => {
        if (data instanceof Array) {
            resolve(data);
        } else {
            reject(data);
        }
    });

    return myPromise3;
};

const testData1 = [1, 2, 3, 4, 5];
promiseClass(testData1)
    .then(() => {
        console.log('==>my third promise func<== data is Array', testData1);
    })
    .catch(() => {
        console.log('==>my third promise func<== data is not Array', testData1);
    });


// forth func: promise模块化
// const getUrl = (url) => {
//     return new Promise((resolve, reject) => {
//         const req = new XMLHttpRequest();
//         req.open('GET', url, true);
//         req.onload = () => {
//             if (req.status === 200) {
//                 resolve(req.responseText);
//             } else {
//                 reject(new Error(req.statusText));
//             }
//         };
//         req.onerror = () => {
//             reject(new Error(req.statusText));
//         };
//         req.send();
//     })
// };
//
// const theUrl = "http://httpbin.org/get";
// getUrl(theUrl)
//     .then((value) => {
//     console.log('==>my forth promise func<== ', value);
// })
//     .catch((error) => {
//         console.log(error);
//     });


// five func: promise模块化
const taskA = () => {
    console.log('==>my five promise func<== Task A');
    throw new Error(" ==>my five promise func<== throw Error @ Task A");
};

const taskB = () => {
    console.log("==>my five promise func<== Task B");
};

const onRejected = (error) => {
    console.log(error);
};

const finalTask = () => {
    console.log(" ==>my five promise func<== Final Task");
};

const myPromise5 = Promise.resolve();
myPromise5
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);


// six 传参
const dobuleUp = (value) => {
    return value * 2;
};

const increment = (value) => {
    return value + 1;
};

const output = (value) => {
    console.log('==>my six promise func<==', value);
};

const myPromise6 = Promise.resolve(2);
myPromise6
    .then(increment)
    .then(dobuleUp)
    .then(output)
    .catch((error) => {
        console.error(error);
    });

// seven func: promise.all
const timerPromisefy = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(delay)
        }, delay);
    });
};

const startDate = Date.now();
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
])
    .then ((value) => {
        console.log('==>my seven promise func<==', Date.now() - startDate + ' ms');
        console.log('==>my seven promise func<==', value);
    });

// eight func: promise.race
// Promise.all 在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理，
// 与之相对的是 Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
])
    .then((value) => {
        console.log('==>my eight promise func<==', value);
    });



