<script>
	import { onMount } from "svelte";
	import Item from "./Item.svelte";
	import { loadTodos, addTodo, todos } from "./ListService";

	$: numTodos = $todos.length;
	$: openTodos = $todos.filter((i) => !i.completed).length;

	let newItem = "";

	function addItem() {
		addTodo({
			description: newItem,
			completed: false,
		});

		newItem = "";
	}

	onMount(() => {
		loadTodos();
	});
</script>

<main>
	{#if !$todos.length}
		<img
			class="spinner"
			src="./circle-notch-solid.svg"
			alt="Please wait..." />
	{:else}
		<p>Showing {numTodos}, {openTodos} are currently open.</p>
		<ul>
			{#each $todos as { id }}
				<Item {id} />
			{/each}
		</ul>

		<label>
			New Item:
			<input type="text" bind:value={newItem} />
			<button on:click={addItem}>Add</button>
		</label>
	{/if}
</main>
