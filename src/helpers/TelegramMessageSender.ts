import axios, { AxiosError } from 'axios'

export const TelegramMessageSender = async (
  message: string | undefined | unknown,
  photoUrl?: string
) => {
  const token = import.meta.env.VITE_TELEGRAM_API_KEY
  const chatId = import.meta.env.VITE_DEBUG_GROUP_ID
    ? import.meta.env.VITE_DEBUG_GROUP_ID
    : import.meta.env.VITE_TELEGRAM_GROUP_ID
  const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`
  const sendPhotoUrl = `https://api.telegram.org/bot${token}/sendDocument`

  try {
    if (photoUrl) {
      const photoResponse = await axios.post(sendPhotoUrl, {
        chat_id: chatId,
        document: photoUrl,
      })
      console.log(photoResponse.data)
    }

    const messageResponse = await axios.post(sendMessageUrl, {
      chat_id: chatId,
      text: message ? message : '',
      parse_mode: 'HTML',
    })

    console.log(messageResponse.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
  }
}
