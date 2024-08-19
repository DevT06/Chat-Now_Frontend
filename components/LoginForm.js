import React, {useState} from 'react';
import styles from '../styles/LoginForm.module.css';
import {useRouter} from 'next/router';
import {createUser, getUserByEmail} from "@/pages/api/user";
import {authUser} from "@/pages/api/userAuth";

const LoginPage = ({loginFunction}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const newUserId = await authUser(loginData);
            loginFunction(newUserId);
            alert('Login successful!');

        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();

        const registerData = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        };
        if (email.includes("@") && name.trim() !== "" && password.trim() !== "") {
            try {
                await createUser(registerData);
                const newUser = await getUserByEmail(email);
                loginFunction(newUser.id);
                alert('Register successful!');

            } catch (error) {
                console.error('Error:', error);
                alert('Register failed. Please try again. E-Mail may have already been used.');
            }
        } else {
            alert('Valid E-Mail, Name and password are required');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.logoContainer}>
                <img src="/Logo.png" alt="Chat-Now Logo" className={styles.logo}/>
                <h1 className={styles.title}>Login / Signup</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={false}/>
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
                <button type="submit" className={styles.button}>Login</button>
            </form>
            {/*<Link href="/register" className={styles.link}>Click <span
                className={styles.displayLinkBlue}>here</span> to go to the register page</Link>*/}
            <button type="submit" className={styles.buttonRegister} onClick={handleSubmitRegister}>Register</button>
        </div>
    );
};

export default LoginPage;
