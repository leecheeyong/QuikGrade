<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          <div class="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
            <div class="flex items-center mb-2 sm:mb-0">
              <img src="/logo.png" alt="QuikGrade Logo" class="h-8 w-8 mr-2" />
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900">QuikGrade</h1>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <span v-if="userEmail" class="text-gray-700 text-sm text-right sm:text-left">
              {{ userEmail }}
            </span>
            <button @click="handleSignOut" class="btn-secondary w-full sm:w-auto">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Your Assignments</h2>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">
            {{ assignments.length }} total assignments
          </p>
        </div>
        <router-link
          to="/add-assignment"
          class="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Assignment
        </router-link>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
        <input
          v-model="filterStudent"
          type="text"
          placeholder="Filter by student name"
          class="input-field max-w-full sm:max-w-xs"
        />
        <input
          v-model="filterTitle"
          type="text"
          placeholder="Filter by assignment title"
          class="input-field max-w-full sm:max-w-xs"
        />
        <input v-model="filterDate" type="date" class="input-field max-w-full sm:max-w-xs" />
      </div>

      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"
        ></div>
        <p class="text-gray-600 mt-2">Loading assignments...</p>
      </div>

      <div v-else-if="assignments.length === 0" class="text-center py-12">
        <svg
          class="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No assignments yet
        </h3>
        <p class="text-gray-600 mb-6">
          Get started by creating your first assignment
        </p>
        <router-link to="/add-assignment" class="btn-primary">
          Create Assignment
        </router-link>
      </div>

      <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          :to="`/assignment/${assignment.id}`"
          class="card p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-semibold text-gray-900 truncate">
              {{ assignment.studentName }}
            </h3>
            <span class="text-2xl font-bold text-primary-600">
              {{ assignment.totalScore }}
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-3 truncate">
            {{ assignment.title }}
          </p>
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span>{{ assignment.scores.length }} questions</span>
            <span>{{ formatDate(assignment.createdAt) }}</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useAssignments } from "../composables/useAssignments";
import emitter from "../eventBus";

const router = useRouter();
const { user, signOut, isAuthReady } = useAuth();
const userId = computed(() => user.value && user.value.uid);
const userEmail = computed(() => user.value && user.value.email);
const { assignments, loading, fetchAssignments } = useAssignments(userId);

const filterStudent = ref("");
const filterTitle = ref("");
const filterDate = ref("");

const filteredAssignments = computed(() => {
  return assignments.value.filter((a) => {
    const matchesStudent =
      filterStudent.value === "" ||
      a.studentName.toLowerCase().includes(filterStudent.value.toLowerCase());
    const matchesTitle =
      filterTitle.value === "" ||
      a.title.toLowerCase().includes(filterTitle.value.toLowerCase());
    const matchesDate =
      filterDate.value === "" ||
      (a.createdAt &&
        new Date(a.createdAt.toDate ? a.createdAt.toDate() : a.createdAt)
          .toISOString()
          .slice(0, 10) === filterDate.value);
    return matchesStudent && matchesTitle && matchesDate;
  });
});

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

const handleSignOut = async () => {
  await signOut();
  router.push("/login");
};

watch(
  userId,
  (newUid) => {
    if (newUid) {
      fetchAssignments();
    }
  },
  { immediate: true },
);

watch(
  [() => isAuthReady && isAuthReady.value, () => user.value],
  ([ready, val]) => {
    if (ready && val === null) {
      router.push("/login");
    }
  },
  { immediate: true },
);

emitter.on("assignmentsChanged", fetchAssignments);
</script>
