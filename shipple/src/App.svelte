<script>
  import {
    stateReducer,
    PREGAME,
    READY_TO_PLAY,
    WINNER,
  } from "./lib/stores.js";
  import Grid from "./lib/Grid.svelte";
  import Divider from "./lib/Divider.svelte";
  import Instructions from "./lib/Instructions.svelte";
  import Winning from "./lib/Winning.svelte";
</script>

<main>
  <h1>Shipple</h1>

  {#if $stateReducer.gamePhase === WINNER}
    <Winning />
  {/if}

  <div class="container">
    <Grid />
    <Divider />
    {#if $stateReducer.gamePhase === PREGAME || $stateReducer.gamePhase === READY_TO_PLAY}
      <Instructions />
    {:else}
      <Grid />
    {/if}
  </div>
  <button class="reset" on:click={stateReducer.reset}>Play again</button>
</main>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .reset {
    background-color: #ecf0f1;
    margin-top: 40px;
  }
</style>
