<template>
    <button 
      @click="handleClick"
      :class="`text-center font-bold text-white py-4 rounded-xl hover:shadow-xl transition-all duration-300 w-full
        ${ style === 'primary' ? 'bg-orange-500 hover:bg-orange-700 active:bg-orange-800' : 
        'bg-purple-950 hover:bg-purple-700 active:bg-purple-800' }`"
      aria-label="Button"
    >
      {{ text }}
    </button>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    style: {
      type: String,
      default: 'primary'
    }
  });
  
  </script>
  
  <style scoped>
  /* Agrega tu CSS aquí */
  </style>
  