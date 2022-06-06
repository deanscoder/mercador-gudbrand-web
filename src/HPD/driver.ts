import REPO from "./DB/NoSQL/Colecoes"
import MAIL from './COM/Mail'
import TELEGRAM from './COM/Telegram'

const DRIVER = {
  BD: REPO,
  COM: { MAIL, TELEGRAM }
}

export default DRIVER