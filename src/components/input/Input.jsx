import styles from './Input.module.css';

export const Input = ({ value, onChange, placeholder, className }) => {
	return (
		<input
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`${styles.input} ${className || ''}`}
		/>
	);
};
