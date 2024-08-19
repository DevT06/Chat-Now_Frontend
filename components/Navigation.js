import {useState} from 'react';
import styles from '../styles/Navigation.module.css';
import Link from "next/link";

const Navigation = ({currentChatUser}) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const toggleMenu1 = () => {
        setIsOpen1(!isOpen1);
    };
    const toggleMenu2 = () => {
        setIsOpen2(!isOpen2);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.menu}>
                <div className={styles.header}>
                    <h2>currentUser</h2>
                </div>
                <div className={styles.burger} onClick={toggleMenu1}>
                    <div className={`${styles.line} ${isOpen1 ? styles.line1Active : ''}`}></div>
                    <div className={`${styles.line} ${isOpen1 ? styles.line2Active : ''}`}></div>
                    <div className={`${styles.line} ${isOpen1 ? styles.line3Active : ''}`}></div>
                </div>
                <ul className={`${styles.navLinks} ${isOpen1 ? styles.navActive : ''}`}>
                    <li><Link href="#home">Home</Link></li>
                    <li><Link href="#about">Über uns</Link></li>
                    <li><Link href="#services">Dienstleistungen</Link></li>
                    <li><Link href="#contact">Kontakt</Link></li>
                </ul>
            </div>
            <div className={styles.menu}>
                <div className={styles.header}>
                    <h2>{currentChatUser}</h2>
                </div>
                <div className={styles.burger} onClick={toggleMenu2}>
                    <div className={`${styles.line} ${isOpen2 ? styles.line1Active : ''}`}></div>
                    <div className={`${styles.line} ${isOpen2 ? styles.line2Active : ''}`}></div>
                    <div className={`${styles.line} ${isOpen2 ? styles.line3Active : ''}`}></div>
                </div>
                <ul className={`${styles.navLinks} ${isOpen2 ? styles.navActive : ''}`}>
                    <li><Link href="#test">Test</Link></li>
                    <li><Link href="#about">Über uns</Link></li>
                    <li><Link href="#services">Dienstleistungen</Link></li>
                    <li><Link href="#contact">Kontakt</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
