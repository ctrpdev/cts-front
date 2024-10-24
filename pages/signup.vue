<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-img z-0 relative">
      <div class="absolute inset-0 bg-purple-950/30"></div>
      <div
        class="relative z-10 flex flex-col justify-center items-center h-full text-center"
      >
        <div
          class="bg-orange-500/30 backdrop-blur-md rounded-xl w-[75%] p-16 shadow-lg"
        >
          <h1 class="text-white text-5xl font-bold drop-shadow-lg">
            Nuestro hotel te regala una estadía de 2 noches con todo pagado
          </h1>
          <h3 class="text-white text-3xl font-bold drop-shadow-lg">
            Regístrate y participa
          </h3>
        </div>
      </div>
    </div>
    <div class="flex-1 bg-orange-500 flex justify-center items-center">
      <form
        @submit.prevent="submitForm"
        class="flex flex-col p-16 w-[75%] gap-5"
      >
        <h3 class="text-white text-3xl font-bold drop-shadow-lg text-center">
          Regístrate
        </h3>
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />
        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />
        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="mb-4 p-4 rounded-xl outline-none text-purple-950 hover:shadow-xl focus:shadow-xl transition-all duration-300"
        />

        <div v-if="errorMessage" class="text-white text-sm font-semibold">
          {{ errorMessage }}
        </div>

        <button
          class="mt-4 text-center font-bold bg-purple-950 text-white py-4 rounded-xl hover:shadow-xl hover:bg-purple-700 active:bg-purple-800 transition-all duration-300"
        >
          Registrar
        </button>
      </form>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50"
  >
    <div
      class="bg-purple-950 p-14 rounded-xl shadow-lg flex justify-center items-center flex-col"
    >
      <p class="text-white mb-10">
        Revise su correo para completar su registro.
      </p>
      <button
        @click="closeModal"
        class="w-full text-center font-bold bg-orange-500 text-white py-4 rounded-xl hover:shadow-xl hover:bg-orange-700 active:bg-orange-800 transition-all duration-300"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const errorMessage = ref("");
const showModal = ref(false);

const validar = () => {
  return (
    !firstName.value || !lastName.value || !phoneNumber.value || !email.value
  );
};

async function checkEmailExists(email) {
  try {
    const response = await $fetch(`http://127.0.0.1:8000/api/check-email/`, {
      method: "POST",
      body: { email },
    });
    return response.exists;
  } catch (error) {
    return false;
  }
}

async function submitForm() {
  errorMessage.value = "";
  if (validar()) {
    errorMessage.value = "Complete los campos";
    return;
  }

  const emailExists = await checkEmailExists(email.value);
  if (emailExists) {
    errorMessage.value = "El correo ya está registrado";
    return;
  }

  try {
    await $fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      body: {
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: phoneNumber.value,
      },
    });
    showModal.value = true;
  } catch (error) {
    errorMessage.value = "Ocurrió un error al registrarse. Intente de nuevo.";
  }
}

function closeModal() {
  showModal.value = false;
  router.push("/");
}
</script>

<style>
.bg-img {
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
}
</style>
