import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
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
    const location = useLocation() ;
    const navigate = useNavigate();

    const pathname = location.pathname ; 
    const pathUID= (pathname.split('/')[2]);
    const currentUID = (pathname.split('/')[3]);

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
    } ;

    useEffect(() => {
        getPathInfo()
    }, []) ; 

    const onClick = async() => {
        if(textarea !== "") {
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
        }
        setTextarea("") ;
    } ;

    return (
        <div className="DM">
            <div className="DM_back">
                <p> {pathUserInfo.displayName} </p>
                <button onClick={((e) => {
                        e.preventDefault() ;
                        navigate("/")
                    })}> 이전 </button>
            </div>
            <div className="DM_v">
                {loginMessage.map((m, ID) => (
                    <div key={ID} className="Dm_props">
                        <DirectMessage loginMessage={m}/>
                    </div> 
                ))}
            </div>
            <div className="DM_input">
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
        </div>
    )
}

export default Dm ; 