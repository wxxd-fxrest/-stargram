import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Delete from '../img/instagram_delete.png' ; 

const Main = ({feed}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [feedUser, setFeedUser] = useState([]) ;
    const navigate = useNavigate();

    const onDelete = async() => {
        const ok = window.confirm("게시글을 삭제하시겠습니까?")
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


    