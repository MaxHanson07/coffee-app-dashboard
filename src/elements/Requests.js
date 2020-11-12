import React, { useEffect, useState } from 'react'
import RequestCard from '../components/Request/index.js'
​
export default function Requests() {
    const [requests, setRequests] = useState([])
​
    useEffect(() => {
​
        // TODO - Replace with actual API call
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 800))
            setRequests([
                {title: 'Request 1', id: '123'}, 
                {title: 'Request 1', id: '124'}, 
                {title: 'Request 1', id: '125'}
            ])
        }
​
        loadData()
    }, [])
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