import { Link } from "react-router-dom";

const Main = () => {



    return (
        <div>
            <h4>Main</h4>
            <Link to="/Write">
                <button> Write </button>
            </Link>
            <div className="Main">
                <h6> name </h6>
                <img alt="" src="#" width="200px" height="200px" />
                <h5> feed </h5>
            </div>
        </div>
    )
}

export default Main ; 