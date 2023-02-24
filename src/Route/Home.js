import { signOut } from "firebase/auth";
import Feed from "../Component/Feed";
import Main from "../Component/Main";
import { auth } from "../firebase";

const Home = () => {
    const onClickLogOut = () => {
        signOut(auth)
        alert("Log Out 완료")
    } ;
    return (
        <div>
            <h4> Home </h4>
            <Main />
            <button onClick={onClickLogOut}> Log Out </button>
            <Feed />
        </div>
    )
}

export default Home ; 