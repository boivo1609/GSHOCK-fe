import Routes from 'routes';
import ThemeCustomization from 'themes';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'pages/Root/Loading';
import AuthInit from 'pages/authentication/_redux/AuthInit';
import { SnackbarProvider } from 'notistack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
const App = ({ store, persistor }) => {
  return (
    <ThemeCustomization>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <React.Suspense fallback={<Loading />}>
            <Loading />
            <ToastContainer autoClose={2000} pauseOnFocusLoss={false} draggable pauseOnHover={false} />
            <SnackbarProvider
              autoHideDuration={3000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              iconVariant={{
                info: <InfoIcon />,
                success: <CheckCircleIcon />,
                warning: <WarningAmberIcon />,
                error: <ErrorIcon />
              }}
            >
              <AuthInit>
                <Routes />
              </AuthInit>
            </SnackbarProvider>
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ThemeCustomization>
  );
};

export default App;
