import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Feed from "../Component/Feed";
import { auth } from "../firebase";
import SetUp from '/Users/drizzle/stargram/src/img/instagram_setup.png' ;  
import { useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const [more, setMore] = useState(false) ; 

    const onClick = () => {
        setMore(!more) ; 
    }

    return (
        <div className="Home">
            <div className="Home-Instagram">
                <img src={SetUp} onClick={onClick}/>
                <h4> Instagram </h4>
                {more ? 
                <div className="Btn-All">
                    <div>
                        <button onClick={(() => {
                            signOut(auth)})} 
                            className="LogOutBtn"> 로그아웃 </button>

                        <button onClick={(() => {
                                navigate("/Write")})}
                                className="WriteBtn"> 게시물 업로드 </button>

                        <button onClick={(() => {
                            navigate("/Edit")})}
                            className="EditBtn"> 프로필 편집 </button>

                        <button onClick={(() => {
                            navigate("/AllDirectMessage")})}
                            className="AllDMBtn"> DM </button>
                    </div>
                </div> : null}
            </div>
            <Feed />
        </div>
    )
}

export default Home ; 