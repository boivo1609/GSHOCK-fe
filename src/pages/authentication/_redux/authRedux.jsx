import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { put, takeLatest } from 'redux-saga/effects';

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action'
};

const initialAuthState = {
  authToken: undefined
};

export const reducer = persistReducer({ storage, key: 'v726-demo1-auth', whitelist: ['authToken'] }, (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.Login: {
      const { authToken } = action.payload;
      return {
        authToken: authToken
      };
    }

    case actionTypes.Register: {
      const { authToken } = action.payload;

      return { authToken, user: undefined };
    }
    case actionTypes.Logout: {
      // TODO: Change this code. Actions in reducer aren't allowed.
      return initialAuthState;
    }

    default:
      return state;
  }
});

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user }
  })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });
}
