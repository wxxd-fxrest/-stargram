import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Delete from '/Users/drizzle/stargram/src/img/instagram_delete.png' ; 

const Main = ({feed}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [textarea, setTextarea] = useState("") ;
    const [feedUser, setFeedUser] = useState([]) ;
    const url = `/feed/${feed.Data.UID}/${feed.DocID}` ; 
    const profileUrl = `/Profile/${feed.Data.displayName}/${feed.Data.UID}`
    const navigate = useNavigate();

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱ?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${feed.DocID}`)); 
        }
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
    }, []) ;

    const onProfileClick = (e) => {
        e.preventDefault()
        navigate(`/Profile/${feed.Data.displayName}/${feed.Data.UID}`);
    }

    const onFeedClick = (e) => {
        e.preventDefault()
        navigate(`/feed/${feed.Data.UID}/${feed.DocID}`);
    }

    // console.log(feedUser)
    // console.log(feed)
    // console.log(DocID)
    // console.log(userData)

    return (
        <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                {feed ? 
                <div className="Main">
                    <div onClick={onProfileClick} className="Main_profile">
                        <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                        <h6> {feedUser.displayName} </h6>
                    </div>
                    <img src={feed.Data.attachmentUrl} 
                        onClick={onFeedClick}/>

                    {feed.Data.UID == currentUser.uid ? 
                        <div>
                            <button onClick={onDelete} id="DeleteImg" style={{display:"none"}}> 삭제 </button> 
                            <label htmlFor="DeleteImg">
                                <img src={Delete} className="Main_delete"/>
                            </label> 
                        </div> : null}
                    <div className="Main_write">
                        <h6> {feedUser.displayName} </h6>
                        <h5> {feed.Data.message} </h5>
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