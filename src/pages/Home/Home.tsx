import { FC } from 'react'
import { Button, Image, Modal, Typography } from 'antd'
import {
  RocketFilled,
  SmileOutlined,
  SmileFilled,
  CopyFilled,
  CopyOutlined,
} from '@ant-design/icons'
import placeholderSrc from '/500x500-example.png'

const DESTINATION_ADDRESS = 'Carrer d’Albania 115, 08019 Barcelona'

export const Home: FC = () => {
  const startJourneyHandler = () => {
    Modal.info({
      width: 500,
      title: 'Первое задание!',
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
            Первая геолокация, где необходимо найти твой первый секретик:
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
              text: DESTINATION_ADDRESS,
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

  return (
    <>
      <Typography.Title level={1} style={{ margin: 0 }}>
        Добро пожаловать на Квест!
      </Typography.Title>
      <Typography.Paragraph
        style={{ margin: 0, maxWidth: '500px', fontSize: '18px' }}
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
      <Typography.Paragraph style={{ margin: 0, fontSize: '18px' }}>
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
          прямо сейчас!
        </Typography.Text>{' '}
      </Typography.Paragraph>
      <Button
        type="primary"
        size="large"
        style={{
          marginTop: '20px',
          padding: '15px 20px',
          height: 'unset',
          backgroundColor: '#A7377E',
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
