import styles from '../../styles/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.lds_ripple}>
            <div></div>
            <div></div>
        </div>
    );
}

export default Loader;