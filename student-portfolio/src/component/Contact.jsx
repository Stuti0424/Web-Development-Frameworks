import { useState } from 'react';

function Contact() {
    const [message, setMessage] = useState('');

    return (
        <div>
            <h2>Contact Me</h2>
            <input
                id="message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <p>{message}</p>
            <p>character Count={message.length}</p>
        </div>
    );
}

export default Contact;