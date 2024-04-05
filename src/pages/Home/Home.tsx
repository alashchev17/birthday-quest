import { FC } from 'react'
import { Button, Image, Modal, Typography } from 'antd'
import { RocketFilled, CopyOutlined } from '@ant-design/icons'
import locationSrc from '@/assets/firstQuestLocation.jpg'
import { QUESTS_DATA } from '@/constants/QUESTS_DATA'
import { DEVICE_WIDTH } from '@/constants/DEVICE_WIDTH'
import { TelegramMessageSender } from '@/helpers/TelegramMessageSender'
import { TELEGRAM_MESSAGE_START_QUEST } from '@/constants/TELEGRAM_MESSAGES'

export const Home: FC = () => {
  const startJourneyHandler = async () => {
    const activatedQuests: string[] = JSON.parse(localStorage.getItem('activatedQuests') || '[]')
    if (!activatedQuests.includes('home')) {
      // Если квест "home" не активирован, добавляем его в общий массив в хранилище
      localStorage.setItem('activatedQuests', JSON.stringify([...activatedQuests, 'home']))
    }

    // Отсылаем сообщение в телеграм о том, что квест начался
    await TelegramMessageSender(TELEGRAM_MESSAGE_START_QUEST)
    Modal.info({
      width: 500,
      title: 'Первое задание!',
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
            {'Первую подсказку ты найдёшь практически возле себя, будь внимательна :)'}
          </Typography.Paragraph>
          <Image
            style={{ margin: '0 auto', display: 'block', objectFit: 'cover' }}
            src={locationSrc}
            alt="map"
            preview={{
              src: locationSrc,
            }}
            width="100%"
            height={400}
          />
          <Typography.Paragraph
            copyable={{
              text: QUESTS_DATA[0].address?.toString(),
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

  return (
    <>
      <Typography.Title level={DEVICE_WIDTH < 768 ? 3 : 1} style={{ margin: 0 }}>
        Добро пожаловать на Квест!
      </Typography.Title>
      <Typography.Paragraph
        style={{
          margin: 0,
          maxWidth: '500px',
          fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px',
        }}
      >
        Если ты находишься на этой странице – значит у тебя сегодня{' '}
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
          День Рождения
        </Typography.Text>{' '}
        и именно поэтому ты можешь принять участие в Квесте
      </Typography.Paragraph>
      <Typography.Paragraph style={{ margin: 0, fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px' }}>
        Начнём наше занимательное приключение{' '}
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
          прямо&nbsp;сейчас!
        </Typography.Text>{' '}
      </Typography.Paragraph>
      <Button
        type="primary"
        size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
        style={{
          marginTop: '20px',
          padding: '15px 20px',
          height: 'unset',
          fontWeight: 600,
        }}
        onClick={startJourneyHandler}
        icon={<RocketFilled />}
      >
        Начать приключение
      </Button>
    </>
  )
}
