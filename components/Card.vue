<template>
    <div
      class="flex flex-col md:flex-row items-center p-6 hover:bg-gray-800/20 rounded-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-lg justify-center w-[50%]"
    >
      <div v-if="!imgSrc" class="rounded-xl shadow-lg w-full bg-slate-600 animate-pulse"></div>
      <img v-show="imgSrc" :src="imgSrc" :alt="title" class="rounded-xl shadow-lg w-full object-cover mb-4 md:mb-0" />
      <div class="text-white text-justify p-6 flex-grow flex flex-col h-[100%]">
        <div class="h-[80%]">
            <h2 class="text-2xl font-bold">{{ title }}</h2>
            <p class="text-base">{{ description }}</p>
        </div>
        <div class="h-[20%]">
            <Button
            text="Ver detalles"
            ></Button>
        </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import Button from './Button.vue';
  
  const props = defineProps({
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });


  </script>
  
  <style scoped>
  /* Agrega tu CSS aquí */
  </style>
  