import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Coment from "../Component/Coment";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Delete from '/Users/drizzle/stargram/src/img/instagram_delete.png' ; 

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
        <div className="AboutFeed">
            <button onClick={((e) => {
                    e.preventDefault() ;
                    navigate("/")
            })}> 이전 </button>
            {feed ? 
            <div>
                <div className="AboutFeed_Profile" 
                    onClick={(() => {navigate(`/Profile/${feed.displayName}/${feed.UID}`)})}>
                    <img src={userData.attachmentUrl} /> 
                    <p> {userData.displayName} </p>
                </div>
                <div className="AboutFeed_Feed">
                    <img src={feed.attachmentUrl} /> 
                    <div className="AboutFeed_Write">
                        <h3> {feed.displayName} </h3>
                        <p> {feed.message} </p>
                    </div>
                    {pathUID == currentUser.uid && 
                    <>
                        <button onClick={onDelete} id="DeleteImg" style={{display:"none"}}> 
                            삭제 
                        </button> 
                        <label htmlFor="DeleteImg">
                            <img src={Delete} className="AboutFeed_delete"/>
                        </label>
                    </>}
                </div>

                    <Coment feed={feed} pathDocID={pathDocID}/>
                <div className="AboutFeed_Input">
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