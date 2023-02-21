import { Link } from "react-router-dom";

const Auth = () => {
    return (
        <div>
            <h4> Auth </h4>
            <Link to="/LogIn">
                <button> Log In </button>
            </Link>
            <Link to="/SignUp">
                <button> Sign Up </button>
            </Link>
        </div>
    )
}

export default Auth ;
