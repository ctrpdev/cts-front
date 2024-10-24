<template>
  <div>
    <nav
      class="flex items-center justify-between bg-purple-950/80 hover:bg-purple-950 px-14 py-4 w-full fixed backdrop-blur-lg z-20 transition-all duration-300"
    >
      <NuxtLink to="/" class="text-xl text-white font-bold">HOME</NuxtLink>

      <div class="flex items-center space-x-4">
        <template v-if="userStore.user.isAuthenticated">
          <h2 class="text-white font-semibold">
            Bienvenido, {{ userStore.user.email }}
          </h2>
          <button
            class="font-bold py-4 px-6 bg-orange-500 hover:bg-orange-700 text-white rounded-xl transition-all duration-300"
            v-if="userStore.user.isStaff"
            @click="goToAdminPage"
          >
            Dashboard
          </button>
          <NuxtLink
            v-on:click="logout"
            to="/"
            class="font-bold py-4 px-6 bg-orange-500 hover:bg-orange-700 text-white rounded-xl transition-all duration-300"
          >
            Log out</NuxtLink
          >
        </template>
        <template v-else>
          <div class="flex gap-2">
            <NuxtLink
              to="/login"
              class="text-center font-bold py-4 px-6 bg-orange-600 hover:bg-orange-700 hover:shadow-xl active:bg-orange-800 text-white rounded-xl transition-all duration-300 w-[50%]"
            >
              Ingresar</NuxtLink
            >
            <NuxtLink
              to="/signup"
              class="text-center font-bold py-4 px-6 bg-purple-950 hover:bg-purple-700 border-white hover:shadow-xl active:bg-purple-800 text-white rounded-xl transition-all duration-300 w-[50%]"
            >
              Registrarse</NuxtLink
            >
          </div>
        </template>
      </div>
    </nav>

    <slot />

    <footer class="p-4 flex flex-wrap items-center justify-between bg-gray-950">
      <p class="text-gray-300">CTS</p>
      <p class="text-gray-300">Copyright &copy; 2024 - ctrpdev</p>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
function goToAdminPage() {
  router.push("/admin");
}

function logout() {
  userStore.removeToken();
}

onMounted(() => {
  userStore.initStore();
});
</script>
