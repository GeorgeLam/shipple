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

  import { initialiseWebsocket } from "./lib/socket";
  import { onMount } from "svelte";

  onMount(() => {
    initialiseWebsocket();
  });

  const mockState = {
    player1: {
      "1": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: true },
        "3": { hit: false, ship: true },
        "4": { hit: false, ship: false },
      },
      "2": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
      "3": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
      "4": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
    },
    player2: {
      "1": {
        "1": { hit: true, ship: true },
        "2": { hit: false, ship: true },
        "3": { hit: false, ship: true },
        "4": { hit: false, ship: false },
      },
      "2": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
      "3": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
      "4": {
        "1": { hit: true, ship: false },
        "2": { hit: false, ship: false },
        "3": { hit: false, ship: false },
        "4": { hit: false, ship: false },
      },
    },
  };
</script>

<main>
  <h1>Shipple</h1>

  {#if $stateReducer.gamePhase === WINNER}
    <Winning />
  {/if}

  <div class="container">
    <Grid state={mockState.player1} title={"Your Grid"} />
    <Divider />
    {#if $stateReducer.gamePhase === PREGAME || $stateReducer.gamePhase === READY_TO_PLAY}
      <Instructions />
    {:else}
      <Grid state={mockState.player2} title={"Enemy's Grid"} />
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
