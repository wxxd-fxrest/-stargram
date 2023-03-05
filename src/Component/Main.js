import { addDoc, arrayRemove, collection, deleteDoc, deleteField, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import AboutFeed from "../Route/AboutFeed";
import Profile from "../Route/Profile";
import Coment from "./Coment";
import Attach from '/Users/drizzle/stargram/src/img/attach.png'

const Main = ({feed, userData}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [textarea, setTextarea] = useState("") ;
    const [feedUser, setFeedUser] = useState([]) ;
    const url = `/feed/${feed.Data.UID}/${feed.DocID}` ; 

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱ?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${feed.DocID}`)); 
        }
    } ;

    const onClick = async() => {
        await addDoc(collection(db, "Feed", `${feed.DocID}`, "Coment"), {
            FeedDocID : feed.DocID, 
            Coment : textarea, 
            ReceiveName : feed.Data.displayName,
            ReceiveUID : feed.Data.UID,
            SendName : userData.displayName, 
            SendUID : currentUser.uid, 
            SendPhotoURL : userData.attachmentUrl,
            date: Timestamp.now(),
        })
        setTextarea("") ;
    } ;

    const getLoginUser = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${feed.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setFeedUser(doc.data()) ;
        }); 
    } ;

    useEffect(() => {
        getLoginUser()
    }, [])

    // http://localhost:3000/feed/user1/unK5tTmBBTfVpfX993dGIXXzGU42

    // console.log(feed)
    // console.log(DocID)
    // console.log(userData)

    // profile 사진 클릭 시 해당 유저 프로필로 이동 >>  const url = `/feed/${feed.Data.displayName}/${feed.Data.UID}` ; 
    return (
        <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                <Link to={url}>
                    <p> link </p>
                </Link>
                {feed ? 
                <div className="Main">
                    <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                    <h6> {feedUser.displayName} </h6>
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
                    </div>
                </div> : null } 
            </div>
        </form>
    )
} ;

export default Main ; 


    //기존 Feed code >> 저장된 데이터 가져오기
    // onSnapshot(collection(db, 'Feed'), (snapshot) => {
    //     let feedArray = snapshot.docs.map(doc => ({
    //         ...doc.data(),
    //     }))
    //     setFeed(feedArray)
    // })

    //기존 Main code >> 저장된 데이터 출력하기
    // const feedAll = () => {
    //     let arr = [] ;
    //     if(feed) {
    //         for(let i = 0; i < feed.length; i++) {
    //             arr.push(
    //                 <div key={i}>
    //                 {feed ? 
    //                     <div className="Main" >
    //                         <h6> {feed[i].displayName} </h6>
    //                         <img alt="" src={feed[i].attachmentUrl} width="200px" height="200px" />
    //                         <h5> {feed[i].message} </h5>
    //                         {feed[i].UID == currentUser.uid ? 
    //                             <div>
    //                                 <h4 value={feed[i].UUID}> {feed[i].UUID} </h4>
    //                                 <button value={feed[i]} 
    //                                         > 삭제 </button>
    //                             </div> : null}
    //                     </div> : null }
    //                 </div>
    //             )}}
    //     return arr ;
    // } ;

    //기존 Write code >> 데이터 저장하기
    // const feedUpload = doc(db, "Feed", "M4koF3uOGI9p59cmDrJG")
    // return updateDoc(feedUpload, {
    //         messages : arrayUnion({
    //             UID: currentUser.uid,
    //             displayName: displayName, 
    //             message: messageText, 
    //             UUID: uuidv4ID, 
    //             date: Timestamp.now(),
    //             attachmentUrl,
    //     })
    // })