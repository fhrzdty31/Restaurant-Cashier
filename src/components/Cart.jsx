import { Component } from "react";
import axios from "axios";

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carts: [],
            countCart: 0
        }
    }

    getCarts = async () => {
        await axios.get('/carts').then(
            result => {
                let count = 0
                result.data.map(
                    cart => count = count + cart.jumlah
                )
                this.setState({
                    carts: result.data,
                    countCart: count
                })
                this.props.setCountCart(count)
            }
        )
    }

    componentDidMount = () => {
        this.getCarts()
    }

    componentDidUpdate = () => {
        if (this.state.countCart != this.props.countCart) {
            this.setState({
                countCart: this.props.countCart
            })
            this.getCarts()
        }
    }

    render = () => (
        <div className="col-12 col-lg-3 my-2">
            <div className="card p-3 border border-secondary shadow-sm">
                <h2>Cart</h2>
                <ul className="list-group list-group-flush mt-2">
                    {
                        this.state.carts.map(
                            cart => <MenuInCart key={cart.id} cart={cart}/>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

const MenuInCart = ({cart}) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        <h5><span className="badge rounded-pill text-bg-primary">{cart.jumlah}</span></h5>
        <div>
            <h6 className="text-dark">{cart.product.nama}</h6>
            <span className="text-secondary">Rp. {cart.product.harga}</span>
        </div>
        <h6 className="text-dark">Rp. {cart.total_harga}</h6>
    </li>
)

export default Cart