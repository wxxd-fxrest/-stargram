import { async } from "@firebase/util";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutFeed = () => {
    const {currentUser} = useContext(AuthContext) ;
    const location = useLocation() ;
    const [coment, setComent] = useState("") ;
    const [feedUser, setFeedUser] = useState([]) ;

    const pathname = location.pathname ; 
    const DocID = (pathname.split('/')[3]);
    // console.log(DocID)

    const getLoginUser = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${coment.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setFeedUser(doc.data()) ;
            // console.log(doc.data())
        console.log("2")
        }); 
    } ;

    const getDocID = async() => {
        onSnapshot(doc(db, "Feed", DocID), (doc) => {
            // console.log("Current data: ", doc.data());
            setComent(doc.data())
        console.log("1")
        }) ;
    } ;

    console.log(coment)
    console.log(feedUser)

    useEffect(() => {
        getLoginUser()
        getDocID()
    }, []) ; 

    return (
        <div>
            <div className="Main">
                <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                {/* <h6> {feed.Data.displayName} </h6>
                <img src={feed.Data.attachmentUrl} width="200px" height="200px" />
                <h5> {feed.Data.message} </h5>
                {feed.DocID && <Coment feed={feed} />}
                {feed.Data.UID == currentUser.uid ? 
                    <button onClick={onDelete}> 삭제 </button> : null}
                <div>
                    <input type="textarea"
                            name="textarea"
                            placeholder="댓글"
                            required 
                            value={textarea}
                            onChange={(e) => {
                                const {target : {value}} = e ; 
                                setTextarea(value) ;
                            }} />
                    <button onClick={onClick}> OK </button>
                </div> */}
            </div>
        </div>
    )
}

export default AboutFeed ; 