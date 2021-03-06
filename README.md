# A Quick Introduction to Svelte

A short overview of Svelte, its advantages, and ecosystem. Each section (except the first) has a corresponding demo in this repository.

## 0. About Svelte

* A component-based web UI framework
* Website: https://svelte.dev/
* Created by Rich Harris, Graphics Editor @ New York Times
	* Responsible for all those cool Election, Covid & Olympics Graphics in the last few years
		* like [this one](./assets/graphic.mp4)
* Moves as much work as possible _out_ of the browser runtime and _into_ the compilation process.
* Had the highest satisfaction rating, most interest, and was one of the fastest-growing of any UI framework in the [2020 State of JS survey](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/).

## 1. The Basic Idea

Basic Installation:

```shell
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
npm run dev
```

Svelte uses component files, and compiles them down to basic javascript. For example, this component:

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

```js

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

* simple syntax based on HTML & JS (with some $$ thrown in)
* reactive expressions & variables
* Components
	* just uses JS import
	* props & slots
* Stores
	* basic implementation of the "observable" pattern, such as is found in RxJS
	* Svelte accepts anything with a `.subscribe(val => {})` method, so RxJS observables will actually work!
* Motion & Tweening, Transitions, and Animations

## 3. SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a full application framework centered around Svelte. It provides filesystem-based routing as well as server-side rendering (including server-side API calls). SvelteKit uses various "adapters" to build the application for different hosted environments.

```shell
npm init svelte@next my-app
cd my-app
npm install
npm run dev -- --open
```

Currently provided adapters:

* Static website
* Node server
* Cloudflare Workers
* Netlify
* Vercel
* [Other community adapters](https://sveltesociety.dev/components/#adapters)


## 4. Nativescript

[Svelte Native](https://svelte-native.technology/) is a community-maintained flavor of [NativeScript](https://nativescript.org/), a multi-platform multi-framework toolkit for building applications with HTML/CSS/JS that use native UI components (as opposed to rendering HTML in a web view, like Capacitor).

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

	What about other things Angular provides? e.g. Unit Testing, Dependency Injection, form validation

Svelte is focused on being a front-end UI framework. That means you are free to (or "have to", depending on your perspective) bring your own testing and/or DI setup.

[This Recipe](https://svelte-recipes.netlify.app/testing/) provides useful information on how to load a component programmatically for unit testing.

[This Svelte library](https://www.npmjs.com/package/svelte-form-validation) provides form validation using the validation library [Yup](https://github.com/jquense/yup).

There are multiple JS libraries that provide DI/IoC containers (such as [Inversify](https://inversify.io/)).
