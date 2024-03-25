import { useState } from 'react'
import { DEVICE_WIDTH } from '../../../constants/DEVICE_WIDTH'
import { Typography, Button, Modal } from 'antd'
import {
  CopyOutlined,
  FlagFilled,
  GoldFilled,
  RocketFilled,
  WarningFilled,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { QUESTS_DATA } from '../../../constants/QUESTS_DATA'
import { TelegramMessageSender } from '../../../helpers/TelegramMessageSender'

export const ThirdQuest = () => {
  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(false)
  const [isQuestStarted, setIsQuestStarted] = useState(false)

  const getIpAddress = async () => {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  }

  const startNewQuest = async () => {
    // Достаём из локального хранилища список активированных квестов
    const activatedQuests: string[] = JSON.parse(
      localStorage.getItem('activatedQuests') || '[]'
    )
    if (activatedQuests.length < 3) {
      // Если не все квесты пройдены, значит отображаем ошибку и не даём пользователю начать новый квест
      Modal.error({
        width: 500,
        title: 'Финальное задание недоступно',
        centered: true,
        icon: <WarningFilled style={{ color: '#A7377E' }} />,
        styles: {
          content: {
            backgroundColor: '#DA9DAA',
            color: '#2E2E38',
          },
        },
        content: (
          <>
            <Typography.Paragraph>
              Квесты идут последовательно, а это значит, что нельзя взять и
              перескочить какой-то из этапов квеста, я ведь старался {' :('}
            </Typography.Paragraph>
            <Typography.Paragraph>
              По нажатию на кнопку ниже, ты перейдёшь на главную страничку. Если
              ты уже прошла какой-то квест – убедись, что ты нажала кнопку
              просмотра геолокации, как сейчас. Если что-то пошло не по плану –
              ты всегда знаешь, к кому обратиться{' :)'}
            </Typography.Paragraph>
          </>
        ),
        footer: (
          <Button
            type="primary"
            onClick={() => {
              Modal.destroyAll()
              navigate('/', { replace: true })
            }}
            style={{
              backgroundColor: '#A7377E',
              display: 'block',
              marginLeft: 'auto',
              marginTop: '15px',
            }}
          >
            Хорошо
          </Button>
        ),
      })
      return
    } else if (!activatedQuests.includes('secondQuest')) {
      // Если квест "secondQuest" не активирован, уведомляем человека о том, что данный квест ещё недоступен
      Modal.error({
        width: 500,
        title: 'Финальное задание недоступно',
        centered: true,
        icon: <RocketFilled style={{ color: '#A7377E' }} />,
        styles: {
          content: {
            backgroundColor: '#DA9DAA',
            color: '#2E2E38',
          },
        },
        content: (
          <Typography.Paragraph>
            Для начала нужно выполнить задание в третьем квесте, потом
            возвращаться сюда!
          </Typography.Paragraph>
        ),
        footer: (
          <Button
            type="primary"
            onClick={() => {
              Modal.destroyAll()
              navigate('/', { replace: true })
            }}
            style={{
              backgroundColor: '#A7377E',
              display: 'block',
              marginLeft: 'auto',
              marginTop: '15px',
            }}
          >
            Хорошо
          </Button>
        ),
      })
      return
    }
    const message = `
<b>Внимание!</b>
<b>Зафиксировано прохождение финального квеста, кто-то получил ключ-слово!</b>

<i>Немного информации для дебага:</i>
<b>User Agent:</b> <pre><code class="language-useragent">${
      navigator.userAgent
    }</code></pre>

<b>IP Address:</b> ${await getIpAddress()}

<b>Дата и время завершения квеста:</b> ${new Date().toLocaleString('ru-RU')}
    `

    // Отсылаем сообщение в телеграм группу о том, что квест был завершён:
    await TelegramMessageSender(message, 'https://imgur.com/nCb0onR.gif')

    localStorage.setItem(
      'activatedQuests',
      JSON.stringify([...activatedQuests, 'thirdQuest'])
    )

    Modal.info({
      width: 500,
      title: 'Квест пройден!',
      centered: true,
      icon: <FlagFilled style={{ color: '#A7377E' }} />,
      styles: {
        content: {
          backgroundColor: '#DA9DAA',
          color: '#2E2E38',
        },
      },

      footer: (
        <Button
          type="primary"
          onClick={() => Modal.destroyAll()}
          style={{
            backgroundColor: '#A7377E',
            display: 'block',
            marginLeft: 'auto',
            marginTop: '15px',
          }}
        >
          Ура!
        </Button>
      ),
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography.Paragraph style={{ margin: 0 }}>
            Финальный квест успешно пройден! Поздравляю с тем, что дошла до
            конца!
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0 }}>
            Для получения главного приза квеста, обратись к Андрею или к Насте,
            сказав фразу:{' '}
            <Typography.Text
              copyable={{
                text: QUESTS_DATA[3].pass?.toString(),
                tooltips: [
                  'Нажми, чтобы скопировать ключ-слово!',
                  'Скопировано в буфер обмена',
                ],
                icon: <CopyOutlined style={{ color: '#DA9DAA' }} />,
              }}
              style={{
                marginTop: '15px',
                display: 'inline-block',
                color: '#ffffff',
                backgroundColor: '#A7377E',
                borderRadius: 5,
                fontWeight: 700,
                padding: '3px 5px',
              }}
            >
              "Ребята, ключ-слово – {QUESTS_DATA[3].pass?.toString()}"
            </Typography.Text>
          </Typography.Paragraph>
        </div>
      ),
    })
  }

  const completeQuest = () => {
    setIsCompleted(true)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: DEVICE_WIDTH < 768 ? '100vw' : 'auto',
        padding: '0 20px',
        textAlign: 'center',
        gap: '20px',
        backgroundColor: '#DA9DAA',
        color: '#2E2E38',
      }}
    >
      <Typography.Title
        level={DEVICE_WIDTH < 768 ? 3 : 1}
        style={{ margin: 0, maxWidth: DEVICE_WIDTH < 768 ? 'unset' : '550px' }}
      >
        А вот и финальный этап&nbsp;квеста!
      </Typography.Title>
      <Typography.Paragraph
        style={{
          margin: 0,
          fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px',
          maxWidth: DEVICE_WIDTH < 768 ? 'unset' : '550px',
        }}
      >
        Наше приключение вот-вот закончится, ты в шаге от разгадки!
      </Typography.Paragraph>
      <Typography.Paragraph
        style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}
      >
        {isCompleted
          ? 'Нажимай кнопку снизу, чтобы узнать условия завершения квеста!'
          : 'Жми кнопку, чтобы начать финальное задание :)'}
      </Typography.Paragraph>
      {!isQuestStarted && !isCompleted && (
        <Button
          type="primary"
          size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
          style={{
            padding: '15px 20px',
            height: 'unset',
            fontWeight: 600,
          }}
          onClick={() => {
            setIsQuestStarted((prev) => !prev)
          }}
          icon={<RocketFilled />}
        >
          Начать финальное задание
        </Button>
      )}
      {isQuestStarted && !isCompleted && (
        <div onClick={completeQuest}>TODO QUEST</div>
      )}{' '}
      {/* TODO */}
      {isCompleted && (
        <Button
          type="primary"
          size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
          style={{
            padding: '15px 20px',
            height: 'unset',
            fontWeight: 600,
          }}
          onClick={startNewQuest}
          icon={<GoldFilled />}
        >
          Завершить квест
        </Button>
      )}
    </div>
  )
}
