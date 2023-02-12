import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../assets/Admin.module.css'

import firebase from 'firebase/app';
import 'firebase/firestore'

export default function Admin({ adminName, adminPhoto, adminId }) {

    const navigate = useNavigate();

    async function onLogOutHandler() {
        const snapshot = await firebase.firestore().collection('friends').where('friendId', '==', adminId).get();
        const docId = snapshot.docs[0].id;
        console.log(docId)
        await firebase.firestore().collection('friends').doc(docId).update({ friendOnline: false })
        navigate('/');
    }

    return (
        <React.Fragment>
            <div className={style.box}>
                <img src={adminPhoto} alt={adminPhoto} style={{ "width": "75px", "borderRadius": "1rem" }}></img>
                <div className={style.insideDiv}>
                    <h1 className={style.H1}>{adminName}</h1>
                </div>
                <div className={style.outsideDiv}>
                    <button onClick={onLogOutHandler} type="button" className="btn btn-danger my-2"><i className="fa-solid fa-right-from-bracket"></i> &nbsp; Logout</button>
                </div>
            </div>
            <hr></hr>
        </React.Fragment>
    )
}