import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PresentationPage from "./pages/PresentationPage"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import DashBoard from "./pages/DashBoard"
import DashHome from "./components/DashboardPage/DashHome"

import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from "./data/theme/theme.js";
import useThemeStore from "./data/Store/themeStore.js";
import DashProject from "./components/DashboardPage/DashProject.tsx"
import DashTask from "./components/DashboardPage/DashTask.tsx"
import DashCalendar from "./components/DashboardPage/DashCalendar.tsx"
import AddProject from "./components/DashboardPage/dashProject/AddProject.tsx"
import AddTask from "./components/DashboardPage/dashTask/AddTask.tsx"
import DashProfile from "./components/DashboardPage/DashProfile.tsx"

import { ToastContainer } from 'react-toastify'
import TheProject from "./components/DashboardPage/dashProject/TheProject.tsx"
import EditProject from "./components/DashboardPage/dashProject/EditProject.tsx"
import TheTask from "./components/DashboardPage/dashTask/TheTask.tsx"
import EditTask from "./components/DashboardPage/dashTask/editTask.tsx"

import { useAuthStore } from "./data/Store/useAuthStore.js";
import { useEffect } from "react"
import ProtectedRoute from "./pages/ProtectedRoute.tsx"

function App() {

  const { darkMode } = useThemeStore();
  const { user, checkExpiration } = useAuthStore();

  useEffect(() => {
    checkExpiration();
  }, [])

  return (
    <>
      <ThemeProvider theme={darkMode === true ? darkTheme : lightTheme} >
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/website" element={<PresentationPage />} />

            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Signin />} />
            <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />



            <Route path="/" element={<ProtectedRoute>  <DashBoard /> </ProtectedRoute>} >
              <Route index element={<DashHome />} />

              <Route path="projects">
                <Route index element={<DashProject />} />
                <Route path="newProject" element={<AddProject />} />
                <Route path="theProject/:projectId" element={<TheProject />} />
                <Route path="updateProject/:projectId" element={<EditProject />} />
              </Route>

              <Route path="tasks">
                <Route index element={<DashTask />} />
                <Route path="newTask" element={<AddTask />} />
                <Route path="theTask/:taskId" element={<TheTask />} />
                <Route path="updateTask/:taskId" element={<EditTask />} />
              </Route>
              <Route path="calendar" element={<DashCalendar />} />

              <Route path="profile" element={<DashProfile />} />
            </Route>



          </Routes>

          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
