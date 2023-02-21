import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase.js";

const SignUp = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false) ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ; 
    const [displayName, setDisplayName] = useState("") ; 

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ; 
        } else if (name == "email") {
            setEmail(value) ;
        } else if (name == "password") {
            setPassword(value) ; 
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            const data = await createUserWithEmailAndPassword(auth, email, password) ; 
            console.log(data) ; 
            await addDoc(collection(db, "Users"), {
                uid: data.user.uid, 
                displayName, 
                email,
            })
            navigate("/");
        } catch (err) {
            alert("다시 확인해주세요. (ex, 이미 가입된 정보 또는 이미 사용 중인 이메일입니다.)") ;
            setErr(true) ;
        }
    }

    return (
        <div>
            <h4> SignUp </h4>
            <form onSubmit={onSubmit}>
                <Link to="/">
                    <button> 이전 </button>
                </Link>
                <input type="text"
                        name="displayName"
                        placeholder="Display name"
                        required 
                        value={displayName}
                        onChange={onChange} />
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
                <button className="SingupBtn"> Sign Up </button>
            </form>
        </div>
    )
}

export default SignUp ;
