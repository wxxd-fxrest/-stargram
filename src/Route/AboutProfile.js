import { collection, doc, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import YourProfile from "../Component/YourProfile";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutProfile = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;
    const [pathDmDocID, setPathDmDocID] = useState([]) ; 
    const [currentDmDocID, setCurrentDmDocID] = useState([]) ; 
    const location = useLocation() ;

    const pathname = location.pathname ; 
    const pathName= (pathname.split('/')[2]);
    const pathUID= (pathname.split('/')[3]);

    const DmUrl = `/Dm/:uid/:DmDocID`

    const getYourFeed = async() => {
        const FeedCollection = query(collection(db, "Feed"), 
            where("UID", "==", `${pathUID}`), 
            orderBy("date", "desc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setFeedUser(feedArray) ;
        });

        const a = query(collection(db, "Users", `${pathUID}`, "DirectMessage"), 
            where("UID", "==", `${pathUID}`));
        onSnapshot(a, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setPathDmDocID(feedArray) ;
        });

        const b = query(collection(db, "Users", `${currentUser.uid}`, "DirectMessage"), 
            where("UID", "==", `${currentUser.uid}`));
        onSnapshot(b, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
            });
            setCurrentDmDocID(feedArray) ;
        });
    } ;

    // console.log("pathUID => ", pathDmDocID) ; //8zKekI0LDPg11gJLgk82irMSrZf1 >> 상대방 
    // console.log("currentUser => ", currentDmDocID) ; //j8AKBlYVmtTV3pAJ7QR69dJRPEj2 >> login user

    useEffect(() => {
        getYourFeed() ;
    }, []) ;

    const onClickDM = async() => {
        if((pathUID !== pathDmDocID) && (`${currentUser.uid}` !== currentDmDocID)) {
            await setDoc(doc(db, "Users", `${pathUID}`, "DirectMessage", `${currentUser.uid}`), {
                UID: pathUID,
            }) ;
            await setDoc(doc(db, "Users", `${currentUser.uid}`, "DirectMessage", `${pathUID}`), {
                UID: currentUser.uid, 
            })
        } 
    }

    // console.log("pathUID => ", pathUID)
    // console.log(feedUser)

    return (
        <div>
            <Link to="/">
                <button> 이전 </button>
            </Link>
            <Link to={DmUrl}>
                <button onClick={onClickDM}> DM </button>
            </Link>
            <p> {pathName} </p>
            {feedUser.map((f, ID) => (
                <div key={ID}>
                    <YourProfile feedUser={f} pathUID={pathUID} />             
                </div>
            ))}
        </div>
    )
}

export default AboutProfile ; 