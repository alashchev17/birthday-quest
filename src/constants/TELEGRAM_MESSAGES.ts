import { getIpAddress } from '../helpers/getIpAddress'

export const TELEGRAM_MESSAGE_DEBUG = `
<b>Внимание!</b>
<b>Зафиксировано прохождение финального квеста, кто-то получил ключ-слово!</b>

<i>Немного информации для дебага:</i>
<b>User Agent:</b> <pre><code class="language-useragent">${
  navigator.userAgent
}</code></pre>

<b>IP Address:</b> ${await getIpAddress()}

<b>Дата и время завершения квеста:</b> ${new Date().toLocaleString('ru-RU')}
`

export const TELEGRAM_MESSAGE_PRODUCTION = `
<b>Внимание!</b>
<b>Зафиксировано прохождение финального квеста, кто-то получил ключ-слово!</b>

<b>Дата и время завершения квеста:</b> ${new Date().toLocaleString('ru-RU')}
`
