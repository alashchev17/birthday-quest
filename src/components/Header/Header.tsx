import React, { useEffect, useState } from 'react'
import { Button, Layout, Modal, Typography } from 'antd'
import { BulbFilled } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { MAP_OF_QUESTS } from '../../constants/MAP_OF_QUESTS'

const headerStyle: React.CSSProperties = {
  color: '#2E2E38',
  height: 'unset',
  padding: '24px 16px',
  backgroundColor: '#FFC4D1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const logoStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '125%',
  color: 'inherit',
}

export const Header = () => {
  const { pathname } = useLocation()
  const [currentQuest, setCurrentQuest] = useState(
    MAP_OF_QUESTS.find((quest) => quest.path === pathname)
  )

  useEffect(() => {
    setCurrentQuest(MAP_OF_QUESTS.find((quest) => quest.path === pathname))
  }, [pathname, currentQuest])
  const askForHelpHandler = () => {
    Modal.info({
      width: 500,
      title: 'Подсказка',
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
                  "Начать приключение"
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
              onClick={() =>
                Modal.info({
                  width: 500,
                  title: 'Подсказка',
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
    <Layout.Header style={headerStyle}>
      <Link to="/" style={logoStyle}>
        Birthday Quest
      </Link>
      <Button
        type="primary"
        size="large"
        style={{ backgroundColor: '#A7377E', height: '45px' }}
        onClick={askForHelpHandler}
      >
        Подсказка
      </Button>
    </Layout.Header>
  )
}
