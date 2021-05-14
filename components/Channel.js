import Message from './Message';
import React, { useState, useEffect, useRef } from 'react';
import firebase from '../data/firebase';
import styles from '../styles/Channel.module.css';

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { uid, displayName, photoURL } = user;

  const bottomListRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    console.log(user);
    if (db) {
      const unsubscribe = db
        .collection('messages')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot((querySnapshot) => {
          // Get all documents from collection - with ids
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(data);
        });

      return unsubscribe;
    }
  }, [db]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection('messages').add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });

      setNewMessage('');

      bottomListRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  return (
    <>
      <ul className={styles.chatWindow}>
        {messages.map((message) => (
          <li key={message.id} className={styles.chatMessage}>
            <Message {...message} currentUserId={uid} />
          </li>
        ))}
      </ul>

      <div ref={bottomListRef} />

      <div className={styles.input_container}>
        <form onSubmit={handleOnSubmit} className={styles.form}>
          <input
            className={styles.textbox}
            ref={inputRef}
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message here...'
          />
          <button
            className={styles.submit}
            type='submit'
            disabled={!newMessage}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Channel;
