<script>
	import { onMount } from "svelte";
	import List from "./List.svelte";
	import { getTodos } from "./ListService";

	let todos = Promise.resolve([]);

	onMount(() => {
	  // note i'm not awaiting this!
	  todos = getTodos();
	});
</script>

<main>
	{#await todos}
		<img class="spinner" src="./circle-notch-solid.svg" alt="Please wait...">
	{:then items}
		<List {items} />
	{:catch error}
		<p>There was an error loading the items: {error}</p>
	{/await}
</main>
