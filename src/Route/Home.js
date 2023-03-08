import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Feed from "../Component/Feed";
import { auth } from "../firebase";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h4> Home </h4>
            <button onClick={(() => {
                signOut(auth)
                alert("Log Out 완료")
            })}> Log Out </button>
            
                <button onClick={(() => {
                    navigate("/Write")})}> Write </button>

                <button onClick={(() => {
                    navigate("/Edit")})}> Edit </button>

                <button onClick={(() => {
                    navigate("/DirectMessage")})}> DirectMessage </button>
            <Feed />
        </div>
    )
}

export default Home ; 