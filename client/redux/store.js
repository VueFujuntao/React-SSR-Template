import {
  createStore,
  applyMiddleware
} from 'redux';
import reducer from './index';
import thunk from 'redux-thunk';



const configureStore = (initState = {}) => createStore(reducer,initState, applyMiddleware(thunk));

export default configureStore;