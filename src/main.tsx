import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './scss/app.scss'

import App from './App.tsx'
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx'
import { FirstQuest } from './pages/Quests/FirstQuest/FirstQuest.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'first-quest',
        element: <FirstQuest />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
