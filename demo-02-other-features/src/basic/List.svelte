<script>
	export let items = [];

	import Item from "./Item.svelte";

	$: numItems = items.length;
	$: openItems = items.filter((i) => !i.completed).length;

	let newItem = "";

	function addItem() {
		let adding = {
			id:
				Math.max.apply(
					null,
					items.map((i) => i.id)
				) + 1,
			description: newItem,
			completed: false,
		};

		items = [...items, adding];

		newItem = "";
	}

	function itemUpdated(item) {
		items = items;
	}
</script>

<p>Showing {numItems}, {openItems} are currently open.</p>
<ul>
	{#each items as item (item.id)}
		<Item {item} on:completionchange={itemUpdated} />
	{/each}
</ul>

<label>
	New Item:
	<input type="text" bind:value={newItem} />
	<button on:click={addItem}>Add</button>
</label>
