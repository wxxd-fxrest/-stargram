import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h4>Main</h4>
            <Link to="/Write">
                <button> Write </button>
            </Link>
        </div>
    )
}

export default Main ; 