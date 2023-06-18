// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const storeMenu = configureStore({
  reducer: reducers
});

const { dispatch } = storeMenu;

export { storeMenu, dispatch };
