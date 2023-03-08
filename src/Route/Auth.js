import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h4> Auth </h4>
                <button onClick={((e) => {
                    e.preventDefault();
                    navigate(`/Login`);
                })}> Log In </button>

                <button onClick={((e) => {
                    e.preventDefault();
                    navigate(`/SignUp`);
                })}> Sign Up </button>
        </div>
    )
}

export default Auth ;
