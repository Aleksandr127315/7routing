import styles from './Button.module.css';

export const Button = ({ children, onClick, className }) => {
	return (
		<button onClick={onClick} className={`${styles.button} ${className || ''}`}>
			{children}
		</button>
	);
};
