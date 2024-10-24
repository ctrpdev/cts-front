<template>
  <div
    class="h-screen py-20 px-6 bg-index text-center flex justify-center items-center"
  >
    <div class="flex flex-row justify-center gap-3 w-[80%] m-auto">
      <div
        class="flex flex-col md:flex-row items-center p-6 hover:bg-gray-800/20 rounded-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-lg justify-center w-[50%]"
      >
        <div
          v-if="!roomImg"
          class="rounded-xl shadow-lg w-full bg-slate-600 animate-pulse"
        ></div>
        <img
          v-show="roomImg"
          :src="roomImg"
          alt="Suite local"
          class="rounded-xl shadow-lg w-full object-cover mb-4 md:mb-0"
        />
        <div class="text-white text-justify p-6 flex-grow">
          <h2 class="text-2xl font-bold mb-2">Suite local</h2>
          <p class="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <a
          @click="logout"
          class="font-bold py-4 px-6 bg-orange-500 hover:bg-orange-700 text-white rounded-xl transition-all duration-300"
          >Ver detalles</a
        >
      </div>
      <div
        class="flex flex-col md:flex-row items-center p-6 hover:bg-gray-800/20 rounded-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-lg justify-center w-[50%]"
      >
        <div
          v-if="!roomImg2"
          class="rounded-xl shadow-lg w-full bg-slate-600 animate-pulse"
        ></div>
        <img
          v-show="roomImg2"
          :src="roomImg2"
          alt="Suite urbana"
          class="rounded-xl shadow-lg w-full object-cover mb-4 md:mb-0"
        />
        <div class="text-white text-justify p-6 flex-grow">
          <h2 class="text-2xl font-bold mb-2">Suite urbana</h2>
          <p class="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <a
          @click="logout"
          class="font-bold py-4 px-6 bg-orange-500 hover:bg-orange-700 text-white rounded-xl transition-all duration-300"
          >Ver detalles</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import room from "@/assets/img/room.jpg";
import room2 from "@/assets/img/room2.jpg";

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
