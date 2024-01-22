import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Index from './Sites/Index.jsx'
import EducationView from './Sites/EducationView.jsx'
import SchoolView from './Sites/SchoolView.jsx'
import AvailableEducations from './Sites/AvailableEducations.jsx'
import ToteutusView from './Sites/ToteutusView.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Index />} />
          
          <Route path='opinnot'>
            <Route index element={<AvailableEducations />} />
            <Route path=':id' element={<EducationView />} />
          </Route>

          <Route path='oppilaitokset'>
            <Route index element={<p>oppilaitokset</p>} />
            <Route path=':id' element={<SchoolView />} />
          </Route>

          <Route path='toteutukset'>
            <Route path=':id' element={<ToteutusView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

