<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <nav
      class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <img src="/logo.png" alt="QuikGrade Logo" class="h-8 w-8 mr-2" />
            <h1 class="text-2xl font-bold text-gray-900">QuikGrade</h1>
          </div>
          <router-link
            to="/login"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Get Started
          </router-link>
        </div>
      </div>
    </nav>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div class="text-center">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
        >
          Fast, Clean Grading
          <span class="text-blue-600">for Teachers</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          QuickGrade is a minimalist grading tool that helps teachers add
          assignments, input question scores, and get total grades instantly.
          Simple, fast, effective.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/login"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            Start Grading Now
          </router-link>
          <a
            href="#features"
            class="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors duration-200 text-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>

    <section id="features" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Everything you need to grade efficiently
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Built specifically for teachers who want a clean, fast way to manage
          assignments and calculate grades.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-blue-600"
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
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Quick Assignment Creation
          </h3>
          <p class="text-gray-600">
            Add student assignments with custom question counts. Input scores
            per question and see totals calculated instantly.
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Real-time Calculations
          </h3>
          <p class="text-gray-600">
            Watch total scores update automatically as you input individual
            question scores. No manual math required.
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Clean Interface
          </h3>
          <p class="text-gray-600">
            Minimalist design with no clutter. Focus on what matters - grading
            assignments quickly and efficiently.
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Secure Storage
          </h3>
          <p class="text-gray-600">
            All assignments are securely stored in the cloud. Access your grades
            from anywhere, anytime.
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Edit & Update
          </h3>
          <p class="text-gray-600">
            Made a mistake? No problem. Edit assignment details, update scores,
            or delete assignments with ease.
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6"
          >
            <svg
              class="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Mobile Friendly
          </h3>
          <p class="text-gray-600">
            Grade on the go with a fully responsive design that works perfectly
            on phones, tablets, and desktops.
          </p>
        </div>
      </div>
    </section>

    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">QuickGrade</h3>
          <p class="text-gray-600">Fast, clean grading for teachers</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Landing page component
</script>
