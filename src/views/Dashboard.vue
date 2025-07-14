<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
  >
    <header
      class="bg-white/90 shadow-sm border-b border-gray-200 backdrop-blur"
    >
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto"
          >
            <div class="flex items-center mb-2 sm:mb-0">
              <img src="/logo.png" alt="QuikGrade Logo" class="h-9 w-9 mr-3" />
              <h1
                class="text-2xl sm:text-3xl font-extrabold text-primary-700 tracking-tight"
              >
                QuikGrade
              </h1>
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 w-full sm:w-auto"
          >
            <span
              v-if="userEmail"
              class="text-gray-600 text-sm text-right sm:text-left break-all font-medium"
            >
              {{ userEmail }}
            </span>
            <button
              @click="handleSignOut"
              class="btn-secondary w-full sm:w-auto rounded-xl shadow-sm font-semibold"
            >
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
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
            Your Assignments
          </h2>
          <p class="text-gray-500 mt-1 text-sm sm:text-base">
            {{ assignments.length }} total assignments
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <router-link
            to="/add-assignment"
            class="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl shadow font-semibold"
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
          <button
            @click="showExportModal = true"
            class="btn-secondary inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl shadow font-semibold"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div
        v-if="showExportModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2"
      >
        <div
          class="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md relative overflow-y-auto max-h-[90vh] p-4 sm:p-6 flex flex-col border border-gray-100"
        >
          <button
            @click="showExportModal = false"
            class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
          <h3 class="text-xl font-bold mb-4 mt-2 sm:mt-0 text-primary-700">
            Export CSV
          </h3>
          <div class="mb-4">
            <label class="block font-semibold mb-1 text-gray-700"
              >Export by:</label
            >
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="exportType"
                  value="student"
                  class="mr-2"
                />
                Student
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="exportType"
                  value="assignment"
                  class="mr-2"
                />
                Assignment
              </label>
            </div>
          </div>
          <div v-if="exportType === 'student'" class="mb-4">
            <label class="block mb-1 font-medium text-gray-700"
              >Select Student:</label
            >
            <select
              v-model="selectedStudent"
              class="input-field w-full rounded-lg border-gray-300"
            >
              <option disabled value="">-- Select Student --</option>
              <option
                v-for="student in uniqueStudents"
                :key="student"
                :value="student"
              >
                {{ student }}
              </option>
            </select>
          </div>
          <div v-if="exportType === 'assignment'" class="mb-4">
            <label class="block mb-1 font-medium text-gray-700"
              >Select Assignment:</label
            >
            <select
              v-model="selectedAssignmentId"
              class="input-field w-full rounded-lg border-gray-300"
            >
              <option disabled value="">-- Select Assignment --</option>
              <option
                v-for="title in uniqueAssignmentTitles"
                :key="title"
                :value="title"
              >
                {{ title }}
              </option>
            </select>
          </div>
          <div class="flex flex-col sm:flex-row justify-end gap-2 mt-auto">
            <button
              @click="showExportModal = false"
              class="btn-secondary w-full sm:w-auto rounded-xl"
            >
              Cancel
            </button>
            <button
              v-if="exportType === 'student'"
              :disabled="!selectedStudent"
              @click="exportStudentCSV(selectedStudent)"
              class="btn-primary w-full sm:w-auto rounded-xl"
            >
              Export Student CSV
            </button>
            <button
              v-if="exportType === 'assignment'"
              :disabled="!selectedAssignmentId"
              @click="exportAssignmentCSVById(selectedAssignmentId)"
              class="btn-primary w-full sm:w-auto rounded-xl"
            >
              Export Assignment CSV
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
        <input
          v-model="filterStudent"
          type="text"
          placeholder="Filter by student name"
          class="input-field max-w-full sm:max-w-xs rounded-lg border-gray-300"
        />
        <input
          v-model="filterTitle"
          type="text"
          placeholder="Filter by assignment title"
          class="input-field max-w-full sm:max-w-xs rounded-lg border-gray-300"
        />
        <input
          v-model="filterDate"
          type="date"
          class="input-field max-w-full sm:max-w-xs rounded-lg border-gray-300"
        />
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
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          No assignments yet
        </h3>
        <p class="text-gray-500 mb-6">
          Get started by creating your first assignment
        </p>
        <router-link
          to="/add-assignment"
          class="btn-primary rounded-xl shadow font-semibold"
        >
          Create Assignment
        </router-link>
      </div>

      <div
        v-else
        class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <router-link
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          :to="`/assignment/${assignment.id}`"
          class="card p-4 sm:p-6 bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 relative min-w-0 border border-gray-100"
        >
          <div
            class="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start mb-3"
          >
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
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 gap-1 sm:gap-0"
          >
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
const showExportModal = ref(false);
const exportType = ref("student");
const selectedStudent = ref("");
const selectedAssignmentId = ref("");

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

const uniqueStudents = computed(() => {
  const names = assignments.value.map((a) => a.studentName).filter(Boolean);
  return [...new Set(names)];
});

const uniqueAssignmentTitles = computed(() => {
  const titles = assignments.value.map((a) => a.title).filter(Boolean);
  return [...new Set(titles)];
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

function exportAssignmentCSVById(title) {
  // title is the assignment title
  const grouped = assignments.value.filter((a) => a.title === title);
  if (!grouped.length) return;
  const maxQuestions = Math.max(...grouped.map((a) => a.scores.length));
  const headers = ["Student Name", "Assignment Title", "Total Score"];
  for (let i = 1; i <= maxQuestions; i++) headers.push(`Q${i}`);
  const rows = grouped.map((a) => {
    const row = [a.studentName, a.title, a.totalScore, ...a.scores];
    // pad with empty for missing questions
    while (row.length < 3 + maxQuestions) row.push("");
    return row;
  });
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadCSV(csv, `${title.replace(/[^a-z0-9]/gi, "_")}_all_scores.csv`);
  showExportModal.value = false;
}

function exportStudentCSV(studentName) {
  const student = studentName.trim().toLowerCase();
  const studentAssignments = assignments.value.filter(
    (a) => a.studentName.toLowerCase() === student,
  );
  if (!studentAssignments.length) return;
  const headers = [
    "Assignment Title",
    "Total Score",
    ...studentAssignments[0].scores.map((_, i) => `Q${i + 1}`),
  ];
  const rows = studentAssignments.map((a) => [
    a.title,
    a.totalScore,
    ...a.scores,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadCSV(
    csv,
    `${studentName.replace(/[^a-z0-9]/gi, "_")}_assignments.csv`,
  );
  showExportModal.value = false;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
