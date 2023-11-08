<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup>
const url = ref('https://gitlab.com');

function goto() {
  window.open(url.value)
}
</script>
