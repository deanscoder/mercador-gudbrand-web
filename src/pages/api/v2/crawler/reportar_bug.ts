import { NextApiRequest, NextApiResponse } from "next";
import REPO from '../../../../HPD/DB/NoSQL/Colecoes'
import DRIVER from "../../../../HPD/driver";

export default async function Reportar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ status: 'ERRO', erro: 'Verbo inválido!' })
  }

  const { autor, bug } = req.body

  if (!autor || !bug) {
    return res.status(400).json({ status: 'ERRO', erro: 'Incompleto!' })
  }

  try {

    DRIVER.COM.TELEGRAM.sendMessage(process.env.TELEGRAM_GUDBRAND_ID,
      `Relatório de BUG.
      por ${autor}
      Relato: ${bug}`)

  } catch (Err) {
    console.log(Err)
  }

  return res.status(200).json({ status: 'REPORTADO' })

}