import { createStore,applyMiddleware,compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import createMemoryHistory from 'history/createMemoryHistory';

const getCreateStore = (ctx, reducer) =>{
  const initialState = {};
  const path = ctx.req.url;
  const history = createMemoryHistory({ initialEntries: [path] });
  const middleware = [thunk,routerMiddleware(history)];
  const composedEnhancers = compose(applyMiddleware(...middleware));
  const  store = createStore(reducer, initialState, composedEnhancers);
  return {history,store};
}
export default getCreateStore;