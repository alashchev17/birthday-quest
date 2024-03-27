import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './scss/app.scss'

import App from './App.tsx'
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx'
import { FirstQuest } from './pages/Quests/FirstQuest/FirstQuest.tsx'
import { SecondQuest } from './pages/Quests/SecondQuest/SecondQuest.tsx'
import { ThirdQuest } from './pages/Quests/ThirdQuest/ThirdQuest.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'b40d4c97-28be-4f59-8765-9001d335e6e0',
        element: <FirstQuest />,
      },
      {
        path: 'bf0de339-b37c-4e2f-b498-b9cdeb519f76',
        element: <SecondQuest />,
      },
      {
        path: '23638187-adfa-4b3a-99d9-effd3834b808',
        element: <ThirdQuest />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
