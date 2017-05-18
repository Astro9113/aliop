import superagent from 'superagent';
// import config from '../config';

import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

// function formatUrl(path) {
//   const adjustedPath = path[0] !== '/' ? '/' + path : path;
//   if (__SERVER__) {
//     // Prepend host and port of the API server to the path.
//     // return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
//     return 'http://192.168.0.51:5000' + adjustedPath;
//   }
//   // Prepend `/api` to relative URL, to proxy to API server.
//   if (path[0] === 'h') return path;
//   return '/api' + adjustedPath;
// }

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](path);

        const spstr = request.url.split('/');

        const urlName = spstr[spstr.length - 1];
        // console.log('spstr', spstr);
        // console.log('request', spstr[spstr.length - 1]);
        if (params) {
          request.query(params);
        }

        if (req && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (urlName === 'cms' || urlName === 'projects' || urlName === 'invests') {
          const possibleToken = cookie.load('token');
          console.log('possibleToken', possibleToken);

          if (possibleToken && possibleToken.length > 0) {
            request.set('Authorization', possibleToken);
          }
        }


          // console.log('request url' + formatUrl(path));
        if (data) {
          request.send(data);
        }

        // request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
        request.end((err, { body, text } = {}) => err ? reject(body || err) : resolve({ body, text}));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
