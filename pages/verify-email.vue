<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-orange-500 flex justify-center items-center">
      <form
        @submit.prevent="submitForm"
        class="flex flex-col p-16 w-[75%] gap-5"
      >
        <h3 class="text-white text-3xl font-bold drop-shadow-lg text-center">
          Crea tu contraseña
        </h3>
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />
        <input
          v-model="password2"
          type="password"
          placeholder="Repetir contraseña"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />

        <div v-if="errorMessage" class="text-white text-sm font-semibold">
          {{ errorMessage }}
        </div>

        <button
          class="mt-4 text-center font-bold bg-purple-950 text-white py-4 rounded-xl hover:shadow-xl hover:bg-purple-700 active:bg-purple-800 transition-all duration-300"
        >
          Crear
        </button>
      </form>
    </div>
    <div class="flex-1 bg-img z-0 relative">
      <div class="absolute inset-0 bg-purple-950/30"></div>
      <div
        class="relative z-10 flex flex-col justify-center items-center h-full text-center"
      >
        <div
          class="bg-gray-800/20 backdrop-blur-md rounded-xl w-[75%] p-16 shadow-lg"
        >
          <h1 class="text-white text-5xl font-bold drop-shadow-lg">
            Tu correo ha sido validado
          </h1>
          <h3 class="text-white text-3xl font-bold drop-shadow-lg">
            Termina tu registro para participar en nuestro sorteo
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const password = ref("");
const password2 = ref("");
const errorMessage = ref("");

const validar = () => {
  return !password.value || !password2.value;
};

async function submitForm() {
  errorMessage.value = "";
  if (validar()) {
    errorMessage.value = "Complete los campos";
    return;
  }

  if (password.value !== password2.value) {
    errorMessage.value = "Las contraseñas no coinciden";
    return;
  }

  const token = router.currentRoute.value.query.token;
  const email = router.currentRoute.value.query.email;

  try {
    await $fetch(
      `http://127.0.0.1:8000/api/verify_email/?token=${token}&email=${email}`,
      {
        method: "POST",
        body: { password: password.value },
      }
    );
    router.push({ path: "/" });
  } catch (error) {
    errorMessage.value =
      "Ocurrió un error al registrar la contraseña. Intente de nuevo.";
  }
}
</script>

<style>
.bg-img {
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
}
</style>
