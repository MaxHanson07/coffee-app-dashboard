import React, { useEffect, useState } from 'react'
import RequestCard from '../components/Request/index.js'
import API from '../utils/API'

export default function Requests() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        loadRequests()
    }, [])

    function loadRequests() {
        API.getRequests()
            .then(res =>{
                console.log(res.data)
                setRequests(res.data)
            }
            )
            .catch(err => console.log(err));
    };

    function deleteRequest(id) {
        API.deleteRequest(id)
            .then(res => loadRequests())
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h2>Incoming Requests</h2>
            {
                requests.map((item) => (
                    <RequestCard
                        key={item._id}
                        id={item._id}
                        username={item.username}
                        email={item.email}
                        cafe_name={item.cafe_name}
                        cafe_address={item.cafe_address}
                        notes={item.notes}
                        deleteRequest={deleteRequest}
                    />
                ))
            }
        </div>
    )
}