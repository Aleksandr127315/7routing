import { Link, Route, Routes, useNavigate, useParams, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { Routing } from '../Routing/Routing';
import { Button } from '../components/button/Button';
import { BASE_URL } from '../api/todos';
import { useEffect, useState } from 'react';

const Main = () => {
	return (
		<>
			{' '}
			<div className={styles.main}>Добро Пожаловать</div>
			<div className={styles.main}>
				Рад тебя видеть уважаемый пользователь этого Web-сайта меня зовут
				Мерзликин Александр , я наинающий Frontend-разработчик, учусь в школе{' '}
				<a href="https://lk.result-university.com" target="_blank">
					Result University.
				</a>
				{'  '}
			</div>
		</>
	);
};

const Contacts = () => {
	return (
		<div className={styles.main}>
			<a href="https://t.me/alexsandrmerz" target="_blank" className={styles.main}>
				Телеграмм
			</a>
		</div>
	);
};
const NotFound = () => {
	return (
		<div className={styles.main}>
			<h2>404 — Страница не найдена</h2>
			<Link to="/">Перейти на главную страницу</Link>
		</div>
	);
};
const Todo = () => {
	const navigate = useNavigate();
	const { id } = useParams(); // берем id из маршрута

	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		setError(null);

		fetch(`${BASE_URL}/${id}`)
			.then((res) => {
				if (!res.ok) {
					// если сервер вернул 404 или другую ошибку — переходим на 404
					throw new Error(`Not found (${res.status})`);
				}
				return res.json();
			})
			.then((data) => {
				if (!data || Object.keys(data).length === 0) {
					throw new Error('Задача не найдена');
				}
				setTask(data);
			})
			.catch((err) => {
				console.error('Ошибка при получении задачи:', err);
				setError(err.message);
				navigate('/404', { replace: true });
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	const back = () => navigate(-1);
	if (loading) return <div className={styles.main}>Загрузка...</div>;
	if (error) return <div>Ошибка:{error}</div>;
	if (!task) return <div>Задача не найдена</div>;
	return (
		<div className={styles.main}>
			<button onClick={back} aria-label="Назад" style={{ marginBottom: 12 }}>
				← Назад
			</button>
			<h2>Задача #{task.id}</h2>
			<p>
				<strong>Название:</strong> {task.title}
			</p>
		</div>
	);
};
export const App = () => {
	return (
		<div>
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
			<hr />
			<main>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/todos" element={<Routing />} />
					<Route path="/todos/:id" element={<Todo />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Routes>
			</main>
		</div>
	);
};
