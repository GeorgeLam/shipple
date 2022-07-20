<script>
  import { stateReducer, PREGAME } from "./stores";

  let state;

  const unsubscribe = stateReducer.subscribe((value) => {
    state = value;
  });
</script>

<div class="container">
  <h2>Welcome</h2>
  <p>Select two adjacent cells to place your ship</p>
  <button
    class="ready-button"
    disabled={state.gamePhase === PREGAME}
    on:click={stateReducer.startGame}>I'm ready</button
  >
</div>

<style>
  .container {
    background-color: orchid;
    height: 600px;
    width: 400px;
  }
  .ready-button:disabled {
    opacity: 0.5;
  }
  .ready-button:disabled:hover {
    border: none;
  }
  .ready-button {
    background-color: aquamarine;
  }
</style>
