import { useNavigate } from "react-router-dom";
import Login from '/Users/drizzle/stargram/src/Component/LogIn.js' ;
const Auth = () => {
    const navigate = useNavigate();

    return (
        <div className="Auth">
            <div className="Auth-Login">
                <h4> Instagram </h4>
                <Login />
            </div>
            <div className="Auth-SignUp">
                <h4> 계정이 없으신가요? </h4>
                <button onClick={((e) => {
                        e.preventDefault();
                        navigate(`/SignUp`);
                    })}> 가입하기 </button>
            </div>
        </div>
    )
}

export default Auth ;
