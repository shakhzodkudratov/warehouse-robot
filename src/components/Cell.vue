<template>
  <div class="cell">
    <img v-if="isRobot" class="robot" src="../assets/industrial-robot.png" alt="Robot">
    <img
        v-if="isCrate"
        class="crate"
        :class="{
          'crate-lifted': isLifted,
        }"
        src="../assets/product.png"
        alt="Crate"
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Crate } from "../logic/crate.js";

const props = defineProps({
  cell: {
    type: Object,
    default: null
  },
  coords: {
    type: Array,
    default: null
  },
  robot: {
    type: Object,
    default: null
  },
})

const isCrate = computed(() => props.cell instanceof Crate)
const isRobot = computed(() =>
    props.coords[0] == props.robot.coords.value[0] &&
    props.coords[1] == props.robot.coords.value[1]
)
const isLifted = computed(() => props.robot.liftedItem.value != null && props.robot.liftedItem.value == props.cell)
</script>

<style>
.cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.robot {
  height: 20px;
  width: 20px;
}

.crate {
  height: 20px;
  width: 20px;
}

.crate-lifted {
  position: absolute;
  height: 10px;
  width: 10px;
  top: 10px;
  left: 24px;
}
</style>
