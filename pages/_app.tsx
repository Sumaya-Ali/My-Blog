import  { AppProps } from 'next/app'
//import {wrapper} from "../redux/store"

//import 'tailwindcss/tailwind.css'
import  '../styles/globals.css'

import store from '../redux/store';
import {Provider} from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  return  <Provider  store={store}> <Component {...pageProps} /> </Provider>
}

//export default wrapper.withRedux(MyApp);

export default MyApp