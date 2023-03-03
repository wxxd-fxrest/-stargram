import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import Attach from '/Users/drizzle/stargram/src/img/attach.png'

const Edit = () => {
    const [attachment, setAttachment] = useState("") ; 
    const [next, setNext] = useState(false) ; 
    const [messageText, setMessageText] = useState("") ; 
    const {currentUser} = useContext(AuthContext) ; 
    const [displayName, setDisplayName] = useState("") ; 
    const uuidv4ID = uuidv4()
    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault();

        let attachmentUrl = "" ; 
        let uploadTask ; 
        if(attachment !== "") {
            const attachmentRef = ref(storage, `images/${currentUser.uid + uuidv4()}`)
            uploadTask = uploadBytes(attachmentRef, attachment)
            await uploadString(attachmentRef, attachment, 'data_url')
        } ;
        setAttachment("") ; 
        setNext("") ;
        uploadTask.then(async (snapshot) => {
            attachmentUrl = await getDownloadURL(snapshot.ref)
            await updateDoc(doc(db, "Users", `${currentUser.uid}`), {
                attachmentUrl,
            })
        })
        navigate("/");
    } ;

    const onFileChange = (event) => {
        setAttachment(null) ;
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setAttachment(result) ; 
        } ;
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile) ; 
        }
    } ; 

    return (
        <div onSubmit={onSubmit}>
            <h3> edit </h3>
            <Link to="/">
                <button> 이전 </button>
            </Link>
            <div>
                <img src={attachment} width="500px" height="500px" />
                <input type="file"
                        style={{display:"none"}}
                        id="inputFile"
                        onChange={onFileChange}
                        required />
                <label htmlFor="inputFile">
                    <img src={Attach} alt="" />
                </label>
                <input type="submit" value="OK"/> 
            </div>
        </div>
    )
}

export default Edit ; 