import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import DirectMessage from "../Route/DirectMessage";

const Dm = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [textarea, setTextarea] = useState("") ;
    const [pathUserInfo, setPathUserInfo] = useState([]) ; 
    const [currentUserInfo, setCurrentUserInfo] = useState([]) ; 
    const [loginMessage, setLoginMessage] = useState([]) ; 
    // const [pathtMessage, setPathtMessage] = useState([]) ; 
    const location = useLocation() ;
    const navigate = useNavigate();

    const pathname = location.pathname ; 
    const pathUID= (pathname.split('/')[2]);
    const currentUID = (pathname.split('/')[3]);
    // console.log(pathUID)
    // console.log(currentUID)

    const getPathInfo = async () => {
        const pathUser = doc(db, "Users", pathUID);
        const pathUserSnap = await getDoc(pathUser);
            setPathUserInfo(pathUserSnap.data()) ; 
        const currentUser = doc(db, "Users", currentUID);
        const currentUserSnap = await getDoc(currentUser);
            setCurrentUserInfo(currentUserSnap.data()) ; 

        const currentMessage = query(collection(db, "Users", `${currentUID}`, "DM", `${pathUID}`, "DirectMessage"), 
            orderBy("date", "asc"));
        onSnapshot(currentMessage, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    Data: doc.data(), 
                })
            });
            setLoginMessage(feedArray)
        });

        // const pathMessage = query(collection(db, "Users", `${pathUID}`, "DM", `${currentUID}`, "DirectMessage"), 
        //     orderBy("date", "asc"));
        // onSnapshot(pathMessage, (querySnapshot) => {
        //     let feedArray = []
        //     querySnapshot.forEach((doc) => {
        //         feedArray.push({
        //             Data: doc.data(), 
        //         })
        //     });
        //     setPathtMessage(feedArray)
        // });
    } ;

    // console.log(loginMessage)
    // console.log(pathtMessage)

    // console.log(pathUserInfo)
    // console.log(currentUserInfo)

    useEffect(() => {
        getPathInfo()
    }, []) ; 

    const onClick = async() => {
        await addDoc(collection(db, "Users", `${pathUID}`, "DM", `${currentUID}`, "DirectMessage"), {
            RecevieName : pathUserInfo.displayName, 
            SendName : currentUserInfo.displayName,
            SendUID : currentUser.uid,
            sendMessage : textarea, 
            date: Timestamp.now(),
        })
        await addDoc(collection(db, "Users", `${currentUID}`, "DM", `${pathUID}`, "DirectMessage"), {
            RecevieName : currentUserInfo.displayName,
            ReceiveUID : currentUser.uid,
            SendName : pathUserInfo.displayName, 
            sendMessage : textarea, 
            date: Timestamp.now(),
        })
        setTextarea("") ;
    } ;

    return (
        <div>
            <p> DirectMessage </p>
            <button onClick={((e) => {
                    e.preventDefault() ;
                    navigate("/")
                })}> 이전 </button>
            <h6> {pathUserInfo.displayName} </h6>
            {loginMessage.map((m, ID) => (
                <div key={ID}>
                    <DirectMessage loginMessage={m} />
                </div> 
            ))}
            
            <input type="textarea"
                    name="textarea"
                    placeholder="댓글"
                    required 
                    value={textarea}
                    onChange={(e) => {
                        const {target : {value}} = e ; 
                        setTextarea(value) ;
                    }} />
            <button onClick={onClick}> OK </button>
        </div>
    )
}

export default Dm ; 