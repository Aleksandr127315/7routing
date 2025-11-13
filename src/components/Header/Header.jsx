import { Link } from 'react-router-dom';
import styles from '../../App.module.css';

export const Header = () => {
	return (
		<header className={styles.app}>
			<div className={styles.header}>Проект с задачами и маршрутизацией</div>
			<nav>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/todos">Страница Задач</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты Для Связи</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
