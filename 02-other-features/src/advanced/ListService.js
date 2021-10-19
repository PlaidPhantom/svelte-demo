import { writable, derived } from 'svelte/store';

function sleep(ms) {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve(), ms);
	})
}

export const todos = writable([]);

export async function loadTodos() {
	await sleep(500);

	todos.set([
		{ id: 1, description: 'Item 1', completed: true },
		{ id: 2, description: 'Item 2', completed: false },
		{ id: 3, description: 'Item 3', completed: false },
		{ id: 4, description: 'Item 4', completed: false },
	]);
}

export function addTodo(todo) {
	todos.update(t => {
		todo.id = Math.max.apply(null, t.map(t => t.id)) + 1;

		return [...t, todo];
	});
}

export function getTodo(id) {
	return derived(todos, ts => {
		return ts.find(t => t.id === id);
	})
}

export function updateCompleted(id, completed) {
	todos.update(ts => {
		ts.find(t => t.id === id).completed = completed;
		return [...ts];
	});
}
