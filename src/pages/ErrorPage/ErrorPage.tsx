import React from 'react'
import { Typography, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

const errorPage: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '0 20px',
  textAlign: 'center',
  gap: '20px',
  backgroundColor: '#DA9DAA',
}

export const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  const navigate = useNavigate()

  if (isRouteErrorResponse(error)) {
    return (
      <div style={errorPage}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          Опаньки!
        </Typography.Title>
        <Typography.Paragraph
          style={{ margin: 0, maxWidth: '500px', fontSize: '18px' }}
        >
          Похоже, что здесь квестов нет!
        </Typography.Paragraph>
        <Typography.Paragraph
          italic
          style={{ margin: 0, maxWidth: '500px', fontSize: '18px' }}
        >
          Причина: {error.statusText}
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
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </div>
    )
  } else {
    return (
      <Typography.Title level={1} style={{ margin: 0 }}>
        Опаньки...
      </Typography.Title>
    )
  }
}
