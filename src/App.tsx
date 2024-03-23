import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Layout, ConfigProvider } from 'antd'

import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '100vh',
  padding: '0 16px',
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
          {pathname === '/' ? <Home /> : <Outlet />}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
