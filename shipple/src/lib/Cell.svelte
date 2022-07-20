<script>
    export let coordinate;

    const clickCell = (coordinate) => {
        alert(coordinate)
    }
</script>

<div class="cell" on:click={() => clickCell(coordinate)}>{coordinate}</div>

<style>
    .cell{
        background-color: #ecf0f1;
        width: 25%;
        height: 25%;
        border: 1px solid white;
        box-sizing: border-box;
    }
</style>