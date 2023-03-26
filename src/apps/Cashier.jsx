import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const CashierApp = () => (
    <>
    <Navbar />
    <main className="container-fluid px-5 my-4">
        <Outlet />
    </main>
    </>
)

export default CashierApp