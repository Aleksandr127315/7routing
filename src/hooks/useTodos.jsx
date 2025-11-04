import { useState, useEffect } from 'react';
import { todosApi } from '../api/todos'; // твой API слой

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// Загрузка всех задач
	useEffect(() => {
		todosApi
			.getAll()
			.then(setTodos)
			.catch((err) => console.error('Ошибка при загрузке todos:', err));
	}, []);

	// Добавление новой задачи
	const addTodo = () => {
		if (!text.trim()) return;

		todosApi
			.create({ title: text })
			.then((newTodo) => {
				setTodos((prev) => [...prev, newTodo]);
				setText('');
			})
			.catch((err) => console.error('Ошибка при добавлении задачи:', err));
	};

	// Начало редактирования
	const startEdit = (todo) => {
		setEditingId(todo.id);
		setEditText(todo.title);
	};

	// Сохранение редактированной задачи
	const saveEdit = (id) => {
		if (!editText.trim()) return;

		todosApi
			.update(id, { title: editText })
			.then((updated) => {
				setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
				setEditText('');
				setEditingId(null);
			})
			.catch((err) => console.error('Ошибка при редактировании задачи:', err));
	};

	// Удаление задачи
	const deleteTodo = (id) => {
		todosApi
			.remove(id)
			.then(() => {
				setTodos((prev) => prev.filter((todo) => todo.id !== id));
			})
			.catch((err) => console.error('Ошибка при удалении задачи:', err));
	};

	// Сортировка / сброс сортировки
	const sortTodos = () => {
		setIsSorted((prev) => {
			const newSorted = !prev;

			if (newSorted) {
				setTodos((prevTodos) =>
					[...prevTodos].sort((a, b) => a.title.localeCompare(b.title)),
				);
			} else {
				todosApi
					.getAll()
					.then(setTodos)
					.catch((err) => console.error('Ошибка при сбросе сортировки:', err));
			}

			return newSorted;
		});
	};

	return {
		todos,
		text,
		setText,
		editingId,
		editText,
		setEditText,
		isSorted,
		searchTerm,
		setSearchTerm,
		addTodo,
		startEdit,
		saveEdit,
		deleteTodo,
		sortTodos,
	};
};
