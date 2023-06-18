import React, { useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, connect, useDispatch } from 'react-redux';
import * as auth from './authRedux';
import Loading from 'pages/Root/Loading';

function AuthInit(props) {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken
    }),
    shallowEqual
  );
  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          dispatch(props.login(authToken));
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (authToken) {
      requestUser();
    } else {
      dispatch(props.login(undefined));
      setShowSplashScreen(false);
    }
  }, [authToken, dispatch, props]);

  return showSplashScreen ? <Loading /> : <>{props.children}</>;
}

export default connect(null, auth.actions)(AuthInit);
