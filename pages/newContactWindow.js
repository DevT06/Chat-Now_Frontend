import styles from '../styles/ChatWindow.module.css';
import NewContactWindow from "@/components/NewContactWindow";

const NewContactWindowPage = () => {

    return (
        <div className={styles.chatWindowPage}>
            <NewContactWindow/>
        </div>
    );
};

export default NewContactWindowPage;
