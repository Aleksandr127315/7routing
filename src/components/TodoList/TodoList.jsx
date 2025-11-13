import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
	todos,
	editingId,
	editText,
	setEditText,
	startEdit,
	saveEdit,
	deleteTodo,
	searchTerm,
	highlightText,
}) => {
	// Фильтруем задачи по searchTerm
	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<ul>
			{filteredTodos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo} //задача
					editingId={editingId} //ид редактирования
					editText={editText} //текст редактирования
					setEditText={setEditText} //сосотояние редактирования текста
					startEdit={startEdit} //страт редактирования
					saveEdit={saveEdit} //сохранение редактирования
					deleteTodo={deleteTodo} //удаление задачи
					highlightText={highlightText} // функция подсвечивания текста
					searchTerm={searchTerm} //поле ввода
				/>
			))}
		</ul>
	);
};
