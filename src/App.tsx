import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Layout } from 'antd'

import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 93px)',
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
    <Layout style={layoutStyle}>
      <Header />
      <Layout.Content style={contentStyle}>
        {pathname === '/' ? <Home /> : <Outlet />}
      </Layout.Content>
    </Layout>
  )
}

export default App
