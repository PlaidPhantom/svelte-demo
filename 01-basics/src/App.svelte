<script>
	let name = "World";

	function reset() {
	  name = "World";
	}
</script>

<main>
	<label>
		What's your name? <input bind:value={name} />
	</label>
	<h1>Hello {name}!</h1>
	<button on:click={reset}>Reset</button>
</main>

<style>
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 240px;
	  margin: 0 auto;
	}

	h1 {
	  color: #ff3e00;
	  text-transform: uppercase;
	  font-size: 4em;
	  font-weight: 100;
	}

	@media (min-width: 640px) {
	  main {
	    max-width: none;
	  }
	}
</style>
