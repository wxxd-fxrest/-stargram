import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import Coment from "../Component/Coment";


const Profile = ({feed, userData}) => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;
    const url = `/feed/${feed.Data.UID}/${feed.DocID}` ; 

    const getLoginUser = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${feed.Data.UID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setFeedUser(doc.data()) ;
        }); 
    } ;

    useEffect(() => {
        getLoginUser() ;
    }, []) ;

    const onDelete = async() => {
        const ok = window.confirm("삭제 ㄱ?")
        if(ok) {
            await deleteDoc(doc(db, "Feed", `${feed.DocID}`)); 
        }
    } ;

    // console.log(feed)

    return (
        <div>
            {currentUser.uid === feed.Data.UID ?
            <div>
            {feed ? 
                <div className="Main">
                    <Link to={url}>
                        <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                        <h6> {feed.Data.displayName} </h6>
                    </Link>
                    <img alt="" src={feed.Data.attachmentUrl} width="200px" height="200px" />
                    <h5> {feed.Data.message} </h5>
                    <Coment feed={feed}/>
                    <button onClick={onDelete}> 삭제 </button>
                </div> : null }
            </div> : null}
        </div>
    )
}

export default Profile ; 