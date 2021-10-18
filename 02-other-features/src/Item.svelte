<script>
	export let item;

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function completionChanged() {
	  let completed = item.completed;

	  dispatch("completionchange", item);
	}
</script> 

<li>
	<label class:completed={item.completed}>
		<input type="checkbox" bind:checked={item.completed} on:change={completionChanged}>
		{item.description}
	</label>
</li>

<style>
	.completed {
	  text-decoration: line-through;
	}
</style>
