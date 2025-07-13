<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4"
  >
    <div class="card w-full max-w-md p-8">
      <div class="text-center mb-8 flex flex-col items-center">
        <img src="/logo.png" alt="QuikGrade Logo" class="h-8 w-8 mb-2" />
        <h1 class="text-3xl font-bold text-gray-900 mb-2">QuikGrade</h1>
        <p class="text-gray-600">Fast, clean grading for teachers</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input-field"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input-field"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoading" class="btn-primary w-full">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <button
            @click="toggleMode"
            class="text-primary-600 hover:text-primary-500 font-medium"
          >
            {{ isSignUp ? "Sign In" : "Sign Up" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { signIn, signUp, user } = useAuth();

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const isSignUp = ref(false);

const toggleMode = () => {
  isSignUp.value = !isSignUp.value;
  error.value = "";
};

const handleSubmit = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = "";

  try {
    const result = isSignUp.value
      ? await signUp(email.value, password.value)
      : await signIn(email.value, password.value);

    if (result.error) {
      error.value = result.error;
    } else {
      router.push("/dashboard");
    }
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => user.value,
  (val) => {
    if (val) {
      router.push("/dashboard");
    }
  }
);
</script>
