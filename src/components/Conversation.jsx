

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '../assets/Conversation.module.css'

import firebase from 'firebase/app';
import 'firebase/firestore'

export default function Conversation({ conversation, uniqueId }) {

    const params = useParams();
    const friendId = params.friendId;
    const adminId = params.adminId;
    const [conversationData, setConversation] = useState(null);

    useEffect(() => {
        if (conversation) {
            (async () => {
                const lastConversation = (conversation[(conversation.length) - 1].message);
                setConversation(conversation)
                await firebase.firestore().collection('lastConversation').doc(uniqueId).update({ lastMessage: lastConversation })
            })()
        } else {
            setConversation(null);
        }
    }, [conversation, uniqueId])

    return (
        <React.Fragment>
            <section className={style.section}>
                {
                    conversationData &&
                    conversationData.map((item, index) => {
                        return (
                            <React.Fragment>
                                {
                                    item.friendID === friendId &&
                                    <div className={style.friendBox}>
                                        <div className={style.friend}>
                                            <p>{item.message}</p>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    item.friendID === adminId &&
                                    <div className={style.adminBox}>
                                        <div className={style.admin}>
                                            <p>{item.message}</p>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })
                }
            </section>
        </React.Fragment>
    )
}