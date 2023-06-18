import { useRoutes } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import router from './router';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { currentState } = useSelector((state) => ({ currentState: state.auth }), shallowEqual);

  const isLoggedIn = currentState?.authToken?.user?.role === 'admin' ? true : false;

  const routing = useRoutes(router(isLoggedIn));

  return <>{routing}</>;
}
