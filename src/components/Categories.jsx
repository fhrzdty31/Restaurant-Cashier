import { Component } from "react";
import axios from "axios";

class Categories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount = async () => {
        await axios.get('/categories').then(
            result => {
                this.setState({
                    categories: result.data
                })
            }
        )
    }

    render = () => (
        <div className="col-12 col-lg-2 my-2">
            <div className="card border border-secondary shadow-sm">
                <ul className="list-group list-group-flush">
                    {this.state.categories.map(
                        category => (
                            <Category key={category.id} category={category} setCategory={this.props.setCategory} categorySelected={this.props.categorySelected}/>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}

const Category = ({category, setCategory, categorySelected}) => (
    <li onClick={() => setCategory(category.id)} className={(categorySelected == category.id) ? 'list-group-item active' : 'list-group-item'} type="button">
        <Icon category={category.id}/> {category.nama}
    </li>
)

const Icon = ({category}) => {
    if (category == 1) return (<i className="bi bi-egg-fried"></i>)
    if (category == 2) return (<i className="bi bi-cup-hot"></i>) 
    if (category == 3) return (<i className="bi bi-palette"></i>) 
}

export default Categories