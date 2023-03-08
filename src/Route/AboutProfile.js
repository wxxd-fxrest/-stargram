import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import YourProfile from "../Component/YourProfile";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AboutProfile = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [feedUser, setFeedUser] = useState([]) ;

    const [pathDmDocID, setPathDmDocID] = useState("") ; 
    const [currentDmDocID, setCurrentDmDocID] = useState("") ; 

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
            });
            setFeedUser(feedArray) ;
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

    // console.log(pathDmDocID)
    // console.log(currentDmDocID)

    useEffect(() => {
        getYourFeed() ;
    }, []) ;

    const onClickDM = async() => {
        if((pathUID !== pathDmDocID) && (`${currentUser.uid}` !== currentDmDocID)) {
            await setDoc(doc(db, "Users", `${pathUID}`, "DM", `${currentUser.uid}`), {
                opponentUID: pathUID,
            }) ;
            await setDoc(doc(db, "Users", `${currentUser.uid}`, "DM", `${pathUID}`), {
                opponentUID: currentUser.uid, 
            })
        } 
    }


    // console.log("pathDmDocID => ", pathDmDocID)
    // console.log("currentDmDocID => ", currentDmDocID)
    // console.log(feedUser)
    // console.log(dmDocID) 
    // console.log("pathUID => ", pathDmDocID) ; //8zKekI0LDPg11gJLgk82irMSrZf1 >> 상대방 
    // console.log("currentUser => ", currentDmDocID) ; //j8AKBlYVmtTV3pAJ7QR69dJRPEj2 >> login user

    return (
        <div>
            <button onClick={(() => {
                    navigate("/")})}> 이전 </button>
            <form onSubmit={((e) => {e.preventDefault()})}>
                <Link to={DmUrl}>
                    <span onClick={onClickDM}> DM </span>
                </Link>
                <p> {pathName} </p>
                {feedUser.map((f, ID) => (
                    <div key={ID}>
                        <YourProfile feedUser={f} pathUID={pathUID} />             
                    </div>
                ))}
            </form>
        </div>
    )
}

export default AboutProfile ; 




  // useEffect(() => {
    //     let DocID = `${pathUID, currentUser.uid}`
    //     const aa = async () => {
    //         const DirectMessage = query(collection(db, 'DM'), 
    //             where("UID", "==", `${DocID}`))
    //         const querySnapshot = await getDocs(DirectMessage);
    //         querySnapshot.forEach((doc) => {
    //             setDmDocID(doc.id)
    //         }); 
    //     }
    //     return() => {
    //         aa()
    //     }
    // }) ; 

    // const onClickDM = async() => {
    //     if(!dmDocID) {
    //         await addDoc(collection(db, "DM"), {
    //             UID: [pathUID, currentUser.uid]
    //         }) ;
    //     }
    //     if(dmDocID) {
    //         navigate(`/Dm/${pathUID}/${dmDocID}`) ;
    //     }
    // } ; 