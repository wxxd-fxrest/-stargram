import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Coment from "../Component/Coment";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutFeed = () => {
    const {currentUser} = useContext(AuthContext) ;
    const location = useLocation() ;
    const [feed, setFeed] = useState("") ;
    const [textarea, setTextarea] = useState("") ;
    const [userData, setUserData] = useState("") ;
    const navigate = useNavigate();

    const [sendUser, setSendUser] = useState("") ;

    const pathname = location.pathname ; 
    const pathUID = (pathname.split('/')[2]);
    const pathDocID= (pathname.split('/')[3]);

    const getFeed = async() => {
        onSnapshot(doc(db, "Feed", pathDocID), (doc) => {
            setFeed(doc.data())
        }) ;
        
        const docRef = doc(db, "Users", pathUID);
        const docSnap = await getDoc(docRef);
            setUserData(docSnap.data());

        const getUserData = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setSendUser(doc.data()) ;
        }); 
    } ;

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱㄱ??")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${pathDocID}`)); 
        }
        navigate("/") ;
    } ;

    const onClick = async() => {
        await addDoc(collection(db, "Feed", `${pathDocID}`, "Coment"), {
            FeedDocID : pathDocID, 
            Coment : textarea, 
            ReceiveName : feed.displayName,
            ReceiveUID : feed.UID,
            SendName : sendUser.displayName, 
            SendUID : currentUser.uid, 
            SendPhotoURL : sendUser.attachmentUrl,
            date: Timestamp.now(),
        })
        setTextarea("") ;
    } ;

    useEffect(() => {
        getFeed()
    }, []) ; 

    // console.log("feed => ", feed)
    // console.log("userData => ", userData)
    // console.log(userData2)
    // console.log(sendUser)
    // console.log("pathDocID => ", pathDocID, "pathUID => ", pathUID)

    return (
        <div>
            <Link to="/">
                <button> 이전 </button>
            </Link>
            {feed ? 
            <div>
                <img src={userData.attachmentUrl} width="30px" height="30px" /> 
                <p> {userData.displayName} </p>
                <div>
                    <img src={feed.attachmentUrl} width="300px" height="300px" /> 
                    <p> {feed.message} </p>
                    {pathUID == currentUser.uid && <button onClick={onDelete}> 삭제 </button> }
                </div>
                <Coment feed={feed} pathDocID={pathDocID}/>
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
                </div>
            </div> : null}

        </div>
    )
}

export default AboutFeed ; 