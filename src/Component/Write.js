import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Attach from '/Users/drizzle/stargram/src/img/attach.png'
import { arrayUnion, collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

const Write = () => {
    const [attachment, setAttachment] = useState("") ; 
    const [next, setNext] = useState(false) ; 
    const [messageText, setMessageText] = useState("") ; 
    const {currentUser} = useContext(AuthContext) ; 
    const uuidv4ID = uuidv4()

    const onSubmit = async(event) => {
        event.preventDefault();

        let attachmentUrl = "" ; 
        if(attachment !== "") {
            const attachmentRef = ref(storage, `images/${currentUser.uid + uuidv4()}`)
            uploadBytes(attachmentRef, attachment)
            await uploadString(attachmentRef, attachment, 'data_url').then((url) => {
                console.log(url)
            }) 
        } ;
    
        setMessageText("") ; 
        setAttachment("") ; 
        const feedUpload = doc(db, "Feed", currentUser.uid)
        await updateDoc(feedUpload, {
                messages : arrayUnion({
                    senderId: currentUser.uid,
                    text: messageText, 
                    UUID: uuidv4ID, 
                    date: Timestamp.now(),
                    attachmentUrl,
            })
        })
    }

    const onClickNext = () => {
        if (attachment) {
            setNext(true) 
        } else if(!attachment) {
            alert("사진을 선택해주세요.")
        }
    }

    const onChange = (event) => {
        const {target : {value}} = event ; 
        setMessageText(value) ; 
    }

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

    return(
        <div>
            <form onSubmit={onSubmit}>
                <Link to="/">
                    <button> 이전 </button>
                </Link>
                <h4> Write </h4>
                {/* {next ? 
                <div> 
                    <img src={attachment} width="200px" height="200px" />
                    <input type="textarea" 
                            placeholder="message..."
                            value={messageText || ''}
                            onChange={onChange}/>
                    <button> 다음 </button>
                </div> :
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
                    <button onClick={onClickNext}> 다음 </button>
                </div> } */}

                    <img src={attachment} width="500px" height="500px" />
                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile">
                        <img src={Attach} alt="" />
                    </label>
                    <input type="textarea" 
                            placeholder="message..."
                            value={messageText || ''}
                            onChange={onChange}/>
                    <input type="submit" value="OK"/>
            </form>
        </div>
    )
}

export default Write ; 