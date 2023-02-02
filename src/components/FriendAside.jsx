

import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../assets/FriendAside.module.css'

import firebase from 'firebase/app';
import 'firebase/firestore'

export default function FriendAside({ friendId, friendName, friendPhoto, friendOnline }) {

    const params = useParams();
    const [lastMessage, setLastMessage] = useState();
    const adminId = params.adminId;
    const activeNavlink = { "backgroundColor": "#333", "color": "aliceBlue" }
    const onlineStatus = friendOnline ? { "color": "lightgreen" } : { "color": "red" };

    function generateConversationID(str1, str2) {
        if (str1 < str2)
            return (str1 + str2);
        else
            return (str2 + str1);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            (async () => {
                const conversationID = generateConversationID(adminId, friendId);
                const doc = await firebase.firestore().collection('lastConversation').doc(conversationID).get();
                setLastMessage(doc.data().lastMessage);
            })()
        }, 1000)
        return () => { clearInterval(intervalId) }
    }, [adminId, friendId])

    return (
        <section key={friendId}>
            <NavLink to={`${friendId}`} className={style.box} style={({ isActive }) => { return isActive ? activeNavlink : null }} >
                <i className={`fa-solid fa-circle fa-xs ${style.onlineStatusDot}`} style={onlineStatus}></i>
                <img src={friendPhoto} alt={friendPhoto} width="100px"></img>
                <div className={style.insideDiv}>
                    <h1 className={style.H1}>{friendName}</h1>
                    {
                        lastMessage &&
                        <small>{lastMessage}</small>
                    }
                </div>
            </NavLink>
        </section>
    )
}