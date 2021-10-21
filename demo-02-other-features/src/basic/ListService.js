// in a real-world use case, this would be hitting an API with fetch or something, eg:

/*
export async function getTodos() {
	var response = await fetch('https://example.com/some/endpoint');
	return await response.json();
}
*/

function sleep(ms) {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve(), ms);
	})
}

export async function getTodos() {
	await sleep(5000);
	return [
		{ id: 1, description: 'Item 1', completed: true },
		{ id: 2, description: 'Item 2', completed: false },
		{ id: 3, description: 'Item 3', completed: false },
		{ id: 4, description: 'Item 4', completed: false },
	];
}
