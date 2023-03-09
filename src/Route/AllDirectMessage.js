import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const AllDirectMessage = () => {
    const {currentUser} = useContext(AuthContext) ;
    const [dmDoc, setDmDoc] = useState([]) ; 
    const navigate = useNavigate();

    const getDM = async() => {
        const FeedCollection = query(collection(db, "Users", `${currentUser.uid}`, "DM"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(),
                })
                // console.log(doc.data())
            });
            setDmDoc(feedArray) ; 
        });
    } ;

    const ii = () => {
        let arr = [] ;
        for(let i = 0; i < dmDoc.length; i++) {
            arr.push (
                <div key={i}>
                    {dmDoc[i] && 
                        <div style={{backgroundColor:"skyblue"}}
                            onClick={(() => { 
                                navigate(`/Dm/${dmDoc[i].DocID}/${currentUser.uid}`)
                            })}>
                            <p>{dmDoc[i].Data.opponentName}</p>
                            <p>{dmDoc[i].DocID}</p>
                        </div>}
                </div>
            )}
        return arr; 
    }

    useEffect(() => {
        getDM()
    }, []) ;

    return (
        <div>
            <h4>AllDirectMessage</h4>
            <button onClick={(() => {
                navigate("/")})}> 이전 </button>
            {ii()}
        </div>
    )
}
export default AllDirectMessage ;