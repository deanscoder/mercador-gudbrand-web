import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN

const TELEGRAM = new TelegramBot(token)

export default TELEGRAM