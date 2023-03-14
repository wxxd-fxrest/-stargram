import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import Delete from '../img/instagram_delete.png' ; 

const Profile = ({feed, userData}) => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;
    const navigate = useNavigate();

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

    return (
        <div>
            {currentUser.uid === feed.Data.UID ?
            <div>
            {feed ? 
                <div className="Profile">
                    <div className="Profile_Profile">
                        <img src={feedUser.attachmentUrl} width="30px" height="30px" /> 
                        <h6> {feed.Data.displayName} </h6>
                    </div>
                    <img src={feed.Data.attachmentUrl}
                        onClick={(() => {
                            navigate(`/feed/${feed.Data.UID}/${feed.DocID}`)
                        })}/>
                    <div className="Profile_Write">
                        <h6> {feed.Data.displayName} </h6>
                        <h5> {feed.Data.message} </h5>
                    </div>
                    <button onClick={onDelete} id="DeleteImg" style={{display:"none"}}> 삭제 </button>
                    <label htmlFor="DeleteImg">
                        <img src={Delete} className="Profile_Delete"/>
                    </label>
                </div> : null }
            </div> : null}
        </div>
    )
}

export default Profile ; 