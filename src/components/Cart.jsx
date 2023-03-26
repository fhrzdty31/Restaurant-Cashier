import { Component } from "react"
import { Navigate } from "react-router-dom"
import { rupiah } from "../utils/constants"
import axios from "axios"
import swal from "sweetalert"

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carts: [],
            countCart: 0,
            price: 0,
            finish: false
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
                    countCart: count,
                    price: result.data.reduce((count, cart) => count + cart.total_harga, 0)
                })
                this.props.setCountCart(count)
            }
        )
    }

    clearCart = () => this.state.carts.map(
        async cart => {
            await axios.delete('/carts/' + cart.id)
            swal({
                title: "Success Clear",
                text: `Successfully clear all menus in carts`,
                icon: "success",
                timer: 1500,
                button: false
            })
        }
    )

    buy = async () => {
        const data = {
            total_bayar: this.state.price,
            menus: this.state.carts
        }

        await axios.post('/orders', data).then(
            () => {
                swal({
                    title: "Success Checkout",
                    text: `Successfully paid for all orders in the cart in the amount of ${rupiah(this.state.price)}`,
                    icon: "success",
                    timer: 1500,
                    button: false
                }).then(
                    () => {
                        this.clearCart()
                        this.setState({
                            finish: true
                        })
                    }
                )
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
        <>
        {
            this.state.finish && (<Navigate to={'/success'}/>)
        }
        <div className="col-12 col-lg-3 my-2">
            <div className="card p-3 border border-secondary shadow-sm">
                <div className="d-flex justify-content-between">
                    <h3>Cart</h3>
                    <button className="btn btn-outline-primary" onClick={() => {
                        this.clearCart()
                        this.getCarts()
                    }}>
                        <i class="bi bi-trash"></i> Clear
                    </button>
                </div>
                <ul className="list-group list-group-flush mt-2">
                    {
                        this.state.carts.length !== 0 ?
                        this.state.carts.map(
                            cart => <MenuInCart key={cart.id} cart={cart} handlerModal={this.handlerModal}/>
                            )
                            :
                            (
                                <li className="list-group-item text-center">
                                    <h4 className="mt-3"><b>Keranjang Kososng</b></h4>
                                </li>
                            )
                        }
                </ul>
                {
                    this.state.carts.length !== 0 &&
                    (
                        <div className="row mt-3">
                            <div className="col-8">
                                <div className="form-control">{rupiah(this.state.price)}</div>
                            </div>
                            <div className="col-4">
                                <button onClick={() => this.buy()} className="btn btn-primary">
                                    <i className="bi bi-cart-check"></i>
                                    <span> Buy</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
}

const MenuInCart = ({cart, handlerModal}) => (
    <li className="list-group-item" onClick={() => handlerModal(cart)} type="button">
        <div className="row align-items-center">
            <div className="col-2">
                <h5><span className="badge rounded-pill text-bg-primary">{cart.jumlah}</span></h5>
            </div>
            <div className="col-5">
                <h6 className="text-dark">{cart.product.nama}</h6>
                <span className="text-secondary">{rupiah(cart.product.harga)}</span>
            </div>
            <div className="col-5">
                <h6 className="text-dark text-end">{rupiah(cart.total_harga)}</h6>
            </div>
        </div>
    </li>
)

export default Cart