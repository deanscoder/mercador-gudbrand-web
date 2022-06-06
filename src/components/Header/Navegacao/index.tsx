import * as css from './styles'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function Navegacao ({nome}) {
  const Router = useRouter()
  return (
    <css.Container>
      <Head>
        <title>{nome} - Gudbrand Merch</title>
      </Head>
      <div id="back-button" onClick={() => Router.back()}><AiOutlineArrowLeft /></div>
      <div><h1>{nome}</h1></div>
    </css.Container>
  )
}