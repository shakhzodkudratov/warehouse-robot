<template>
  <div class="board">
    <div class="grid">
      <div class="grid-row" v-for="(row, rowIndex) in grid" :key="rowIndex">
        <Cell
            class="grid-cell"
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :cell="cell"
            :coords="[rowIndex, cellIndex]"
            :robot="robotInstance"
        />
      </div>
    </div>
    <div>
      <h1>Robot Warehouse</h1>
      <p>To move robot use Arrow keys. To grab or drop crate use Space key. You can use controls below to control robot.</p>
      <hr>
      <button @click="robotInstance.command('N')">Move Up (N)</button>
      <button @click="robotInstance.command('E')">Move Right (E)</button>
      <button @click="robotInstance.command('S')">Move Down (S)</button>
      <button @click="robotInstance.command('W')">Move Left (W)</button>
      <hr>
      <button @click="robotInstance.command('N W')">Move Up+Left (N W/W N)</button>
      <button @click="robotInstance.command('N E')">Move Up+Right (N E/E N)</button>
      <button @click="robotInstance.command('S W')">Move Down+Left (S W/W S)</button>
      <button @click="robotInstance.command('S E')">Move Down+Right (S E/E S)</button>
      <hr>
      <button @click="robotInstance.command('G')">Grab (G)</button>
      <button @click="robotInstance.command('D')">Drop (D)</button>
      <hr>
      <form @submit.prevent="robotInstance.command(customCommand)">
        <input type="text" placeholder="Custom command" v-model="customCommand" />
        <button type="submit">Execute</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGrid } from "./logic/grid.js";
import { useRobot } from "./logic/robot.js";
import { Crate } from "./logic/crate.js";
import Cell from "./components/Cell.vue";

const gridSize = 10
const customCommand = ref('')

const gridInstance = useGrid(gridSize)
const { grid } = gridInstance
gridInstance.setItemByCoords([9, 0], new Crate())
gridInstance.setItemByCoords([4, 4], new Crate())
const robotInstance = useRobot(gridInstance)

const keyMappings = {
  'ArrowUp': 'N',
  'ArrowRight': 'E',
  'ArrowDown': 'S',
  'ArrowLeft': 'W'
}

document.addEventListener('keydown', (e) => {
  if (e.target.nodeName == 'INPUT') {
    return
  }

  if (e.key in keyMappings) {
    robotInstance.command(keyMappings[e.key])
  } else if (e.code == 'Space') {
    if (robotInstance.mode.value == 'drop') {
      robotInstance.command('G')
    } else {
      robotInstance.command('D')
    }
  }
})
</script>

<style>
.board {
  display: flex;
  gap: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(gridSize), 40px);
  grid-template-rows: repeat(v-bind(gridSize), 40px);
}

.grid-cell {
  height: 100%;
  width: 100%;
  border: 1px solid black;
}
</style>
