import { Component } from "react"
import Cart from "./components/Cart"
import Categories from "./components/Categories"
import Menus from "./components/Menus"
import Navbar from "./components/Navbar"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            category: 1,
            countCart: 0
        }
    }

    setCategory = (category) => {
        this.setState({ category })
    }

    setCountCart = (value) => {
        this.setState({ countCart: value })
    }

    render = () => (
        <>
        <Navbar />
        <div className="container-fluid px-5 my-4">
            <div className="row">
                <Categories
                    setCategory={this.setCategory}
                    categorySelected={this.state.category}
                />
                <Menus
                    category={this.state.category}
                    countCart={this.state.countCart}
                    setCountCart={this.setCountCart}
                />
                <Cart
                    countCart={this.state.countCart}
                    setCountCart={this.setCountCart}
                />
            </div>
        </div>
        </>
    )
}

export default App