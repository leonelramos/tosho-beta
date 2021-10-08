import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/renderer/app';
import { ColorModeScript } from "@chakra-ui/react"
import colorMode from "@/shared/styles/chakra-theme"

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={"dark"} />
    <App />
  </>, 
  document.getElementById('app'));

