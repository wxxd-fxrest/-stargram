import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Receive from "./Receive";

const Coment = ({pathDocID}) => {
    const {currentUser} = useContext(AuthContext) ; 
    const [coment, setComent] = useState([]) ; 

    const ComentDoc = async() => {
        const FeedCollection = query(collection(db, "Feed", `${pathDocID}`, "Coment"), 
            orderBy("date", "asc"));
        onSnapshot(FeedCollection, (querySnapshot) => {
            let feedArray = []
            querySnapshot.forEach((doc) => {
                feedArray.push({
                    DocID: doc.id, 
                    Data: doc.data(), 
                })
            });
            setComent(feedArray)
        });


    }
    // console.log(coment)

    useEffect(() => {
        ComentDoc() ;
    }, []) ;

    // console.log("Coment Feed => ", feed)
    // console.log(feedUser)
    return (
        <div>
            {coment.map((c, ID) => (
                <div key={ID}>
                    <Receive coment={c} pathDocID={pathDocID} />
                </div> 
            ))}
        </div>
    )
}

export default Coment ; 