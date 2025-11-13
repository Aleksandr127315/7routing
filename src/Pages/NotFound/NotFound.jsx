// src/pages/NotFound/NotFound.jsx
import { Link } from 'react-router-dom';
import styles from '../../App.module.css';

export const NotFound = () => (
	<div className={styles.main}>
		<h2>404 — Страница не найдена</h2>
		<Link to="/">Перейти на главную страницу</Link>
	</div>
);
