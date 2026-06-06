import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider, createTheme,  } from '@mantine/core';
import '@mantine/core/styles.css';
import {Provider} from 'react-redux'
import {setupStore} from './store/store'
const myColor = [
  '#eafbee',
  '#dbf2e0',
  '#b9e1c2',
  '#94d0a1',
  '#74c186',
  '#60b874',
  '#54b46a',
  '#449e59',
  '#398d4d',
  '#2a7a3f'
] as const;

const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  primaryShade: 6,
});

const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </Provider>
    </StrictMode>,
)
