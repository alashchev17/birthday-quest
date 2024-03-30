import { FC } from 'react'
import { Button, Modal, Typography, message } from 'antd'
import { BulbFilled } from '@ant-design/icons'
import { DEVICE_WIDTH } from '../../constants/DEVICE_WIDTH'
import { TelegramMessageSender } from '../../helpers/TelegramMessageSender'

type TipProps = {
  currentQuest: { name: string; path: string; tip: string } | undefined
}

export const Tip: FC<TipProps> = ({ currentQuest }) => {
  const showTip = (currentQuest: {
    name: string
    path: string
    tip: string
  }) => {
    Modal.info({
      width: 500,
      title: 'Подсказка',
      centered: true,
      icon: <BulbFilled style={{ color: '#A7377E' }} />,
      styles: {
        content: {
          backgroundColor: '#DA9DAA',
          color: '#2E2E38',
        },
      },
      content: (
        <Typography.Paragraph style={{ margin: 0 }}>
          {currentQuest.tip}
        </Typography.Paragraph>
      ),
      footer: (
        <div
          style={{
            display: 'flex',
            marginTop: '15px',
            width: '100%',
            justifyContent: 'right',
            gap: '10px',
          }}
        >
          <Button
            type="primary"
            onClick={() => Modal.destroyAll()}
            style={{
              backgroundColor: '#A7377E',
              display: 'inline-block',
            }}
          >
            Закрыть
          </Button>
        </div>
      ),
    })
  }

  const askForHelpHandler = () => {
    Modal.info({
      width: 500,
      title: 'Подсказка',
      centered: true,
      icon: <BulbFilled style={{ color: '#A7377E' }} />,
      styles: {
        content: {
          backgroundColor: '#DA9DAA',
          color: '#2E2E38',
        },
      },
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${currentQuest ? '10px' : '20px'}`,
          }}
        >
          {currentQuest ? (
            <>
              <Typography.Paragraph style={{ margin: 0 }}>
                Текущий квест: "{currentQuest.name}"
              </Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>
                Если ты столкнулась с трудностями, то нажми на кнопку{' '}
                <Typography.Text
                  style={{
                    backgroundColor: '#A7377E',
                    padding: '3px',
                    borderRadius: 5,
                    color: '#ffffff',
                    fontWeight: '600',
                  }}
                >
                  "Подсказка"
                </Typography.Text>
              </Typography.Paragraph>
            </>
          ) : (
            <>
              <Typography.Paragraph style={{ margin: 0 }}>
                Ты только начала свой путь! Неужели тебе необходимы подсказки?
              </Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>
                Информация про первое задание откроется по нажатию на кнопку{' '}
                <Typography.Text
                  style={{
                    backgroundColor: '#A7377E',
                    padding: '3px',
                    borderRadius: 5,
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onClick={() => Modal.destroyAll()}
                >
                  "Начать&nbsp;приключение"
                </Typography.Text>{' '}
                на главном экране!
              </Typography.Paragraph>
            </>
          )}
        </div>
      ),
      footer: (
        <div
          style={{
            display: 'flex',
            marginTop: '15px',
            width: '100%',
            justifyContent: 'right',
            gap: '10px',
          }}
        >
          {currentQuest && (
            <Button
              type="primary"
              onClick={async () => {
                // Отправляем сообщение в телеграм о том, что была запрошена подсказка
                const messageText = `Запрошена подсказка к квесту: <b>${currentQuest.name}</b>`
                await TelegramMessageSender(messageText)
                  .then(() => {
                    showTip(currentQuest)
                  })
                  .catch(() => {
                    message.error('Не удалось запросить подсказку')
                  })
              }}
              style={{
                border: '1px solid #A7377E',
                color: '#A7377E',
                backgroundColor: '#FFC4D1',
                display: 'inline-block',
              }}
            >
              Подсказка
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => Modal.destroyAll()}
            style={{
              backgroundColor: '#A7377E',
              display: 'inline-block',
            }}
          >
            Хорошо
          </Button>
        </div>
      ),
    })
  }
  return (
    <Button
      type="primary"
      size={DEVICE_WIDTH < 768 ? 'middle' : 'large'}
      onClick={askForHelpHandler}
      style={{
        fontSize: DEVICE_WIDTH < 768 ? '14px' : '18px',
      }}
      icon={<BulbFilled />}
    >
      Подсказка
    </Button>
  )
}
