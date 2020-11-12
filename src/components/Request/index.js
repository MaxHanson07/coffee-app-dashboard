import React from 'react'
export default function RequestCard(props) {
    return (
        <div className="requestCard">
            <h2>
                {props.username}
            </h2>
            <p>
                {props.email}
            </p>
            <p>
                {props.cafe_name}
            </p>
            <p>
                {props.cafe_address}
            </p>
            <p>
                {props.notes}
            </p>
            <button onClick={()=>props.deleteRequest(props.id)}>Delete</button>
        </div>
    )
}