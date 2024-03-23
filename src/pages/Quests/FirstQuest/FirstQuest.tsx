import { CopyOutlined, RocketFilled } from '@ant-design/icons'
import {
  Button,
  Form,
  Image,
  Modal,
  Radio,
  Steps,
  Typography,
  message,
} from 'antd'
import { useForm } from 'antd/es/form/Form'

import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import placeholderSrc from '../../../../public/500x500-example.png'
import { QUESTS_ADDRESSES } from '../../../constants/QUESTS_ADDRESSES'

const DEVICE_WIDTH = document.documentElement.clientWidth

const STYLES_FOR_SHRINKING: React.CSSProperties = {
  flexShrink: DEVICE_WIDTH < 768 ? 0 : 1,
  width: DEVICE_WIDTH < 768 ? 'auto' : 'calc(100% / 3)',
  fontSize: DEVICE_WIDTH < 768 ? '12px' : '16px',
}

const steps = [
  {
    title: 'Цвет',
    content: (
      <Form.Item
        name="favouriteColor"
        label="Какой мой любимый цвет?"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            Красный
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            Голубой
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            Фиолетовый
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
  {
    title: 'Первый поцелуй',
    content: (
      <Form.Item
        name="firstKiss"
        label="Когда мы впервые поцеловались?"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size={DEVICE_WIDTH < 768 ? 'small' : 'large'}
          style={{ display: 'flex', width: '100%' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '05.04.2023' : '5 апреля 2023'}
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '07.04.2023' : '7 апреля 2023'}
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '15.04.2023' : '15 апреля 2023'}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
  {
    title: 'Любимая сладость',
    content: (
      <Form.Item
        name="favouriteSweet"
        label="Какая моя любимая сладость?"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
          style={{ display: 'flex', width: '100%' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            Шоколад
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            Желейки
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            Печеньки
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
]

export const FirstQuest: FC = () => {
  const navigate = useNavigate()
  const [form] = useForm()
  const [isQuestStarted, setIsQuestStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const startNewQuest = () => {
    // Достаём из локального хранилища список активированных квестов
    const activatedQuests: string[] = JSON.parse(
      localStorage.getItem('activatedQuests') || '[]'
    )

    if (!activatedQuests.includes('home')) {
      // Если квест "home" не активирован, уведомляем человека о том, что данный квест ещё недоступен
      Modal.error({
        width: 500,
        title: 'Второе задание недоступно',
        icon: <RocketFilled style={{ color: '#A7377E' }} />,
        styles: {
          content: {
            backgroundColor: '#DA9DAA',
            color: '#2E2E38',
          },
        },
        content: (
          <Typography.Paragraph>
            Для начала нужно выполнить задание в главном квесте
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

    if (!activatedQuests.includes('firstQuest')) {
      // Добавляем квест в список активированных квестов
      localStorage.setItem(
        'activatedQuests',
        JSON.stringify([...activatedQuests, 'firstQuest'])
      )
    }

    Modal.info({
      width: 500,
      title: 'Второе задание!',
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
          <Typography.Paragraph style={{ margin: 0 }}>
            Вторая геолокация, где необходимо найти следующую метку:
          </Typography.Paragraph>
          <Image
            style={{ margin: '0 auto', display: 'block' }}
            src={placeholderSrc}
            alt="map"
            preview={{
              src: placeholderSrc,
            }}
            width="100%"
          />
          <Typography.Paragraph
            copyable={{
              text: QUESTS_ADDRESSES[1],
              tooltips: [
                'Нажми, чтобы скопировать адрес',
                'Скопировано в буфер обмена!',
              ],
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
  const validateAndNext = () => {
    const currentAnswer = form.getFieldsValue()
    console.log(currentAnswer)
    if (currentAnswer.favouriteColor && currentAnswer.favouriteColor !== 'a') {
      message.error('Ответ неверен!')
      return
    }
    if (currentAnswer.firstKiss && currentAnswer.firstKiss !== 'b') {
      message.error('Ответ неверен!')
      return
    }
    if (currentAnswer.favouriteSweet && currentAnswer.favouriteSweet !== 'a') {
      message.error('Ответ неверен!')
      return
    }
    message.info('Ответ верен! Отвечай на следующий вопрос')
    next()
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
      }}
    >
      <Typography.Title
        level={DEVICE_WIDTH < 768 ? 3 : 1}
        style={{ margin: 0 }}
      >
        Поздравляю! <br />
        Ты нашла первый секретик!
      </Typography.Title>
      <Typography.Paragraph
        style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}
      >
        {isCompleted
          ? 'Теперь можешь переходить к следующему квесту! Жми кнопку!'
          : 'Чтобы продолжить прохождение квеста, ответь на парочку моих вопросов:'}
      </Typography.Paragraph>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          height: isQuestStarted && !isCompleted ? 'auto' : '0',
          opacity: isQuestStarted && !isCompleted ? 1 : 0,
          visibility: isQuestStarted && !isCompleted ? 'visible' : 'hidden',
          transition: 'visibility 0.3s ease-in-out, opacity 0.3s ease-in-out',
          gap: '20px',
        }}
      >
        <Steps current={current} items={items} />
        <Form
          layout="vertical"
          size="large"
          form={form}
          style={{
            width: '100%',
            display: DEVICE_WIDTH < 768 ? 'flex' : 'initial',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          initialValues={{
            favouriteColor: 'b',
            firstKiss: 'a',
            favouriteSweet: 'c',
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid #A7377E',
            }}
          >
            {steps[current].content}
          </div>
        </Form>
        <div>
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={validateAndNext}
              disabled={isCompleted}
            >
              Далее
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                const currentAnswer = form.getFieldsValue()
                console.log(currentAnswer)
                if (currentAnswer.unknown && currentAnswer.unknown !== 'c') {
                  message.error('Ответ неверен!')
                  return
                }
                message.success({
                  content:
                    'Поздравляю! Ты ответила на все вопросы правильно! Теперь ты можешь переходить к следующему квесту!',
                  duration: 5,
                })
                setIsCompleted(true)
              }}
              disabled={isCompleted}
            >
              Завершить
            </Button>
          )}
        </div>
      </div>
      {!isQuestStarted && (
        <Button
          type="primary"
          size="large"
          style={{
            padding: '15px 20px',
            height: 'unset',
            fontWeight: 600,
          }}
          onClick={() => setIsQuestStarted((prev) => !prev)}
          icon={<RocketFilled />}
        >
          Начать викторину
        </Button>
      )}
      {isCompleted && (
        <Button
          type="primary"
          size="large"
          style={{
            padding: '15px 20px',
            height: 'unset',
            fontWeight: 600,
          }}
          onClick={startNewQuest}
          icon={<RocketFilled />}
        >
          Перейти к следующему квесту
        </Button>
      )}
    </div>
  )
}
