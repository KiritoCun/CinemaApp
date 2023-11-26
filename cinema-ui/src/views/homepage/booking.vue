<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="body">
        <div class="wrapper-stepper">
          <div class="stepper">
            <div class="stepper-progress">
              <div class="stepper-progress-bar" :style="'width:' + stepperProgress "></div>
            </div>

            <div class="stepper-item" :class="{ 'current': step == item, 'success': step > item }" v-for="item in 4" :key="item">
              <div class="stepper-item-counter">
                <img class="icon-success" src="https://www.freeiconspng.com/uploads/blue-check-mark-transparent-png-21.png" width="350" alt="blue check mark transparent png" />
                <span class="number">
                  {{ item }}
                </span>
              </div>
              <span class="stepper-item-title"> Bước {{ item }} </span>
            </div>
          </div>
          <div class="stepper-content">
            <div class="stepper-pane" v-show="step == 1">
            </div>
            <div class="stepper-pane" v-show="step == 2">
            </div>
            <div class="stepper-pane" v-show="step == 3">
            </div>
            <div class="stepper-pane" v-show="step == 4">
            </div>
          </div>
          <div class="controls">
            <button class="btn" @click="step--" :disabled="step == 1">Quay lại</button>
            <button class="btn btn--blue-1" @click="step++" :disabled="step == 4">Tiếp tục</button>
          </div>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
export default defineComponent({
  name: 'StepperComponent',

  setup() {
    const step = ref(1);
    const stepperProgress = computed(() => {
      return `${(100 / 3) * (step.value - 1)}%`;
    });

    function incrementStep() {
      if (step.value < 4) {
        step.value++;
      }
    }

    function decrementStep() {
      if (step.value > 1) {
        step.value--;
      }
    }

    return {
      step,
      stepperProgress,
      incrementStep,
      decrementStep,
    };

  }

});
</script>

<style lang="scss">
@import "@/assets/styles/stepper-component.scss";
</style>
