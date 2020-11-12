import React, { useEffect, useState } from 'react'
import RequestCard from '../components/Request/index.js'
​
export default function Requests() {
    const [requests, setRequests] = useState([])
​
    useEffect(() => {
        loadRequests()
    }, [])

    function loadRequests(){ 
        API.getRequests()
          .then(res => 
            setRequests(res.data)
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
                        key={item.id}
                        title={item.title}
                    />
                ) )
            }
        </div>
    )
}