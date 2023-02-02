

import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function Navbar({ friendName, backColor, friendPhoto, conversation }) {

    const [searchMessage, setSearchMessage] = useState([])

    useEffect(() => {
        if (conversation) {
            const collegesList = conversation.map((item) => { return { value: item.message, label: item.message } })
            setSearchMessage(collegesList);
        }
    }, [conversation])

    return (
        <nav className="navbar navbar-light" style={{ "borderRadius": "1rem", "backgroundColor": backColor }}>
            <div className="container-fluid">
                <div className="d-flex flex-row justify-content-center">
                    <img src={friendPhoto} alt='...' style={{ "borderRadius": "50%", "width": "75px" }} ></img>
                    <span className="mx-3 display-5">{friendName}</span>
                </div>
                {
                    searchMessage &&
                    <Select
                        options={searchMessage}
                        isClearable
                        isSearchable
                        styles={{
                            container: (base) => ({
                                ...base,
                                width: "40%",
                                minWidth: 400,
                                marginRight: "25px"
                            }),
                        }}
                    />
                }
            </div>
        </nav>
    )
}