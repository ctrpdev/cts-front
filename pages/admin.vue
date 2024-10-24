<template>
  <div
    class="h-screen py-20 px-6 bg-index text-center flex justify-center items-center"
  >
    <div
      v-if="userStore.user.isAuthenticated"
      class="flex flex-col items-center p-6 hover:bg-gray-800/20 rounded-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-lg justify-center w-[50%]"
    >
      <h2 class="text-white text-4xl font-semibold">
        Bienvenido, {{ userStore.user.email }}
      </h2>

      <div v-if="winner">
        <h2 class="text-white font-semibold text-2xl capitalize">
          Ganador: {{ winner.first_name }} {{ winner.last_name }}
        </h2>
        <h2 class="text-white font-semibold text-2xl">
          Correo: {{ winner.email }}
        </h2>
        <h2 class="text-white font-semibold text-2xl">
          Teléfono: {{ winner.phone_number }}
        </h2>
      </div>

      <div v-if="errorMessage" class="text-white text-md font-semibold mt-5">
        {{ errorMessage }}
      </div>

      <button
        v-if="userStore.user.isStaff"
        @click="selectWinner"
        :disabled="isSelecting"
        class="mt-5 text-center font-bold bg-orange-500 text-white py-4 rounded-xl hover:shadow-xl hover:bg-orange-700 active:bg-orange-800 transition-all duration-300 w-full"
      >
        {{ isSelecting ? "Sorteando..." : "Sortear" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
let winner = ref(null);
let errorMessage = ref("");
const isSelecting = ref(false);

async function selectWinner() {
  isSelecting.value = true;
  errorMessage.value = "";

  try {
    const token = userStore.user.token;
    const response = await $fetch(
      `http://127.0.0.1:8000/api/generate_winner/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    winner.value = response.Ganador;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errorMessage.value = "No hay usuarios registrados";
    }
  } finally {
    isSelecting.value = false;
  }
}
</script>

<style>
.bg-index {
  background-image: url("../assets/img/index.jpg");
  background-size: cover;
  position: relative;
}
</style>

<script>
export default {
  middleware: "admin",
};
</script>
