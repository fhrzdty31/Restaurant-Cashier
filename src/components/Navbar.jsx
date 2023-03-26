import { Link } from "react-router-dom"

const nav = [
    {
        name: 'Product',
        path: ''
    },
    {
        name: 'Success',
        path: '/success'
    }
]

const Navbar = () => (
    <nav className="navbar navbar-expand border-bottom border-secondary bg-light shadow-sm sticky-top">
        <div className="container pt-1">
            <h1 className="navbar-brand"><b>Kasir App</b></h1>
            <Nav />
        </div>
    </nav>
)

const Nav = () => (
    <div className="navbar-nav">
        {nav.map(
            (nav, index) => (
                <Link key={index} to={nav.path} className="nav-link active">
                    <Icon type={nav.name}/> {nav.name}
                </Link>
            )
        )}
    </div>
)

const Icon = ({type}) => {
    switch (type) {
        case 'Product':
            return <i class="bi bi-cart3"></i>
        case 'Success':
            return <i class="bi bi-check-circle"></i>
        default:
            return <i class="bi bi-three-dots-vertical"></i>
    }
}

export default Navbar