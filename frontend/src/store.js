import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from './reducers/notesReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userDeleteReducer,
  userListReducer,
  singleUserUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  noteList: noteListReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  userDelete: userDeleteReducer,
  noteUpdate: noteUpdateReducer,
  userUpdate: userUpdateReducer,
  singleUserUpdate: singleUserUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
