const nav = [
    {
        name: 'Home',
        path: ''
    },
    {
        name: 'Product',
        path: ''
    },
    {
        name: 'About',
        path: ''
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
                <a key={index} href={nav.path} className="nav-link active">{nav.name}</a>
            )
        )}
    </div>
)

export default Navbar