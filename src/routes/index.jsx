import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import { APP_ROUTES } from "../utilities/routes.constants";
import { Home } from '../pages';
import ResponsiveAppBar from '../components/NavBar/Navbar';

 const MainLayout = ({ children }) => (
 <>
      <ResponsiveAppBar/> 
    {children}
  </>
 );
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

      <Route path={APP_ROUTES.ROOT} element={<MainLayout><Home /></MainLayout>} />

      {/* <Route path={APP_ROUTES.CREATE_FEEDBACK} element={<MainLayout><UserFeedbackView /></MainLayout>} />
      <Route path={APP_ROUTES.View_FAQ} element={<MainLayout><FaqPage /></MainLayout>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes