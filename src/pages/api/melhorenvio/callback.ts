import { NextApiRequest, NextApiResponse } from "next";

export default async function MelhorEnvioCallback (
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ok: true})
}