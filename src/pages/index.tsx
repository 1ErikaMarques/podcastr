// 3 FORMAS DE CONSUMIR UM API

 /*   // SPA

   funcao do react, quando algo mudar na minha aplicaçao eu quero que algo aconteça
   toda a vez que essa variavel que esta dentro do array mudar a funcao sera executada
   se o array tiver vazia essa funcao sera executada somente uma vez
   aplicaçao corporativa

  useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(information => console.log(information))


  }, [] )  obs: quando o js esta desativado, ele nao vai trazer os dados do backend*/

   /*  // SSR

   tem que usar next
   colar essa funcao em qualquer page
   nao precisa fazer nenhuma requisiçao pro backend, os dados sao carregados no net
   toda vez que e acessado busca os dados na API
   para pag que mudam de conteudo toda hr

   export default function Home(props) {
 
    return ()
  }
  
export async function getServerSideProps(){
   const response = await fetch ('http://localhost:3333/episodes')
   const dados = await response.json() 

   return {
     props: {
       episodes: dados,
     }
   }
}*/

// SSG
/* 
so faz a requisiçao para a API uma vez
sendo vantajoso para pag que n precisar atualizar o conteudo varias vezes ao dia
so funciona em produçao

*/ 

import {GetStaticProps} from 'next';//tipagem dos parametros e do return
import { api } from '../services/api';
import {format, parseISO} from 'date-fns';

type Episode = {  // tipagem
    id: string;
    title: string;
    members:string;
  }

type HomeProps = {  // criamos esse para ficar mais organizado
  episodes: Array<Episode>// ou Episode[]
  
}
export default function Home(props: HomeProps) {
 
  return (
    <div> 
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
      </div>
  
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const {data} = await api.get('episodes',{
    params: {
      _limit: 12,//limite de epi
      _sort: 'published_at',//agrupar de acordo com a data
      order: 'desc' // ordem descrescente
    }
  })
   const episodes = data.map(episode =>{
     return {
       id: episode.id,
       title: episode.title,
       thumbnail: episode.thumbnail,
       members: episode.members,
       published_at: parseISO(episode.published_at),
     }
   })


  return {
    props: {
      episodes: data,//dados
    },
    //a cada 8 hrs a pag vai atualizar seu conteudo 
    revalidate: 60 * 60 * 8, //conta para converter hrs em segundos 
  }
}
