import { createBrowserRouter } from "react-router-dom"
import CashierApp from "../apps/Cashier"
import Home from "../pages/Home"
import Success from "../pages/Success"

const router = createBrowserRouter([
    {
        path: '/',
        element: <CashierApp />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/success',
                element: <Success />
            }
        ]
    }
])

export default router