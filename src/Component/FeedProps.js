import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import AboutFeed from "../Route/AboutFeed";

const FeedProps = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [sendUser, setSendUser] = useState("") ;

    const sendUserInfo = async () => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setSendUser(doc.data()) ;
        }); 
    }

    useEffect(() => {
        sendUserInfo() ;
    }, [])

    return (
        <AboutFeed sendUser={sendUser}/>
    )
}

export default FeedProps ; 