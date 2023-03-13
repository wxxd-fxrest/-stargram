import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore"; 
import { auth, db, storage } from "../firebase.js";
import { getDownloadURL, uploadBytes, uploadString, ref } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Attach from '/Users/drizzle/stargram/src/img/attach.png'
import Profile from '/Users/drizzle/stargram/src/img/profile.jpg' ; 

const SignUp = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false) ; 
    const [email, setEmail] = useState("") ; 
    const [password, setPassword] = useState("") ; 
    const [displayName, setDisplayName] = useState("") ; 
    const [attachment, setAttachment] = useState("") ; 
    const uuidv4ID = uuidv4()

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

    const onChange = (event) => {
        const {target : {name, value}} = event ; 
        if (name == "displayName") {
            setDisplayName(value) ; 
        } else if (name == "email") {
            setEmail(value) ;
        } else if (name == "password") {
            setPassword(value) ; 
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();

        try {
            const data = await createUserWithEmailAndPassword(auth, email, password) ; 
            console.log(data) ; 
            let attachmentUrl = "" ; 
            let uploadTask ; 
            if(attachment !== "") {
                const attachmentRef = ref(storage, `images/${data.user.uid + uuidv4()}`)
                uploadTask = uploadBytes(attachmentRef, attachment)
                await uploadString(attachmentRef, attachment, 'data_url')
            } ;
            uploadTask.then(async (snapshot) => {
                attachmentUrl = await getDownloadURL(snapshot.ref) ;
                await setDoc(doc(db, "Users", `${data.user.uid}`), {
                    uid: data.user.uid, 
                    displayName, 
                    email,
                    attachmentUrl,
                })
            })
            navigate("/");
        } catch (err) {
            alert("다시 확인해주세요. (ex, 이미 가입된 정보 또는 이미 사용 중인 이메일입니다.)") ;
            setErr(true) ;
        }
    }

    return (
        <div className="SignUp">
            <h4> Instagram </h4>
            <div className="SignUp-back">
                <button onClick={((e) => {
                        e.preventDefault() ;
                        navigate("/Auth")
                    })}> 이전 </button>
            </div>
            <form onSubmit={onSubmit}>
                <div className="profile-sellect">
                    {attachment ? 
                    <img src={attachment} /> : 
                    <div className="profile-sellect">
                        <img src={Profile} /> 
                        <p> 프로필 사진을 선택해주세요. </p>
                    </div>}
                    <input type="file"
                            style={{display:"none"}}
                            id="inputFile"
                            onChange={onFileChange}
                            required />
                    <label htmlFor="inputFile">
                        <img src={Attach} alt="" />
                    </label>
                </div>
                <input type="text"
                        name="displayName"
                        placeholder="Display name"
                        required 
                        value={displayName}
                        onChange={onChange} />
                <input type="email"
                        name="email"
                        placeholder="Email"
                        required 
                        value={email}
                        onChange={onChange} />
                <input type="password"
                        name="password"
                        placeholder="Password"
                        required 
                        value={password}
                        onChange={onChange} />
                <button className="SingupBtn"> Sign Up </button>
            </form>
        </div>
    )
}

export default SignUp ;
