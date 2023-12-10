import styles from './Button.module.css'

function Button({children, type, handleOnClick}) {
    return (
        <button onClick={handleOnClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
    )
}

export default Button;
