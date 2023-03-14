import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Coment from "../Component/Coment";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Delete from '../img/instagram_delete.png' ; 

const AboutFeed = ({sendUser}) => {
    const {currentUser} = useContext(AuthContext) ;
    const location = useLocation() ;
    const [feed, setFeed] = useState("") ;
    const [textarea, setTextarea] = useState("") ;
    const [userData, setUserData] = useState("") ;
    const navigate = useNavigate();


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
    } ;

    const onDelete = async() => {
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${pathDocID}`)); 
            navigate("/") ;
        }
    } ;

    const onClick = async() => {
        if(sendUser) {
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
        } else {
            alert("잠시후 다시 시도해주세요.") ;
            navigate("/") ;
        }
    } ;

    useEffect(() => {
        getFeed()
    }, []) ; 

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
                    <div className="AboutFeed_X">
                        <button onClick={onDelete} id="DeleteImg" style={{display:"none"}}> 
                            삭제 
                        </button> 
                        <label htmlFor="DeleteImg">
                            <img src={Delete} className="AboutFeed_delete"/>
                        </label>
                    </div>}
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