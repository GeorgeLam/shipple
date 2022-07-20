<script>
  import Cell from "./Cell.svelte";

  export let state;
  export let title;

  const GRID_SIZE = 4;

  let grid = [];

  for (let y = 1; y <= GRID_SIZE; y++) {
    for (let x = 1; x <= GRID_SIZE; x++) {
      grid.push([x, y]);
    }
  }
</script>

<div class="grid-container">
  <h2>{title}</h2>
  <div class="grid">
    {#each grid as cell}
      <Cell coordinate={cell} state={state[cell[0]][cell[1]]} />
    {/each}
  </div>
</div>

<style>
  .grid {
    background-color: mediumpurple;
    height: 400px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
  }
</style>
