
export default function _calcular_dimensao(
  lista_de_dimensoes: Array<DIMENSOES>
): number {

  let volume = 0, metrica = 0
  for (var i = 0; i < lista_de_dimensoes.length; i++) {

    volume += (
      parseInt(
        lista_de_dimensoes[i].height) *
      parseInt(lista_de_dimensoes[i].length) *
      parseInt(lista_de_dimensoes[i].width)
    )

  }
  metrica = Math.pow(volume, 1 / 3)

  return metrica
}

interface DIMENSOES {
  width: string
  height: string
  length: string
}