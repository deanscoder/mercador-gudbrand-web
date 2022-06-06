import { FormEvent, useEffect, useState } from 'react'
import * as css from './styles'
import Link from 'next/link'
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import * as JsSearch from 'js-search';
import { CategoriaProduto } from '../../../pages/api/cpd/interfaces/Artigo/woo_product';
import { v4 as uuid } from 'uuid'
import bosons from '../../../HPD/ALIAS/bosons';

const Search = (): JSX.Element => {
  const { t, i18n } = useTranslation('common');

  const [show_dropdown, __show_dropdown] = useState(false)
  const [pre_query, __pre_query] = useState('')
  const [query, __query] = useState('')
  const [suggestions, __suggestions] = useState([] as Array<CategoriaProduto>)
  const [suggestions_filtered, __suggestions_filtered] = useState(
    [] as Array<CategoriaProduto>
  )

  var search = new JsSearch.Search('id')
  search.addIndex('name')
  search.addIndex('slug')

  search.addDocuments(suggestions)

  const Router = useRouter()


  // A TOGGLE CONTROL FOR TELL
  // STYLED COMPONENTS WHEN PAINT
  // THIS DIV
  const [focused, setF] = useState(false)

  function handle_with_input(value: boolean): void {
    setF(value)

    // WE'LL VERIFY IF THE VALUE IS TRUE
    // AND MAKE A FAKE LOAD TO SIMULATE
    // THE TIME OF REQUEST (AXIOS FOR EXAMPLE)
    // AT THE FIRST TIME ONLY
    if (value) {

      __show_dropdown(value)

    } else {
      /* setTimeout(() =>
        __show_dropdown(value)
        , 5000) */

    }
  }

  async function get_sugestions() {
    const { data: resposta } = await bosons({
      method: 'get',
      url: '/merch/sugestoes_de_tags_para_pesquisa'
    })

    if (resposta) {
      if (resposta.sugestoes && !!resposta.sugestoes.length) {
        __suggestions(resposta.sugestoes)
      } else {
        __suggestions(suggestions)
      }
    }

  }

  function deactivate_focus(): void {
    let input = document.querySelector('#super-search-gudbrand') as HTMLInputElement
    if (input) {

      input.blur()

    }
  }

  function handle_dropdown(q: string): void {
    let input = document.querySelector('#super-search-gudbrand') as HTMLInputElement

    if (input) {
      input.value = q
      let value = input.value

      Router.push('/zona/' + value).then(() => window.location.reload())
      __show_dropdown(false)
    }
  }

  function handle_submit(e: FormEvent): void {
    e.preventDefault()

    let input = document.querySelector('#super-search-gudbrand') as HTMLInputElement

    if (input) {
      let value = input.value

      if (value.length > 3) {

        const params = new URLSearchParams({ p: encodeURIComponent(value) })

        Router.push('/procurar?' + params)
        __show_dropdown(false)
      } else {

        alert('Type more than 3 letters to search')

      }

    }
  }

  useEffect(() => {
    get_sugestions()
  }, [])

  useEffect(() => {
    console.log('LOG: ', query)
  }, [query])

  useEffect(() => {
    if (pre_query && pre_query.length > 2) {
      __suggestions_filtered(search.search(pre_query))
    } else {
      __suggestions_filtered([])
    }
  }, [pre_query])
  return (
    <css.Search id="top-head-search" focus={focused ? 'true' : 'false'}>

      <svg
        width="18"
        height="18"
        viewBox="0 0 14 14"
      >
        <path
          d="M1.676 5.7c0-2.2 1.873-4 4.042-4 2.268 0 4.043 1.8 4.043 4s-1.775 
            4-4.043 4c-2.169 0-4.042-1.8-4.042-4zm11.732 6.4L10.352 9c.69-.9 1.085-2.1 
            1.085-3.3 0-3.1-2.564-5.7-5.719-5.7C2.563 0 0 2.6 0 5.7s2.563 
            5.7 5.718 5.7c1.085 0 2.17-.4 3.057-.9l3.253 3.2c.197.2.493.3.789.3.296 
            0 .591-.1.789-.3.197-.2.394-.5.394-.8 0-.3-.296-.5-.592-.8z">
        </path>
      </svg>

      <form onSubmit={handle_submit}>

        <input
          type="text"
          placeholder={t('search_placeholder')}
          onFocus={() => handle_with_input(true)}
          onBlur={() => handle_with_input(false)}
          onMouseEnter={() => __show_dropdown(true)}
          id="super-search-gudbrand"
          autoComplete='off'
          onChange={(e) => __pre_query(e.target.value)}
        >

        </input>
      </form>
      {show_dropdown && suggestions_filtered && !!suggestions_filtered.length &&

        <ul className="search-list"
          onMouseLeave={() => __show_dropdown(false)}
          onMouseEnter={deactivate_focus}
        >

          <section>
            <h3>{t('tags_you_follow')}</h3>
          </section>

          {suggestions_filtered.length && suggestions_filtered.slice(0, 12).map(o =>
            <li key={o.id + '_' + uuid()}
              onClick={() => handle_dropdown(o.slug)}
            >

              <css.Search_Thumbnail image={o.image ? o.image.src : ''} />

              <span>
                {o.name}
              </span>

            </li>
          )
          }
        </ul>
      }

    </css.Search>
  )
}

export default Search
