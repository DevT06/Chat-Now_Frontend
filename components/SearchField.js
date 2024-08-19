import styles from '../styles/ChatApp.module.css';
import React from "react";

export default function Searchbar({query, onChange}) {


    return (
        <>
            <input className={styles.search} value={query} onChange={onChange} type="text" placeholder="Search"/>

        </>
    )
}