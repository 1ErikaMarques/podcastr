import React from 'react';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { Header } from '../components/Header/header';
import { Player } from '../components/Player/player';

//app e um arquivo global sempre vai ficar envolta de todos os meus apps
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} /> {/*o componente e a index*/}
      </main>
      <Player />
    </div>
  )
}

export default MyApp//sempre que algo se repetir em todas as pag eu ponho aqui no app porem ele e chamado todas as vezes por isso customizamos as coisas no _document
