

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import style from "../assets/HomePage.module.css"

import firebase from "firebase/app";
import "firebase/firestore";

export default function HomePage() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [toggleMe, setToogleMe] = useState(true)

    async function onSubmitHandler(event) {
        event.preventDefault();
        const snapshot = await firebase.firestore().collection('friends').where("friendId", "==", userID).get();
        if (snapshot.docs.length > 0) {
            console.log(snapshot.docs)
            console.log(snapshot.docs[0])
            const doc = snapshot.docs[0].data();
            const docId = snapshot.docs[0].id;

            navigate(`/reactChatWeb/${doc.friendId}`);
            await firebase.firestore().collection('friends').doc(docId).update({ friendOnline: true })
        } else {
            console.log('No Such Id exist')
        }
    }

    return (
        <React.Fragment>
            <main className={style.homeMain}>
                <section className={style.homeSection}>
                    <img className={style.homeImg} src="https://i.pinimg.com/originals/8d/96/52/8d9652b07ed5d008190d4e98e73cba6e.png" alt="friends"></img>
                    <form className={style.homeForm} onSubmit={onSubmitHandler}>
                        <small>
                            <i>"When I was growing up, I didn’t have a normal mom and dad, or a regular family like everybody else, and I always knew that something was missing. But now I’m standing here today, knowing that I have everything I’m ever gonna need… You are my family"</i>
                            <br></br>
                            <strong><i>- Phoebe</i></strong>
                        </small>
                        <input onChange={(e) => { setUserID(e.target.value) }} value={userID} type="text" className="form-control my-3" id="inputEmail3" placeholder="Enter ID" required/>
                        <div className='d-flex justify-content-between w-100' >
                            <button type="submit" className="btn btn-outline-dark">My Friends </button>
                            <button type="button" onClick={() => { setUserID('') }} className="btn btn-outline-danger">Clear </button>
                        </div>
                        <div className="w-100 text-center">
                            <button onClick={() => { setToogleMe((preVal) => { return !preVal }) }} type="button" className="btn btn-primary my-3" style={{ "fontWeight": "bold" }}>? </button>
                            <div className={style.friendsId} hidden={toggleMe ? true : false}>
                                <p> Friends Ids </p>
                                <small> 2Ben | 10Jeo | 12Lily | 19Shally </small>
                            </div>
                        </div>
                    </form>
                </section>
            </main>

        </React.Fragment>
    )
}