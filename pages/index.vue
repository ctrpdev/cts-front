<template>
  <div
    class="h-screen py-20 px-6 bg-index text-center flex justify-center items-center"
  >
    <div class="flex flex-row justify-center gap-3 w-[80%] m-auto">
      <Card 
      :imgSrc="roomImg"
      title="Estilo local"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <Card 
      :imgSrc="roomImg2"
      title="Estilo urbano"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import room from "@/assets/img/room.jpg";
import room2 from "@/assets/img/room2.jpg";
import Card from "@/components/Card.vue";

const roomImg = ref(room);
const roomImg2 = ref(room2);

</script>

<style>
.bg-index {
  background-image: url("../assets/img/index.jpg");
  background-size: cover;
  position: relative;
}
</style>
