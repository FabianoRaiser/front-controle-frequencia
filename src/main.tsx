import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import Layout from './layouts/dashboard.tsx'
import TurmasPage from './pages/turmas.tsx'
import { RouterProvider } from 'react-router'
import ProfessoresPage from './pages/index.tsx'

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: 'professores',
            Component: ProfessoresPage,
          },
          {
            path: 'turmas',
            Component: TurmasPage,
          }
        ],
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
