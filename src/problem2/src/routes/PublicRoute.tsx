import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Layout from '../layouts'
import HomePage from '../pages/HomePage'

const PublicRoutes: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' key='home' element={<HomePage />} />
          </Route>
          <Route path='*' key='not-found' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default PublicRoutes
