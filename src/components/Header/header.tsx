import format from 'date-fns/format';//format data
import ptBR from 'date-fns/locale/pt-BR';//format data

import styles from './styles.module.scss';

export function Header()  {
  //new Date e uma funcao do js puro que traz a data atual,porem nao conseguimos formata-lo de uma maneira facil,entao usamos a biblioteca para ajudar a formata-la
  const currentDate = format(new Date(), 'EEEEEE, d MMMM',{//retornando a data em tempo real
        locale: ptBR,
  });
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"/>

      <p>O melhor para voce ouvir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );

}