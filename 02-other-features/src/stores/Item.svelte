<script>
	export let id;

	import { getTodo, updateCompleted } from "./ListService";

	$: todo = getTodo(id);

	function completionChanged() {
		updateCompleted($todo.id, !$todo.completed);
	}
</script>

<style>
	.completed {
		text-decoration: line-through;
	}
</style>

<li>
	<label class:completed={$todo.completed}>
		<input
			type="checkbox"
			checked={$todo.completed}
			on:change={completionChanged} />
		{$todo.description}
	</label>
</li>
