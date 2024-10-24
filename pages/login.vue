<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-orange-500 flex justify-center items-center">
      <form
        @submit.prevent="submitForm"
        class="flex flex-col p-16 w-[75%] gap-5"
      >
        <h3 class="text-white text-3xl font-bold drop-shadow-lg text-center">
          Ingresar
        </h3>
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />

        <div v-if="errorMessage" class="text-white text-sm font-semibold">
          {{ errorMessage }}
        </div>

        <button
          class="mt-4 text-center font-bold bg-purple-950 text-white py-4 rounded-xl hover:shadow-xl hover:bg-purple-700 active:bg-purple-800 transition-all duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
    <div class="flex-1 bg-img z-0 relative">
      <div class="absolute inset-0 bg-purple-950/30"></div>
      <div
        class="relative z-10 flex flex-col justify-center items-center h-full text-center"
      >
        <div
          class="bg-orange-500/30 backdrop-blur-md rounded-xl w-[75%] p-16 shadow-lg"
        >
          <h1 class="text-white text-5xl font-bold drop-shadow-lg">
            Bienvenido a nuestro hotel
          </h1>
          <h3 class="text-white text-3xl font-bold drop-shadow-lg">
            Ingresa y disfruta de nuestros beneficios
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
let email = ref("");
let password = ref("");
let errorMessage = ref("");

const validar = () => {
  return !password.value || !email.value;
};

async function submitForm() {
  errorMessage.value = "";

  if (validar()) {
    errorMessage.value = "Complete los campos";
    return;
  }

  try {
    const data = await $fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    userStore.setToken(data.token, email.value, data.is_staff);
    router.push({ path: data.is_staff ? "/admin" : "/" });
  } catch (error) {
    errorMessage.value = "Usuario y/o contraseña inválidos";
  }
}
</script>

<style>
.bg-img {
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  position: relative;
}
</style>
