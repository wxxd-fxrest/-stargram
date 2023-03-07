import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Receive from "./Receive";

const Coment = ({pathDocID}) => {
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
    } ; 

    useEffect(() => {
        ComentDoc() ;
    }, []) ;

    // console.log("Coment Feed => ", feed)
    // console.log(feedUser)
    // console.log(coment)

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