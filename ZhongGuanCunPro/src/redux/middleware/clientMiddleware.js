export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise
        .then((response) => {
          const { text, body } = response;
          if (!body) {
            if (JSON.parse(text)) {
              return next({...rest, result: JSON.parse(text), type: SUCCESS});
            }
          }
          return next({...rest, result: body, type: SUCCESS});
        })
        .catch((error)=> {
          next({...rest, error, type: FAILURE});
        });

      return actionPromise;
    };
  };
}
