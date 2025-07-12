<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          <router-link to="/dashboard" class="btn-secondary mr-4">
            ← Back
          </router-link>
          <h1 class="text-2xl font-bold text-gray-900">Add Assignment</h1>
        </div>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="card p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                for="studentName"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Student Name
              </label>
              <input
                id="studentName"
                v-model="studentName"
                type="text"
                required
                class="input-field"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Assignment Title
              </label>
              <input
                id="title"
                v-model="title"
                type="text"
                required
                class="input-field"
                placeholder="Enter assignment title"
              />
            </div>
          </div>

          <div>
            <label
              for="numQuestions"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Questions
            </label>
            <input
              id="numQuestions"
              v-model.number="numQuestions"
              type="number"
              min="1"
              max="50"
              required
              class="input-field max-w-xs"
              placeholder="Enter number of questions"
            />
          </div>

          <div v-if="numQuestions > 0" class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Question Scores</h3>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="i in numQuestions"
                :key="i"
                class="flex items-center space-x-3"
              >
                <label
                  :for="`question-${i}`"
                  class="text-sm font-medium text-gray-700 min-w-0"
                >
                  Q{{ i }}:
                </label>
                <input
                  :id="`question-${i}`"
                  v-model.number="scores[i - 1]"
                  type="number"
                  min="0"
                  step="0.5"
                  class="input-field"
                  placeholder="0"
                />
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 mt-6">
              <div class="text-center">
                <p class="text-sm text-gray-600">Total Score</p>
                <p class="text-3xl font-bold text-primary-600 mt-1">
                  {{ totalScore }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <div class="flex justify-end space-x-4">
            <router-link to="/dashboard" class="btn-secondary">
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="btn-primary"
            >
              <span v-if="isLoading">Saving...</span>
              <span v-else>Save Assignment</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useAssignments } from "../composables/useAssignments";
import emitter from "../eventBus";

const router = useRouter();
const { user, isAuthReady } = useAuth();
const { addAssignment } = useAssignments(user);

const studentName = ref("");
const title = ref("");
const numQuestions = ref(1);
const scores = ref([]);
const error = ref("");
const isLoading = ref(false);

watch(
  [() => isAuthReady && isAuthReady.value, () => user.value],
  ([ready, val]) => {
    if (ready && val === null) {
      router.push("/login");
    }
  },
  { immediate: true },
);

watch(
  numQuestions,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        scores.value[i] = 0;
      }
    } else if (newVal < oldVal) {
      scores.value = scores.value.slice(0, newVal);
    }
  },
  { immediate: true },
);

const totalScore = computed(() => {
  return scores.value.reduce((sum, score) => sum + (Number(score) || 0), 0);
});

const isFormValid = computed(() => {
  return (
    studentName.value.trim() && title.value.trim() && numQuestions.value > 0
  );
});

const handleSubmit = async () => {
  if (isLoading.value || !isFormValid.value) return;

  isLoading.value = true;
  error.value = "";

  try {
    const assignmentData = {
      studentName: studentName.value.trim(),
      title: title.value.trim(),
      scores: scores.value.map((score) => Number(score) || 0),
      totalScore: totalScore.value,
    };

    await addAssignment(assignmentData);
    emitter.emit("assignmentsChanged");
    router.push("/dashboard");
  } catch (err) {
    error.value = "Failed to save assignment. Please try again.";
    console.error("Error saving assignment:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
