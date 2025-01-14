
import { AppProvider, type Navigation } from '@toolpad/core'
import { Outlet } from 'react-router'
import { Groups, Person } from '@mui/icons-material'
import eduLogo from './assets/img-edu.png';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'professores',
    title: 'Professores',
    icon: <Person />,
  },
  {
    segment: 'turmas',
    title: 'Turmas de Formação',
    icon: <Groups />
  }
];

const BRANDING = {
  title: 'Controle de Frequencia',
  homeUrl: '/',
  logo: <img src={eduLogo} alt='Educação que transforma logo' />,
};

function App() {

  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
      
  )
}

export default App
