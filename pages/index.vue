<template>
  <div
    class="h-screen py-20 px-6 bg-index text-center flex justify-center items-center"
  >
    <div class="flex flex-row justify-center gap-3 w-[80%] m-auto">
      <Card 
      :imgSrc="room"
      title="Estilo local"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <Card 
      :imgSrc="room2"
      title="Estilo urbano"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import room from "@/assets/img/room.jpg";
import room2 from "@/assets/img/room2.jpg";
import Card from "@/components/Card.vue";

const userStore = useUserStore();
const roomImg = ref(room);
const roomImg2 = ref(room2);

function logout() {
  userStore.removeToken();
}
</script>

<style>
.bg-index {
  background-image: url("../assets/img/index.jpg");
  background-size: cover;
  position: relative;
}
</style>
