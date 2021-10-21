<script>
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	import Item from "./Item.svelte";

	import { loadTodos, addTodo, todos } from "./ListService";

	let progress = tweened(0, { duration: 1000, easing: cubicOut });

	$: {
		progress.set(
			$todos.filter((i) => i.completed).length / $todos.length || 0
		);
	}

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
		<progress value={$progress} />
		<ul>
			{#each $todos as item (item.id)}
				<Item id={item.id} />
			{/each}
		</ul>

		<label>
			New Item:
			<input type="text" bind:value={newItem} />
			<button on:click={addItem}>Add</button>
		</label>
	{/if}
</main>
