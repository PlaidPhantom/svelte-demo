# A Quick Introduction to Svelte

A short overview of Svelte, its advantages, and ecosystem.

## 0. About

* A component-based web UI framework
* Website: https://svelte.dev/
* Created by Rich Harris, Graphics Editor @ New York Times
	* Responsible for all those cool Covid & Olympics Graphics
		* like [this one](./assets/graphic.mp4)
* intentionally styled to be very close to plain HTML & JS
* Moves as much work as possible _out_ of the browser and _into_ the compilation step.
* Had the highest satisfaction rating, most interest, and was one of the fastest-growing of any UI framework in the [2020 State of JS survey](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/).

## 1. The Basics

basic template: https://github.com/sveltejs/template

```shell
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
npm run dev
```

This component code:

```html
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
```

becomes (omitting boilerplate):

```

function create_fragment(ctx) {
	const block = {
		c: function create() {
			input = element("input");
			t3 = text(/*name*/ ctx[0]);
			button = element("button");
			button.textContent = "Reset";
		},
		m: function mount(target, anchor) {
			set_input_value(input, /*name*/ ctx[0]);

			listen_dev(input, "input", /*input_input_handler*/ ctx[2]);
			listen_dev(button, "click", /*reset*/ ctx[1], false, false, false);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
				set_input_value(input, /*name*/ ctx[0]);
			}

			if (dirty & /*name*/ 1) set_data_dev(t3, /*name*/ ctx[0]);
		},
	// [ ... ]

function instance($$self, $$props, $$invalidate) {
	let name = "World";

	function reset() {
		$$invalidate(0, name = "World");
	}

	function input_input_handler() {
		name = this.value;
		$$invalidate(0, name);
	}

	return [name, reset, input_input_handler];
}

```

## 2. Other Features

* reactivity (expressions & variables)
* built in transitions
* components
	* just uses JS import
	* props

## 3. SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a full application framework centered around Svelte. It provides filesystem-based routing as well as server-side rendering. SvelteKit uses various "adapters" to build the application for different hosted environments:

Currently provided adapters:

* Static website
* Node server
* Cloudflare Workers
* Netlify
* Vercel
* [Other community adapters](https://sveltesociety.dev/components/#adapters)


## 4. Nativescript

[Svelte Native](https://svelte-native.technology/) is a community-maintained flavor of [NativeScript](https://nativescript.org/), a multi-platform framework for building applications with HTML/CSS/JS that use native UI components (as opposed to rendering HTML in a web view, like Capacitor).

```shell
npm install -g nativescript
npx degit halfnelson/svelte-native-template my-mobile-app
cd my-mobile-app

npm install
ns run android
```


## 5. FAQs, etc.

	What about Typescript support?

The basic Svelte template includes a script to enable full Typescript support. This is a relatively new effort (within the last year or two), so some dev tooling may not yet be up to speed.

	What about other things Angular provides? e.g. Unit Testing or Dependency Injection

Svelte is focused on being a front-end UI framework. That means you are free to (or "have to", depending on your perspective) bring your own testing and/or DI setup.

[This Recipe](https://svelte-recipes.netlify.app/testing/) provides useful information on how to load a component programmatically for unit testing.

There are multiple JS libraries that provide
