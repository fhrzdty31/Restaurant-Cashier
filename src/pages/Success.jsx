import { Link } from "react-router-dom"

const Success = () => (
    <div className="text-center">
        <img src="assets/images/success.svg" alt="success" style={{width: '300px'}}/>
        <h2 className="mt-4"><b>Berhasil Membayar</b></h2>
        <Link to={'/'} className="btn btn-primary mt-3">Back</Link>
    </div>
)

export default Success