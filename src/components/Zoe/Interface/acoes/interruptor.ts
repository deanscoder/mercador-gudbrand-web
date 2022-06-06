
export default function interruptor (zona: string) {

  let doc = document.getElementById(`interface__${zona}`) as HTMLLIElement
  let caixa = document.getElementById('interface__op') as HTMLDivElement
  let conteudo = document.getElementById('interface__conteudo') as HTMLTableSectionElement
  
  let filtro = document.getElementById('interface__op_lista')
  let itens = filtro.getElementsByTagName('li')

  //Limpa todos os ativos da lista de itens
  if (itens){
    for (let i = 0; i < itens.length; i ++) {
      if (itens[i])
      if(itens[i].hasAttribute('ativo')) {
        itens[i].removeAttribute('ativo')
      }
    }
  }

  doc.setAttribute('ativo', 'sim')
  caixa.setAttribute('operando', 'sim')
  conteudo.setAttribute('visivel', 'sim')
  return zona

} 
