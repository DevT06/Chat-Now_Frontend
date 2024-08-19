import styles from '../styles/NewContactWindow.module.css';
import React from "react";


const NewContactWindow = () => {
    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
            </div>
            <img src="/Logo.png" alt="Chat-Now Logo" className={styles.logo}/>
        </div>
    );
}

export default NewContactWindow;
