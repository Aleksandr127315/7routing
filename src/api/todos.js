export const BASE_URL = 'http://localhost:3005/todos';

export const todosApi = {
	getAll() {
		return fetch(BASE_URL).then((res) => res.json());
	},

	create(todo) {
		return fetch(BASE_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(todo),
		}).then((res) => res.json());
	},

	update(id, data) {
		return fetch(`${BASE_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then((res) => res.json());
	},

	remove(id) {
		return fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});
	},
};
