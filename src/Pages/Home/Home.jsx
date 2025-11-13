import styles from '../../App.module.css';

export const Home = () => {
	return (
		<>
			<div className={styles.main}>Добро Пожаловать</div>
			<div className={styles.main}>
				Рад тебя видеть уважаемый пользователь этого Web-сайта! Меня зовут
				Мерзликин Александр, я начинающий Frontend-разработчик, учусь в школе{' '}
				<a
					href="https://lk.result-university.com"
					target="_blank"
					rel="noreferrer"
				>
					Result University
				</a>
				.
			</div>
		</>
	);
};
