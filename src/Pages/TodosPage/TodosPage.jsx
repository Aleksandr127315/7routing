import { useTodos } from '../../Hooks/useTodos';
import { Input } from '../../Components/Input/Input';
import { Button } from '../../Components/Button/Button';
import { TodoList } from '../../Components/TodoList/TodoList';
import styles from './TodosPage.module.css';
export const TodosPage = () => {
	const {
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
	} = useTodos();

	const highlightText = (text, highlight) => {
		if (!highlight) return text;
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
		return parts.map((part, i) =>
			part.toLowerCase() === highlight.toLowerCase() ? (
				<mark key={i}>{part}</mark>
			) : (
				part
			),
		);
	};

	return (
		<div className={styles.container}>
			<h1>Список задач</h1>

			{/* Поиск задач */}
			<Input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Поиск..."
				className={styles.input}
			/>

			{/* Добавление и сортировка */}
			<div className={styles.todos}>
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Добавить задачу..."
					className={styles.input}
				/>
				<Button className={styles.button} onClick={addTodo}>
					Добавить
				</Button>
				<Button onClick={sortTodos} className={styles.button}>
					{!isSorted ? 'Отсортировать по алфавиту' : 'Сбросить сортировку'}
				</Button>
			</div>

			{/* Список задач */}
			<TodoList
				todos={todos}
				editingId={editingId}
				editText={editText}
				setEditText={setEditText}
				startEdit={startEdit}
				saveEdit={saveEdit}
				deleteTodo={deleteTodo}
				searchTerm={searchTerm}
				highlightText={highlightText}
			/>
		</div>
	);
};
