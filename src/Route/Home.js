import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Feed from "../Component/Feed";
import Main from "../Component/Main";
import { auth } from "../firebase";
import Profile from "./Profile";

const Home = () => {
    const onClickLogOut = () => {
        signOut(auth)
        alert("Log Out 완료")
    } ;
    return (
        <div>
            <h4> Home </h4>
            <button onClick={onClickLogOut}> Log Out </button>
            <Link to="/Write">
                <button> Write </button>
            </Link>
            <Feed />
        </div>
    )
}

export default Home ; 