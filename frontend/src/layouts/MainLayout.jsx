import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
        <ToastContainer autoClose={1500}/>
    </>
  )
}

export default MainLayout