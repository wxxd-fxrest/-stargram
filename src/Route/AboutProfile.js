import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import YourProfile from "../Component/YourProfile";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutProfile = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;
    const [feedUserUID, setFeedUserUID] = useState([]) ;

    const [pathDmDocID, setPathDmDocID] = useState("") ; 
    const [currentDmDocID, setCurrentDmDocID] = useState("") ; 

    const [getPathInfo, setGetPathInfo] = useState([]) ;
    const [getCurrentInfo, setGetCurrentInfo] = useState([]) ; 

    const location = useLocation() ;
    const navigate = useNavigate();

    const pathname = location.pathname ; 
    const pathName= (pathname.split('/')[2]);
    const pathUID= (pathname.split('/')[3]);

    const DmUrl = `/Dm/${pathUID}/${currentUser.uid}`

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
                setFeedUserUID(doc.data())
            });
            setFeedUser(feedArray) ;
        });

        const getPathData = query(collection(db, "Users"), where("uid", "==", `${pathUID}`));
            const querySnapshot = await getDocs(getPathData);
            querySnapshot.forEach((doc) => {
                setGetPathInfo(doc.data())
        }); 

        const getCurrentData = query(collection(db, "Users"), where("uid", "==", `${currentUser.uid}`));
            const querySnapshot2 = await getDocs(getCurrentData);
            querySnapshot2.forEach((doc) => {
                setGetCurrentInfo(doc.data())
        }); 

        const getPathDM = query(collection(db, "Users", `${pathUID}`, "DM"), 
            where("opponentUID", "==", `${pathUID}`));
        onSnapshot(getPathDM, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPathDmDocID(doc.id) 
            });
        });

        const getCurrentDM = query(collection(db, "Users", `${currentUser.uid}`, "DM"), 
            where("opponentUID", "==", `${currentUser.uid}`));
        onSnapshot(getCurrentDM, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setCurrentDmDocID(doc.id)
            });
        });
    } ;

    useEffect(() => {
        getYourFeed() ;
    }, []) ;

    const onClickDM = async() => {
        if((pathUID !== pathDmDocID) && (`${currentUser.uid}` !== currentDmDocID)) {
            await setDoc(doc(db, "Users", `${pathUID}`, "DM", `${currentUser.uid}`), {
                opponentUID: currentUser.uid, 
                opponentName: getCurrentInfo.displayName, 
            }) ;
            await setDoc(doc(db, "Users", `${currentUser.uid}`, "DM", `${pathUID}`), {
                opponentUID: pathUID,
                opponentName: getPathInfo.displayName, 
            })
        } 
    }
    // console.log(getPathInfo)
    // console.log("pathDmDocID => ", pathDmDocID) ;
    // console.log("currentDmDocID => ", currentDmDocID)
    // console.log(feedUser) ;
    // console.log(dmDocID) 
    // console.log("pathUID => ", pathDmDocID) ; //8zKekI0LDPg11gJLgk82irMSrZf1 >> 상대방 
    // console.log("currentUser => ", currentDmDocID) ; //j8AKBlYVmtTV3pAJ7QR69dJRPEj2 >> login user

    return (
        <div className="AboutProfile">
            <button onClick={(() => {
                navigate("/")})}> 이전 </button>
            <form onSubmit={((e) => {e.preventDefault()})} className="AboutProfile_form">
                {feedUserUID.UID == currentUser.uid ? null : 
                <div className="AboutProfile_DM_Div">
                    <Link to={DmUrl} className="AboutProfile_DM">
                        <span onClick={onClickDM} > DM 보내기 </span>
                    </Link>
                </div>}
                <div className="AboutProfile_Profile">
                    <img src={getPathInfo.attachmentUrl} />
                    <p> {pathName} </p>
                </div>
                {feedUser.map((f, ID) => (
                    <div key={ID} className="AboutProfile_Props">
                        <YourProfile feedUser={f} pathUID={pathUID} />             
                    </div>
                ))}
            </form>
        </div>
    )
}

export default AboutProfile ; 