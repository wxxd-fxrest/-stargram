import { async } from "@firebase/util";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import About from "../Component/About";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutFeed = () => {
    const {currentUser} = useContext(AuthContext) ;
    const location = useLocation() ;
    const [feed, setFeed] = useState("") ;
    const [userData, setUserData] = useState("") ;

    const pathname = location.pathname ; 
    const pathUID = (pathname.split('/')[2]);
    const pathDocID= (pathname.split('/')[3]);
    console.log("pathDocID => ", pathDocID, "pathUID => ", pathUID)

    const getFeed = async() => {
        onSnapshot(doc(db, "Feed", pathDocID), (doc) => {
            setFeed(doc.data())
        }) ;

        const docRef = doc(db, "Users", pathUID);
        const docSnap = await getDoc(docRef);
            setUserData(docSnap.data());
    } ;

    console.log("feed => ", feed)
    console.log("userData => ", userData)

    useEffect(() => {
        getFeed()
    }, []) ; 

    return (
        <div>
            <img src={userData.attachmentUrl} width="30px" height="30px" /> 
            <p> {userData.displayName} </p>
        </div>
    )
}

export default AboutFeed ; 