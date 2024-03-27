import { getIpAddress } from './getIpAddress'

export const getTelegramDebugMessage = async () => {
  const ipAddress = await getIpAddress()
  const message = `
<b>Внимание!</b>
<b>Зафиксировано прохождение финального квеста, кто-то получил ключ-слово!</b>

<i>Немного информации для дебага:</i>
<b>User Agent:</b> <pre><code class="language-useragent">${
    navigator.userAgent
  }</code></pre>

<b>IP Address:</b> ${ipAddress}

<b>Дата и время завершения квеста:</b> ${new Date().toLocaleString('ru-RU')}
  `
  return message
}
