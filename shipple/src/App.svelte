<script>
  import { stateReducer, PREGAME, READY_TO_PLAY } from "./lib/stores.js";
  import Grid from "./lib/Grid.svelte";
  import Divider from "./lib/Divider.svelte";
  import Instructions from "./lib/Instructions.svelte";
</script>

<main>
  <h1>Shipple</h1>

  <div class="container">
    <Grid />
    <Divider />
    {#if $stateReducer.gamePhase === PREGAME || $stateReducer.gamePhase === READY_TO_PLAY}
      <Instructions />
    {:else}
      <Grid />
    {/if}
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
