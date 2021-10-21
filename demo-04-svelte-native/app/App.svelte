<script lang="typescript">
  import { ImageSource } from "@nativescript/core/image-source";

  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  import { Template } from "svelte-native/components";

  import { loadTodos, addTodo, todos, updateCompleted } from "./ListService";

  let progress = tweened(0, { duration: 1000, easing: cubicOut });

  $: {
    progress.set(
      ($todos.filter((i) => i.completed).length * 100.0) / $todos.length || 0
    );
  }

  let newItem = "";

  let spinnerImg;

  function addItem() {
    addTodo({
      description: newItem,
      completed: false,
    });

    newItem = "";
  }

  function pageLoad() {
    console.log("page loaded");
    spinnerImg = ImageSource.fromResource("circle-notch-solid");
  }

  function toggleCompleted(event) {
    const item = $todos[event.index];

    updateCompleted(item.id, !item.completed);
  }
</script>

<style>
  .completed {
    opacity: 0.5;
    text-decoration: line-through;
  }
</style>

<page on:navigatedTo={pageLoad}>
  <actionBar title="Svelte Native App" />

  {#if !$todos.length}
    <image class="spinner" imageSource={spinnerImg} />
  {:else}
    <dockLayout>
      <stackLayout dock="bottom">
        <label text="New Item:" class="h3" />

        <gridLayout rows="auto" columns="*,auto">
          <textField
            bind:text={newItem}
            hint="New Todo..."
            flexGrow="1"
            row="0"
            col="0" />
          <button text="Add" on:tap={addItem} flexGrow="0" row="0" col="1" />
        </gridLayout>
      </stackLayout>

      <gridLayout dock="top" rows="auto" columns="*">
        <progress value={$progress} />
      </gridLayout>

      <scrollView>
        <listView items={$todos} on:itemTap={toggleCompleted}>
          <Template let:item>
            <stackLayout orientation="horizontal" transition:fade>
              <label
                class:completed={item.completed}
                class="h2"
                text={item.description} />
            </stackLayout>
          </Template>
        </listView>
      </scrollView>
    </dockLayout>
  {/if}
</page>
