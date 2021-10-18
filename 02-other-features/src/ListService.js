// in a real-world use case, this would be hitting an API with fetch or something, eg:

/*
export async function getTodos() {
	var response = await fetch('https://example.com/some/endpoint');
	return await response.json();
}
*/

function sleep(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve(), ms);
	})
}

export async function getTodos() {
	await sleep(500);
	return [
		{ description: 'Item 1', completed: true },
		{ description: 'Item 2', completed: false },
		{ description: 'Item 3', completed: false },
		{ description: 'Item 4', completed: false },
	];
}
