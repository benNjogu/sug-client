import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth';
import applicationReducer from './slices/application';
import nomineeReducer from './slices/nominee';
import cellReducer from './slices/cell';

//slices

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //whitelist: [name of the state that we want to persist],
  //blacklist: [name of reducers that we don't want to persist]
};

const rootReducer = combineReducers({
  auth: authReducer,
  nominee: nomineeReducer,
  application: applicationReducer,
  cell: cellReducer,
});

export { rootPersistConfig, rootReducer };
