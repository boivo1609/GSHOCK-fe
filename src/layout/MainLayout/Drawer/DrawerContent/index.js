// project import
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useTheme } from '@mui/material/styles';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  return (
    <>
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8F9FA',
            height: '90vh',
            borderRight: `1px dashed ${theme.palette.divider}`
          }
        }}
      >
        <Navigation />
      </SimpleBar>
    </>
  );
};

export default DrawerContent;
