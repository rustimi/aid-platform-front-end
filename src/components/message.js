import React from 'react';
export default function MessageComponent({ body, isSent, isSeen, time }) {
    return (
        <div className={`message p-2 rounded bg-primary-subtle mb-2 w-75 ${isSent ? 'align-self-end':''}`}>
            <div className='message-content'>{body}</div>
            <div className='message-info'>
                {isSent && <div className='message-seen float-end'>{isSeen ? 'seen': ''}</div>}
                <div className='message-time float-start'>{time}</div>
            </div>
        </div>
        )
}