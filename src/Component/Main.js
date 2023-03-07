import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const Main = ({feed}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [textarea, setTextarea] = useState("") ;
    const [feedUser, setFeedUser] = useState([]) ;
    const url = `/feed/${feed.Data.UID}/${feed.DocID}` ; 
    const profileUrl = `/Profile/${feed.Data.displayName}/${feed.Data.UID}`

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

    // console.log(feedUser)
    // console.log(feed)
    // console.log(DocID)
    // console.log(userData)

    return (
        <form onSubmit={(e) => {e.preventDefault()}}>
            <div>
                {feed ? 
                <div className="Main">
                    <Link to={profileUrl}>
                        <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                        <h6> {feedUser.displayName} </h6>
                    </Link>
                    <Link to={url}>
                        <img src={feed.Data.attachmentUrl} width="200px" height="200px" />
                    </Link>
                    <h5> {feed.Data.message} </h5>
                    {feed.Data.UID == currentUser.uid ? 
                        <button onClick={onDelete}> 삭제 </button> : null}
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