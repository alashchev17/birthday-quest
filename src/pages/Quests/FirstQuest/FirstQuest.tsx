import { CopyOutlined, RocketFilled, WarningFilled } from '@ant-design/icons'
import { Button, Form, Image, Modal, Steps, Typography, message } from 'antd'
import { useForm } from 'antd/es/form/Form'

import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import placeholderSrc from '@/assets/500x500-example.png'

import { QUESTS_DATA } from '@/constants/QUESTS_DATA'
import { DEVICE_WIDTH } from '@/constants/DEVICE_WIDTH'
import { FIRST_QUEST_STEPS } from '@/constants/FIRST_QUEST_STEPS'
import { TelegramMessageSender } from '@/helpers/TelegramMessageSender'
import { TELEGRAM_MESSAGE_FIRST_QUEST } from '@/constants/TELEGRAM_MESSAGES'

const steps = FIRST_QUEST_STEPS

export const FirstQuest: FC = () => {
  const navigate = useNavigate()
  const [form] = useForm()
  const [isQuestStarted, setIsQuestStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const startNewQuest = async () => {
    // Достаём из локального хранилища список активированных квестов
    const activatedQuests: string[] = JSON.parse(localStorage.getItem('activatedQuests') || '[]')

    if (!activatedQuests.includes('home')) {
      // Если квест "home" не активирован, уведомляем человека о том, что данный квест ещё недоступен
      Modal.error({
        width: 500,
        centered: true,
        title: 'Второе задание недоступно',
        icon: <WarningFilled style={{ color: '#A7377E' }} />,
        styles: {
          content: {
            backgroundColor: '#DA9DAA',
            color: '#2E2E38',
          },
        },
        content: <Typography.Paragraph>Для начала нужно выполнить задание в главном квесте</Typography.Paragraph>,
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
      localStorage.setItem('activatedQuests', JSON.stringify([...activatedQuests, 'firstQuest']))
    }

    // Отсылаем сообщение в Telegram о том, что был завершён первый квест
    setIsLoading(true)
    await TelegramMessageSender(TELEGRAM_MESSAGE_FIRST_QUEST)
    setIsLoading(false)

    Modal.info({
      width: 500,
      title: 'Второе задание!',
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
          <Typography.Paragraph style={{ margin: 0 }}>
            Под деревом будут лежать священные свитки знаний того чем ты живешь и вдохновляешься уже очень долгое время...
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
              text: QUESTS_DATA[1].address?.toString(),
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

  const validateAndNext = () => {
    const currentAnswer = form.getFieldsValue()
    if (
      (currentAnswer.favouriteColor && currentAnswer.favouriteColor !== 'a') ||
      (currentAnswer.firstKiss && currentAnswer.firstKiss !== 'b')
    ) {
      message.error('Ответ неверен!')
      return
    }
    message.info('Ответ верен! Отвечай на следующий вопрос')
    next()
  }

  const completeQuest = () => {
    const currentAnswer = form.getFieldsValue()
    if (currentAnswer.favouriteSweet && currentAnswer.favouriteSweet !== 'a') {
      message.error('Ответ неверен!')
      return
    }
    message.success({
      content: 'Поздравляю! Ты ответила на все вопросы правильно! Теперь ты можешь переходить к следующему квесту!',
      duration: 5,
    })
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
      <Typography.Title level={DEVICE_WIDTH < 768 ? 3 : 1} style={{ margin: 0 }}>
        Поздравляю! <br />
        Ты нашла первый секретик!
      </Typography.Title>
      <Typography.Paragraph style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}>
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
              width: '100%',
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
            <Button type="primary" onClick={validateAndNext} disabled={isCompleted}>
              Далее
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={completeQuest} disabled={isCompleted}>
              Завершить
            </Button>
          )}
        </div>
      </div>
      {!isQuestStarted && !isCompleted && (
        <Button
          type="primary"
          size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
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
          Перейти к следующему квесту
        </Button>
      )}
    </div>
  )
}
