import { useTodos } from '../hooks/useTodos';
import { Input } from '../components/input/Input';
import { Button } from '../components/button/Button';
import { TodoList } from '../components/TodoList';
import styles from './Routing.module.css';

export const Routing = () => {
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
			<h1>My Todos</h1>

			<Input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Поиск..."
				className={styles.input}
			/>

			<div className={styles.todos}>
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Добавить задачу..."
					className={styles.input}
				/>
				<Button className={styles.button} onClick={addTodo}>
					добавить
				</Button>
				<Button onClick={sortTodos} className={styles.button}>
					{!isSorted
						? 'отсортировать по алфавиту'
						: 'отменить сортировку по алфавиту'}
				</Button>
			</div>

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
