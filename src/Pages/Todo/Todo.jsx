import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { todosApi, BASE_URL } from '../../api/todos';
import styles from '../../App.module.css';

export const Todo = () => {
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
			.getAll()
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

	const handleDelete = async () => {
		try {
			await todosApi.remove(id);
			navigate('/todos', { replace: true });
		} catch (err) {
			console.error('Ошибка удаления:', err);
			setError('Ошибка при удалении');
		}
	};

	const handleEditNavigate = () => {
		navigate(`/todos/${id}/edit`);
	};

	const back = () => navigate('/todos', { replace: true });

	if (loading) return <div className={styles.main}>Загрузка...</div>;
	if (error) return <div className={styles.main}>Ошибка: {error}</div>;
	if (!task) return <div className={styles.main}>Задача не найдена</div>;

	return (
		<div className={styles.main}>
			<button onClick={back}>← Назад к страницу с задачами</button>

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
