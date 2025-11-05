import { Link, Route, Routes, useNavigate, useParams, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { Routing } from '../Routing/Routing';
import { Button } from '../components/button/Button';
import { BASE_URL } from '../api/todos';
import { useEffect, useState } from 'react';
import { todosApi } from '../api/todos';

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
	const { id } = useParams();

	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		setError(null);

		todosApi
			.getAll() // можно заменить на fetch(`${BASE_URL}/${id}`), но оставляю как есть
			.then(() => fetch(`${BASE_URL}/${id}`))
			.then((res) => {
				if (!res.ok) throw new Error(`Not found (${res.status})`);
				return res.json();
			})
			.then((data) => {
				if (!data) throw new Error('Задача не найдена');
				setTask(data);
			})
			.catch((err) => {
				console.error('Ошибка загрузки задачи:', err);
				setError(err.message);
				navigate('/404', { replace: true });
			})
			.finally(() => setLoading(false));
	}, [id, navigate]);

	// ✅ КНОПКА УДАЛИТЬ (без confirm)
	const handleDelete = async () => {
		try {
			await todosApi.remove(id);
			navigate('/todos', { replace: true });
		} catch (err) {
			console.error('Ошибка удаления:', err);
			setError('Ошибка при удалении');
		}
	};

	// ✅ КНОПКА РЕДАКТИРОВАТЬ
	const handleEditNavigate = () => {
		navigate(`/todos/${id}/edit`);
	};

	const back = () => navigate('/todos', { replace: true });

	if (loading) return <div className={styles.main}>Загрузка...</div>;
	if (error) return <div className={styles.main}>Ошибка: {error}</div>;
	if (!task) return <div className={styles.main}>Задача не найдена</div>;

	return (
		<div className={styles.main}>
			<button onClick={back} style={{ marginBottom: 12 }}>
				на страницу с задачами
			</button>

			<h2>Задача #{task.id}</h2>
			<p>
				<strong>Название:</strong> {task.title}
			</p>

			<div style={{ marginTop: 20 }}>
				<button onClick={handleDelete} style={{ marginRight: 10 }}>
					Удалить
				</button>
				<button onClick={handleEditNavigate}>Редактировать</button>
			</div>
		</div>
	);
};
const EditTodo = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// загрузка задачи
	useEffect(() => {
		fetch(`${BASE_URL}/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error(`Задача не найдена (${res.status})`);
				return res.json();
			})
			.then((data) => {
				setTitle(data.title);
				setCompleted(Boolean(data.completed));
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await todosApi.update(id, { title, completed });
			navigate(`/todos/${id}`); // после редактирования возвращаемся на страницу задачи
		} catch (err) {
			console.error(err);
			setError('Не удалось сохранить изменения');
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className={styles.main}>Загрузка...</div>;
	if (error) return <div className={styles.main}>Ошибка: {error}</div>;

	return (
		<div className={styles.main}>
			<h2>Редактировать задачу #{id}</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 8 }}>
					<label>
						Название:{' '}
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit" style={{ marginRight: 8 }}>
					Сохранить
				</button>
				<button type="button" onClick={() => navigate(-1)}>
					Отмена
				</button>
			</form>
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
					<Route path="/todos/:id/edit" element={<EditTodo />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Routes>
			</main>
		</div>
	);
};
