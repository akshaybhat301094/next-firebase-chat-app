import React from 'react';
import { formatRelative } from 'date-fns';
import styles from '../styles/Message.module.css';

const Message = ({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
  uid = null,
  currentUserId = null,
}) => {
  return (
    <div
      className={`${styles.text_container} ${
        currentUserId === uid ? styles.floatRight : ''
      }`}
    >
      <div className={styles.img_container}>
        {photoURL ? (
          <img src={photoURL} alt='avatar' width={45} height={45} />
        ) : null}
      </div>
      <div className={styles.text_content}>
        {displayName ? (
          <span className={styles.user_name}>{displayName}</span>
        ) : null}
        {createdAt?.seconds ? (
          <span className={styles.last_seen}>
            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
          </span>
        ) : null}
        <p className={styles.text_msg}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
