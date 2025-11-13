import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Components/Layout/Layout';
import { Home } from './Pages/Home/Home';
import { TodosPage } from './Pages/TodosPage/TodosPage';
import { Todo } from './Pages/Todo/Todo';
import { EditTodo } from './Pages/Todo/EditTodo';
import { Contacts } from './Pages/Contacts/Contacts';
import { NotFound } from './Pages/NotFound/NotFound';

export const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todos" element={<TodosPage />} />
				<Route path="/todos/:id" element={<Todo />} />
				<Route path="/todos/:id/edit" element={<EditTodo />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</Layout>
	);
};
