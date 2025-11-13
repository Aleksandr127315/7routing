import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { todosApi, BASE_URL } from '../../api/todos';
import styles from '../../App.module.css';

export const EditTodo = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [completed, setCompleted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
			navigate(`/todos/${id}`);
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
