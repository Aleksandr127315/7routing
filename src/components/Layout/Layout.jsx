import { Header } from '../Header/Header';
import styles from '../../App.module.css';

export const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<hr />
			<main className={styles.main}>{children}</main>
		</div>
	);
};
