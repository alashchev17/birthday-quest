import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { MAP_OF_QUESTS } from '../../constants/MAP_OF_QUESTS'
import { Tip } from '../Tip/Tip'

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

  return (
    <Layout.Header style={headerStyle}>
      <Link to="/" style={logoStyle}>
        Birthday Quest
      </Link>
      <Tip currentQuest={currentQuest} />
    </Layout.Header>
  )
}
