import { useState } from 'react'
import { DEVICE_WIDTH } from '@/constants/DEVICE_WIDTH'
import { Typography, Button, Modal, message, Form, Flex, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { CopyOutlined, FlagFilled, GoldFilled, RocketFilled, SendOutlined, WarningFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { QUESTS_DATA } from '@/constants/QUESTS_DATA'
import { TelegramMessageSender } from '@/helpers/TelegramMessageSender'
import { TELEGRAM_MESSAGE_PRODUCTION } from '@/constants/TELEGRAM_MESSAGES'
import { getTelegramDebugMessage } from '@/helpers/getTelegramDebugMessage'
import quizImage from '@/assets/thirdQuestQuiz.jpg'
import { ImageComponent } from '@/components/ImageComponent'

export const ThirdQuest = () => {
  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(false)
  const [isQuestStarted, setIsQuestStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorCounter, setErrorCounter] = useState(0)
  const [form] = useForm()

  const showPassCode = (activatedQuests: string[]) => {
    if (!activatedQuests.includes('thirdQuest')) {
      localStorage.setItem('activatedQuests', JSON.stringify([...activatedQuests, 'thirdQuest']))
    }

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
            Финальный квест успешно пройден! Поздравляю с тем, что дошла до конца!
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0 }}>
            Для получения главного приза квеста, обратись к Андрею или к Насте, сказав фразу:{' '}
            <Typography.Text
              copyable={{
                text: QUESTS_DATA[3].pass?.toString(),
                tooltips: ['Нажми, чтобы скопировать ключ-слово!', 'Скопировано в буфер обмена'],
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

  const startNewQuest = async () => {
    if (isError) {
      setIsError(false)
    }

    // Достаём из локального хранилища список активированных квестов
    const activatedQuests: string[] = JSON.parse(localStorage.getItem('activatedQuests') || '[]')
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
              Квесты идут последовательно, а это значит, что нельзя взять и перескочить какой-то из этапов квеста, я ведь старался {' :('}
            </Typography.Paragraph>
            <Typography.Paragraph>
              По нажатию на кнопку ниже, ты перейдёшь на главную страничку. Если ты уже прошла какой-то квест – убедись, что ты нажала
              кнопку просмотра геолокации, как сейчас. Если что-то пошло не по плану – ты всегда знаешь, к кому обратиться{' :)'}
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
        content: <Typography.Paragraph>Для начала нужно выполнить задание в третьем квесте, потом возвращаться сюда!</Typography.Paragraph>,
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

    // Отсылаем сообщение в телеграм группу о том, что квест был завершён:
    setIsLoading(true)
    await TelegramMessageSender(
      import.meta.env.VITE_DEBUG_GROUP_ID ? await getTelegramDebugMessage() : TELEGRAM_MESSAGE_PRODUCTION,
      'https://imgur.com/nCb0onR.gif'
    )
      .then(() => {
        showPassCode(activatedQuests)
        setIsLoading(false)
        setErrorCounter(0)
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(true)
        setErrorCounter((prev) => prev + 1)
        message.error({
          content: `Произошла непредвиденная ошибка, попробуй ещё раз. ${
            errorCounter >= 2 ? 'Если ошибка повторяется много раз, обратись к Андрею' : ''
          }`,
          duration: 5,
        })
      })
  }

  const completeQuest = () => {
    const { answer }: { answer: string } = form.getFieldsValue()
    console.log(answer)
    console.log('typeof of answer: ', typeof answer)
    if (!answer || answer.trim() === '') {
      message.error('Ответ не может быть пустым!')
      return
    }
    if (answer.toLowerCase() === '29' || answer.toLowerCase() === 'двадцать девять') {
      message.success('Ответ верен! Нажми на кнопку, чтобы завершить приключение!')
      setIsCompleted(true)
      return
    }
    message.error('Ответ неверен!')
    return
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH < 768 ? '100vw' : 'auto',
        padding: '0 20px',
        textAlign: 'center',
        gap: '20px',
        backgroundColor: '#DA9DAA',
        color: '#2E2E38',
      }}
    >
      <Typography.Title level={DEVICE_WIDTH < 768 ? 3 : 1} style={{ margin: 0, maxWidth: DEVICE_WIDTH < 768 ? 'unset' : '550px' }}>
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
      <Typography.Paragraph style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}>
        {isCompleted ? 'Нажимай кнопку снизу, чтобы узнать условия завершения квеста!' : 'Жми кнопку, чтобы начать финальное задание :)'}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            borderRadius: 10,
            border: '1px solid #A7377E',
          }}
        >
          <div style={{ borderRadius: 10, overflow: 'hidden' }}>
            <ImageComponent imageSrcToImport={quizImage} />
          </div>
          <Form
            form={form}
            style={{ margin: 0 }}
            initialValues={{
              answer: '',
            }}
          >
            <Form.Item name="answer" style={{ margin: 0 }}>
              <Flex align="center" gap={8}>
                <Input placeholder="Введи расшифровку ребуса" size="large" />
                <Button
                  type="primary"
                  size="large"
                  style={{
                    display: 'inline-block',
                    width: '45px',
                    height: '45px',
                  }}
                  icon={<SendOutlined />}
                  onClick={completeQuest}
                />
              </Flex>
            </Form.Item>
          </Form>
        </div>
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
          loading={isLoading}
          icon={isError ? <WarningFilled /> : <GoldFilled />}
        >
          {isError ? 'Ошибка действия' : 'Завершить квест'}
        </Button>
      )}
    </div>
  )
}
