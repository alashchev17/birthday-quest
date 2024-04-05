import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Layout, ConfigProvider, Typography } from 'antd'

import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'

const layoutStyle: React.CSSProperties = {
  // overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '100vh',
  height: '100%',
  padding: 'calc(93px + 30px) 16px 30px 16px',
  color: '#2E2E38',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
  backgroundColor: '#DA9DAA',
}

const App: FC = () => {
  const { pathname } = useLocation()
  console.log(pathname)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#A7377E',
          controlHeightLG: 45,
        },
      }}
    >
      <Layout style={layoutStyle}>
        <Header />

        <Layout.Content style={contentStyle}>
          {pathname === '/' ? (
            <>
              <Home />{' '}
              {import.meta.env.VITE_DEBUG_GROUP_ID && (
                <Typography.Text
                  style={{
                    fontSize: 'inherit',
                    backgroundColor: '#A7377E',
                    color: '#ffffff',
                    padding: '2px 6px',
                    borderRadius: 6,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Running in Debug Mode
                </Typography.Text>
              )}
            </>
          ) : (
            <>
              <Outlet />
              {import.meta.env.VITE_DEBUG_GROUP_ID && (
                <Typography.Text
                  style={{
                    fontSize: 'inherit',
                    backgroundColor: '#A7377E',
                    color: '#ffffff',
                    padding: '2px 6px',
                    borderRadius: 6,
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Running in Debug Mode
                </Typography.Text>
              )}
            </>
          )}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
