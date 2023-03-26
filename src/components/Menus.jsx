import { Component } from "react"
import axios from "axios"
import swal from "sweetalert"
import { rupiah } from "../utils/constants"

class Menus extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            menus: [],
            category: '',
            countCart: 0
        }
    }

    getMenus = async (category) => {
        await axios.get('/products?category.id=' + category).then(
            result => this.setState({
                menus: result.data
            })
        ).catch(
            error => console.log(error)
        )
    }

    addCart = async (menu) => {
        const data = {
            jumlah: 1,
            total_harga: menu.harga,
            product: menu
        }
        await axios.get('/carts?product.id=' + menu.id).then(
            async result => {
                let cart = result.data[0]
                if (cart) {
                    const updateData = {
                        ...cart,
                        jumlah: cart.jumlah + 1,
                        total_harga: cart.total_harga + data.total_harga
                    }
                    await axios.put('/carts/' + cart.id, updateData).then(
                        () => {
                            swal({
                                title: "Success",
                                text: `Successfully added ${menu.nama} to cart!`,
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                        }
                    )
                } else {
                    await axios.post('/carts', data).then(
                        () => {
                            swal({
                                title: "Success",
                                text: `Successfully added ${menu.nama} to cart!`,
                                icon: "success",
                                timer: 1500,
                                button: false
                            })
                        }
                    )
                }
            }
        )
        this.props.setCountCart(this.props.countCart + 1)
    }

    componentDidMount = () => {
        this.setState({
            category: this.props.category,
            countCart: this.props.countCart
        })
        this.getMenus(this.props.category)
    }

    componentDidUpdate = () => {
        if (this.state.category != this.props.category) {
            this.setState({
                category: this.props.category
            })
            this.getMenus(this.props.category)
        }
        if (this.state.countCart != this.props.countCart) {
            this.setState({
                countCart: this.props.countCart
            })
        }
    }

    render = () => (
        <div className="col-12 col-lg-7 my-2">
            <div className="card p-3 border border-secondary shadow-sm">
                <h3>List Menu</h3>
                <hr />
                <div className="row">
                    {
                        this.state.menus.map(
                            menu => (
                                <Menu key={menu.id} menu={menu} addCart={this.addCart}/>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const Menu = ({menu, addCart}) => (
    <div className="col-6 col-md-4 p-2">
        <div onClick={() => addCart(menu)} className="card border-secondary shadow-sm" type="button">
            <img src={'assets/images/' + menu.category.nama.toLowerCase() + '/' + menu.gambar} alt="foto menu" className="card-img-top" />
            <div className="card-body">
                <div className="card-title"><b>{menu.kode + ' | ' + menu.nama}</b></div>
                <div className="card-text">{rupiah(menu.harga)}</div>
            </div>
        </div>
    </div>
)

export default Menus