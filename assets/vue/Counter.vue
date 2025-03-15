<script setup>
import { ref } from "vue";

// Define props
const props = defineProps({ count: Number, name: String });

// Define emits
const emit = defineEmits(["inc"]);

// Create a reactive reference for the diff input
const diff = ref("1");

// Function to handle click event
const handleClick = () => {
  const value = parseInt(diff.value);
  console.log(`Increase counter by: ${value}`);
  emit("inc", { value });
};
</script>

<template>
  <UApp>
      <UAvatar src="https://github.com/benjamincanac.png" />

    Current count {{ props.name }}
    <div class="text-2xl text-bold">{{ props.count }}</div>

    <label class="block mt-8">Diff: </label>
    <input v-model="diff" class="mt-4" type="range" min="1" max="10">

    <button @click="handleClick" class="mt-4 bg-black text-white rounded p-2 block">
      Increase counter by {{ diff }}
    </button>
  </UApp>
</template>
