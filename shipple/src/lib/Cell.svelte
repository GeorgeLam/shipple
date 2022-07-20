<script>
  import Explosion from "./Explosion.svelte";
  import { stateReducer, PREGAME } from "./stores.js";
  import { sendEvent } from "./socket.js";

  let state;
  export let status;

  const unsubscribe = stateReducer.subscribe((value) => {
    state = value;
  });

  export let coordinate;

  const clickCell = (coordinate) => {
    const event = { Message: "fire", Coordinate: coordinate };
    sendEvent(state.websocket, event);
  };

  const getClasses = (coordinate, selectedCells) => {
    if (selectedCells[0] == undefined || selectedCells[1] === undefined) {
      return "";
    }
    const bow = selectedCells[0];
    const stern = selectedCells[1];
    if (coordinate === bow) {
      if (coordinate[0] === stern[0]) {
        // above or below
        return coordinate[1] < stern[1] ? "bow up" : "bow down";
      } else {
        // left or right
        return coordinate[0] < stern[0] ? "bow left" : "bow right";
      }
    } else if (coordinate === stern) {
      if (coordinate[0] === bow[0]) {
        // above or below
        return coordinate[1] < bow[1] ? "stern up" : "stern down";
      } else {
        // left or right
        return coordinate[0] < bow[0] ? "stern left" : "stern right";
      }
    }
  };

  const clickHandler =
    state.gamePhase === PREGAME ? stateReducer.placeShip : clickCell;

  const hit = false;
</script>

<div class="cell" on:click={() => clickHandler(coordinate)}>
  <h1>
    {#if status.hit && status.ship}💥{/if}
    {#if status.hit && !status.ship}💦{/if}
  </h1>
  {#if state.battleshipCells.includes(coordinate)}
    <div class={`ship ${getClasses(coordinate, state.battleshipCells)}`} />
  {/if}
  {#if hit}
    <Explosion />
  {/if}
</div>

<style>
  .cell {
    background-color: dodgerblue;
    width: 25%;
    height: 25%;
    border: 1px solid white;
    box-sizing: border-box;
    position: relative;
  }
  .ship {
    width: 40px;
    height: 40px;
    background-color: coral;
    position: absolute;
    border-radius: 50%;
    left: 30px;
    top: 30px;
  }
  .bow,
  .stern {
    height: 60px;
    left: unset;
    top: unset;
  }
  .bow {
    border-radius: 50% 50% 0 0;
  }
  .stern {
    border-radius: 10px 10px 0 0;
  }
  .left {
    transform: rotate(-90deg);
    right: 0;
    top: 20px;
  }
  .right {
    transform: rotate(90deg);
    left: 0;
    top: 20px;
  }
  .down {
    transform: rotate(180deg);
    top: 0;
    left: 30px;
  }
  .up {
    bottom: 0;
    left: 30px;
  }
</style>
