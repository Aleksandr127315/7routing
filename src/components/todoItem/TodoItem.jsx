import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todo, highlightText, searchTerm }) => {
	return (
		<li className={styles.li}>
			<div className={styles.titleContainer}>
				<Link
					to={`/todos/${todo.id}`}
					className={styles.title}
					title={todo.title}
				>
					{highlightText ? highlightText(todo.title, searchTerm) : todo.title}
				</Link>
			</div>
		</li>
	);
};
