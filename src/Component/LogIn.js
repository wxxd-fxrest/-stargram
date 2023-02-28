import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import { auth, db } from "../firebase.js";

const LogIn = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false) ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ; 

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "email") {
            setEmail(value) ;
        } else if (name == "password") {
            setPassword(value) ; 
        }
    }
    
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(auth, email, password) ;
            console.log(data) ; 
            navigate("/");
        } catch (err) {
            alert("다시 확인해주세요. (ex, 이미 가입된 정보 또는 이미 사용 중인 이메일입니다.)") ;
            setErr(true) ;
        }
    }

    return (
        <div>
            <h4> Login </h4>
            <form onSubmit={onSubmit}>
                <Link to="/Auth">
                    <button> 이전 </button>
                </Link>
                <input type="email"
                        name="email"
                        placeholder="Email"
                        required 
                        value={email}
                        onChange={onChange} />
                <input type="password"
                        name="password"
                        placeholder="Password"
                        required 
                        value={password}
                        onChange={onChange} />
                <button> Log In </button>
            </form>
        </div>
    )
}

export default LogIn ;
