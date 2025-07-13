<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto"
          >
            <div class="flex items-center mb-2 sm:mb-0">
              <router-link
                to="/dashboard"
                class="btn-secondary mr-2 sm:mr-4 mb-2 sm:mb-0"
              >
                ← Back
              </router-link>
              <img src="/logo.png" alt="QuikGrade Logo" class="h-8 w-8 mr-2" />
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                Assignment Details
              </h1>
            </div>
          </div>
          <div class="flex space-x-2 mt-2 sm:mt-0 justify-end">
            <button @click="toggleEdit" class="btn-secondary">
              {{ isEditing ? "Cancel" : "Edit" }}
            </button>
            <button
              @click="handleDelete"
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </header>

    <div v-if="loading" class="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
      <div class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"
        ></div>
        <p class="text-gray-600 mt-2">Loading assignment...</p>
      </div>
    </div>

    <div
      v-else-if="!assignment"
      class="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8 py-8"
    >
      <div class="text-center py-12">
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Assignment not found
        </h3>
        <p class="text-gray-600 mb-6">
          The assignment you're looking for doesn't exist
        </p>
        <router-link to="/dashboard" class="btn-primary">
          Back to Dashboard
        </router-link>
      </div>
    </div>

    <main v-else class="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div class="card p-4 sm:p-8">
        <div v-if="!isEditing" class="space-y-6">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
                {{ assignment.studentName }}
              </h2>
              <p class="text-gray-600 mt-1 text-base sm:text-lg">
                {{ assignment.title }}
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Created {{ formatDate(assignment.createdAt) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Total Score</p>
              <p class="text-3xl sm:text-4xl font-bold text-primary-600">
                {{ assignment.totalScore }}
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Score Breakdown
            </h3>
            <div class="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="(score, index) in assignment.scores"
                :key="index"
                class="bg-gray-50 rounded-lg p-3 text-center"
              >
                <p class="text-sm text-gray-600">Question {{ index + 1 }}</p>
                <p class="text-xl font-semibold text-gray-900">{{ score }}</p>
              </div>
            </div>
          </div>
        </div>

        <form v-else @submit.prevent="handleSave" class="space-y-6">
          <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <div>
              <label
                for="editStudentName"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Student Name
              </label>
              <input
                id="editStudentName"
                v-model="editForm.studentName"
                type="text"
                required
                class="input-field"
              />
            </div>
            <div>
              <label
                for="editTitle"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Assignment Title
              </label>
              <input
                id="editTitle"
                v-model="editForm.title"
                type="text"
                required
                class="input-field"
              />
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Question Scores
            </h3>
            <div
              class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="(score, index) in editForm.scores"
                :key="index"
                class="flex items-center space-x-3"
              >
                <label
                  :for="`edit-question-${index + 1}`"
                  class="text-sm font-medium text-gray-700 min-w-0"
                >
                  Q{{ index + 1 }}:
                </label>
                <input
                  :id="`edit-question-${index + 1}`"
                  v-model.number="editForm.scores[index]"
                  type="number"
                  min="0"
                  step="0.5"
                  class="input-field"
                />
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 mt-6">
              <div class="text-center">
                <p class="text-sm text-gray-600">Total Score</p>
                <p class="text-2xl sm:text-3xl font-bold text-primary-600 mt-1">
                  {{ editTotalScore }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <div
            class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <button
              type="button"
              @click="toggleEdit"
              class="btn-secondary w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="btn-primary w-full sm:w-auto"
            >
              <span v-if="isSaving">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useAssignments } from "../composables/useAssignments";
import emitter from "../eventBus";

const route = useRoute();
const router = useRouter();
const { user } = useAuth();
const {
  assignments,
  loading,
  fetchAssignments,
  updateAssignment,
  deleteAssignment,
  getAssignmentById,
  getAssignmentDocById,
} = useAssignments(user);

const isEditing = ref(false);
const isSaving = ref(false);
const error = ref("");
const editForm = ref({
  studentName: "",
  title: "",
  scores: [],
});

const assignment = ref(null);

const editTotalScore = computed(() => {
  return editForm.value.scores.reduce(
    (sum, score) => sum + (Number(score) || 0),
    0,
  );
});

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};

const toggleEdit = () => {
  if (isEditing.value) {
    isEditing.value = false;
    error.value = "";
  } else {
    if (assignment.value) {
      editForm.value = {
        studentName: assignment.value.studentName,
        title: assignment.value.title,
        scores: [...assignment.value.scores],
      };
    }
    isEditing.value = true;
  }
};

const handleSave = async () => {
  if (isSaving.value) return;

  isSaving.value = true;
  error.value = "";

  try {
    const updates = {
      studentName: editForm.value.studentName.trim(),
      title: editForm.value.title.trim(),
      scores: editForm.value.scores.map((score) => Number(score) || 0),
      totalScore: editTotalScore.value,
    };

    await updateAssignment(route.params.id, updates);
    isEditing.value = false;

    await fetchAssignments();
    emitter.emit("assignmentsChanged");
  } catch (err) {
    error.value = "Failed to update assignment. Please try again.";
    console.error("Error updating assignment:", err);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = async () => {
  if (
    confirm(
      "Are you sure you want to delete this assignment? This action cannot be undone.",
    )
  ) {
    try {
      await deleteAssignment(route.params.id);
      router.push("/dashboard");
    } catch (err) {
      error.value = "Failed to delete assignment. Please try again.";
      console.error("Error deleting assignment:", err);
    }
  }
};

const fetchAssignmentDetail = async () => {
  loading.value = true;
  try {
    assignment.value = await getAssignmentDocById(route.params.id);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAssignmentDetail();
  emitter.on("assignmentsChanged", fetchAssignmentDetail);
});

onUnmounted(() => {
  emitter.off("assignmentsChanged", fetchAssignmentDetail);
});
</script>
