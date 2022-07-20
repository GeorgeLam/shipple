<script>
  import { stateReducer, PREGAME } from "./stores.js";

  let state;

  const unsubscribe = stateReducer.subscribe((value) => {
    state = value;
  });

  console.log(state);

  export let coordinate;

  const clickCell = (coordinate) => {
    alert(coordinate);
  };

  const clickHandler =
    state.gamePhase === PREGAME ? stateReducer.placeShip : clickCell;
</script>

<div class="cell" on:click={() => clickHandler(coordinate)}>
  {coordinate}
  {#if state.battleshipCells.includes(coordinate)}
    SHIP
  {/if}
</div>

<style>
  .cell {
    background-color: #ecf0f1;
    width: 25%;
    height: 25%;
    border: 1px solid white;
    box-sizing: border-box;
  }
</style>
