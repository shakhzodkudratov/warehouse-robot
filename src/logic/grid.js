import { ref } from "vue";

export function useGrid(size) {
  const grid = ref(createGridBySize(size))

  function createGridBySize(n) {
    return [...Array(n).values()].map(() => [...Array(n).values()].map(() => null))
  }

  function coordsValid(coords) {
    return Array.isArray(coords) &&
      coords.length == 2 &&
      coords[0] >= 0 &&
      coords[0] < grid.value.length &&
      coords[1] >= 0 &&
      coords[1] < grid.value.length
  }

  function setItemByCoords(coords, item) {
    if (coordsValid(coords)) {
      grid.value[coords[0]][coords[1]] = item
      return true
    } else {
      return false
    }
  }

  function getItemByCoords(coords) {
    if (coordsValid(coords)) {
      return [true, grid.value[coords[0]][coords[1]]]
    } else {
      return [false, null]
    }
  }

  function moveItemByCoords(startCoords, endCoords) {
    if (!coordsValid(startCoords) || !coordsValid(endCoords)) {
      return false
    }

    if (startCoords[0] == endCoords[0] && startCoords[1] == endCoords[1]) {
      return false
    }

    if (getItemByCoords(startCoords)[1] == null) {
      return false
    }

    if (getItemByCoords(endCoords)[1] != null) {
      return false
    }

    setItemByCoords(endCoords, getItemByCoords(startCoords)[1])
    setItemByCoords(startCoords, null)
  }

  return {
    grid,
    coordsValid,
    setItemByCoords,
    getItemByCoords,
    moveItemByCoords,
  }
}
