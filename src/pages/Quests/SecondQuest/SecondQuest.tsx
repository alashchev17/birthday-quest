import placeholderSrc from '@/assets/500x500-example.png'
import quizImage from '@/assets/secondQuestQuiz.jpg'
import { ImageComponent } from '@/components/ImageComponent'
import { CopyOutlined, RocketFilled, SendOutlined, WarningFilled } from '@ant-design/icons'
import { DEVICE_WIDTH } from '@/constants/DEVICE_WIDTH'
import { QUESTS_DATA } from '@/constants/QUESTS_DATA'
import { TELEGRAM_MESSAGE_SECOND_QUEST } from '@/constants/TELEGRAM_MESSAGES'
import { TelegramMessageSender } from '@/helpers/TelegramMessageSender'
import { Button, Flex, Form, Image, Input, Modal, Typography, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SecondQuest = () => {
  const navigate = useNavigate()
  const [form] = useForm()
  const [isCompleted, setIsCompleted] = useState(false)
  const [isQuestStarted, setIsQuestStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const startNewQuest = async () => {
    // Достаём из локального хранилища список активированных квестов
    const activatedQuests: string[] = JSON.parse(localStorage.getItem('activatedQuests') || '[]')
    if (activatedQuests.length < 2) {
      // Если не все квесты пройдены, значит отображаем ошибку и не даём пользователю начать новый квест
      Modal.error({
        width: 500,
        title: 'Третье задание недоступно',
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
    } else if (!activatedQuests.includes('firstQuest')) {
      // Если квест "firstQuest" не активирован, уведомляем человека о том, что данный квест ещё недоступен
      Modal.error({
        width: 500,
        title: 'Третье задание недоступно',
        centered: true,
        icon: <RocketFilled style={{ color: '#A7377E' }} />,
        styles: {
          content: {
            backgroundColor: '#DA9DAA',
            color: '#2E2E38',
          },
        },
        content: <Typography.Paragraph>Для начала нужно выполнить задание во втором квесте, потом возвращаться сюда!</Typography.Paragraph>,
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

    localStorage.setItem('activatedQuests', JSON.stringify([...activatedQuests, 'secondQuest']))

    // Отсылаем сообщение в Telegram о том, что был завершён первый квест
    setIsLoading(true)
    await TelegramMessageSender(TELEGRAM_MESSAGE_SECOND_QUEST)
    setIsLoading(false)

    Modal.info({
      width: 500,
      title: 'Третье задание! (финальное)',
      centered: true,
      icon: <RocketFilled style={{ color: '#A7377E' }} />,
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
          Хорошо
        </Button>
      ),
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography.Paragraph style={{ margin: 0 }}>Третья геолокация, где необходимо найти следующую метку:</Typography.Paragraph>
          <Image
            style={{ margin: '0 auto', display: 'block' }}
            src={placeholderSrc}
            preview={{
              src: placeholderSrc,
            }}
            width="100%"
          />
          <Typography.Paragraph
            copyable={{
              text: QUESTS_DATA[2].address?.toString(),
              tooltips: ['Нажми, чтобы скопировать адрес', 'Скопировано в буфер обмена!'],
              icon: <CopyOutlined style={{ color: '#A7377E' }} />,
            }}
            style={{
              color: '#2E2E38',
              fontWeight: 900,
              cursor: 'pointer',
            }}
          >
            Скопируй адрес, нажав на иконку справа
          </Typography.Paragraph>
        </div>
      ),
    })
  }

  const completeQuest = () => {
    const { answer }: { answer: string } = form.getFieldsValue()
    if (!answer || answer.trim() === '') {
      message.error('Ответ не может быть пустым!')
      return
    }
    if (answer.toLowerCase() !== 'именинница') {
      message.error('Ответ неверен!')
      return
    }
    message.success('Ответ верен! Теперь ты можешь переходить к следующему квесту!')
    setIsCompleted(true)
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
        Вау! <br />
        Какое быстрое продвижение по квесту!
      </Typography.Title>
      <Typography.Paragraph
        style={{
          margin: 0,
          fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px',
          maxWidth: DEVICE_WIDTH < 768 ? 'unset' : '550px',
        }}
      >
        Наверное, тебе нетерпиться узнать, что же будет в конце нашего путешествия, но прежде чем мы продолжим, тебе нужно пройти{' '}
        <Typography.Text
          style={{
            fontSize: 'inherit',
            backgroundColor: '#A7377E',
            color: '#ffffff',
            padding: '2px 4px',
            borderRadius: 6,
          }}
          strong
        >
          ещё&nbsp;одну&nbsp;задачу
        </Typography.Text>
        , чтобы продвинуться дальше
      </Typography.Paragraph>
      <Typography.Paragraph style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}>
        {isCompleted ? 'Теперь можешь переходить к следующему квесту! Жми кнопку!' : 'Жми кнопку, чтобы начать :)'}
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
          Начать викторину
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
                    padding: '0 12px',
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
          icon={<RocketFilled />}
          loading={isLoading}
        >
          Узнать задание финального квеста
        </Button>
      )}
    </div>
  )
}
