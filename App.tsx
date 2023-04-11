import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme/index';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';
import { Routes } from './src/routes/';

export default function App() {

  const[ fontsLoaded ] = useFonts({Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={ theme }>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent //diz que a aplicação começa do topo do celular ao invez da barra de menu
      />
      { fontsLoaded ? <Routes/> : <Loading/> }
    </ThemeProvider>
  );
}