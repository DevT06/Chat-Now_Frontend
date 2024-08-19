import React, {useState} from 'react';
import styles from '../styles/RegisterForm.module.css';
import {createUser} from "@/pages/api/user";
import {router} from "next/client";
import Link from "next/link";


const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const registrationData = {
            name,
            email,
            password,
        };

        try {
            const data = await createUser(registrationData);
            alert('Registration successful!');
            router.push('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.logoContainer}>
                <img src="/Logo.png" alt="Chat-Now Logo" className={styles.logo}/>
                <h1 className={styles.title}>Register</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Register</button>
                <Link href="/login" className={styles.link}>Click <span
                    className={styles.displayLinkBlue}>here</span> to go to the register page</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
