const METHOD_GET = 1;
const METHOD_POST = 2;

export default function sendHttpRequest(args, method, result, errorResult, delay, url) {
  console.log('arguments ', arguments);
  // const XHR = createXHR();
  let sendMethod = 'GET';
  switch (method) {
    case METHOD_GET:
      sendMethod = 'GET';
      break;
    case METHOD_POST:
      sendMethod = 'POST';
      break;
    default:
      return null;
  }

  let relayUrl = 'http://localhost:8344'; // __RELAY_URL__;

  if (typeof (url) !== 'undefined') {
    relayUrl = url;
  }

  const promise = new Promise(function NoName(resolve, reject) {
    setTimeout(() => {
      const XHR = new XMLHttpRequest();
      console.log('XHR', XHR);
      XHR.open(sendMethod, relayUrl, true);
      XHR.send(args);
      XHR.addEventListener('readystatechange', function NoName2() {
        switch (XHR.readyState) {
          // console.log('请求未初始化');
          case 0:
            console.log('请求启动，尚未发送');
            break;
          case 1:
            console.log('请求发送，尚未得到响应');
            break;
          case 2:
            console.log('请求开始响应，收到部分数据');
            break;
          case 3:
            console.log('请求响应完成得到全部数据');
            break;
          case 4:
            if (XHR.status === 200) {
              try {
                if (__DEVELOPMENT__) console.log('XHR.responseText=' + XHR.responseText);
                const data = JSON.parse(XHR.responseText);
                resolve(data);
              } catch (err) {
                reject(err);
              }
            }
            break;
          default:
            break;
        }
      });
      XHR.addEventListener('error', function NoName3(error) {
        reject(error);
      });
    }, delay);
  });

  promise.then(result).catch(errorResult);

  return promise;
}
