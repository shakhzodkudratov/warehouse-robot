import { ref } from "vue";
import {Crate} from "./crate.js";

export function useRobot(grid, initialCoords) {
  const coords = ref([0, 0])
  const mode = ref('drop')
  const liftedItem = ref(null)

  if (grid.coordsValid(initialCoords)) {
    coords.value = initialCoords
  }

  function setCoords(newCoords) {
    if (!grid.coordsValid(newCoords)) {
      return false
    }

    if (liftedItem.value != null) {
      if (grid.getItemByCoords(newCoords)[1] != null) {
        return false
      } else {
        grid.moveItemByCoords(coords.value, newCoords)
      }
    }

    coords.value = newCoords
    return true
  }

  function getDirectionCoords(direction) {
    const newCoords = [...coords.value]

    switch (direction) {
      case 'N':
        newCoords[1]--
        break
      case 'E':
        newCoords[0]++
        break
      case 'S':
        newCoords[1]++
        break
      case 'W':
        newCoords[0]--
        break
    }

    return newCoords
  }

  function move(direction) {
    const newCoords = getDirectionCoords(direction)

    if (newCoords[0] == coords.value[0] && newCoords[1] == coords.value[1]) {
      return [false, newCoords]
    }

    return [setCoords(newCoords), newCoords]
  }

  function getCurrentItem() {
    return grid.getItemByCoords(coords.value)[1]
  }

  function grab() {
    const currentItem = getCurrentItem()

    if (currentItem instanceof Crate) {
      liftedItem.value = currentItem
      mode.value = 'grab'
    }
  }

  function drop() {
    liftedItem.value = null
    mode.value = 'drop'
  }

  function command(commandsRaw) {
    if (typeof commandsRaw != 'string') {
      return false
    }

    const commands = commandsRaw.split(' ')

    for (const command of commands) {
      if (['N', 'E', 'S', 'W'].includes(command)) {
        move(command)
      } else if (command == 'G') {
        grab()
      } else if (command == 'D') {
        drop()
      }
    }

    return true
  }

  return {
    coords,
    mode,
    liftedItem,
    command,
  }
}
