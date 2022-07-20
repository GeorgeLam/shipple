<script>
  import { fly, fade } from "svelte/transition";

  let visible = true;

  setTimeout(() => {
    visible = false;
  }, 800);
</script>

{#if visible}
  <h1 in:fly out:fade>💣 Attack!!💣</h1>
{/if}

<style>
  h1 {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1;
    margin: 0 auto;
    transform: translate(-50%, -50%);
  }
</style>
