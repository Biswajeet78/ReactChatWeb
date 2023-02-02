
import style from "../assets/ChatLayout.module.css"
import FriendAside from "./FriendAside"
import { Outlet, useParams } from 'react-router-dom'
import Admin from "./Admin"
import { useEffect, useState } from "react"

import firebase from "firebase/app";
import "firebase/firestore";

export default function ChatLayout() {

    const params = useParams();
    const adminId = params.adminId;
    const [friendData, setFriendData] = useState([])
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        (async () => {
            const adminSnapshot = await firebase.firestore().collection('friends').where('friendId', '==', adminId).get();
            setAdminData(adminSnapshot.docs[0].data());
        })();

        const intervalId = setInterval(async () => {
            const tempSnapshot = [];
            const friendsSnapshot = await firebase.firestore().collection('friends').where('friendId', '!=', adminId).get();
            friendsSnapshot.docs.forEach((doc) => {
                tempSnapshot.push(doc.data())
            });
            if (tempSnapshot) {
                setFriendData(tempSnapshot);
            }

        }, 1000)

        return () => { clearInterval(intervalId) }
        // })();

    }, [adminId])

    return (
        <main className={style.main}>
            <section className={style.section}>
                <aside className={style.aside}>

                    {
                        adminData &&
                        <Admin
                            adminId={adminData.friendId}
                            adminName={adminData.friendName}
                            adminPhoto={adminData.friendPhoto}
                        />
                    }

                    <h1 className="display-6 text-center my-5"><i className="fa-solid fa-heart-pulse"></i> Friend List</h1>

                    {
                        friendData &&
                        friendData.map((item) => {
                            return (
                                <FriendAside
                                    friendId={item.friendId}
                                    friendName={item.friendName}
                                    friendPhoto={item.friendPhoto}
                                    friendLastMsg="Hello Buddy"
                                    backColor={item.backColor}
                                    friendOnline={item.friendOnline}
                                    lastMessage={item.lastMessage}
                                />
                            )
                        })
                    }
                </aside>
                <div className={style.chatBox}>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}