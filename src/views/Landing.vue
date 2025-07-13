<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white"
  >
    <nav
      class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div
        class="max-w-4xl mx-auto px-4 flex items-center justify-between h-16"
      >
        <div class="flex items-center">
          <img src="/logo.png" alt="QuikGrade Logo" class="h-8 w-8 mr-2" />
          <span class="text-2xl font-bold text-gray-900">QuikGrade</span>
        </div>
      </div>
    </nav>

    <main
      class="flex-1 flex flex-col items-center justify-center text-center px-4 py-20"
    >
      <h1
        class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
      >
        Fast, Clean Grading<br />
        <span class="text-blue-600">for Teachers</span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
        QuikGrade is a simple grading tool for teachers. Add assignments, input
        scores, and get instant totals.
      </p>
      <router-link
        to="/login"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg text-lg shadow-md transition-colors duration-200 mb-4"
      >
        Start Grading Now
      </router-link>
      <a
        href="https://github.com/leecheeyong/QuikGrade"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center w-fit mx-auto mb-8"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"
          />
        </svg>
        View on GitHub
      </a>
      <div class="mt-16 max-w-3xl w-full">
        <div class="grid gap-6 sm:grid-cols-3">
          <div class="bg-white rounded-xl p-6 shadow border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p class="text-gray-600 text-sm">
              Input scores and see totals update automatically. No manual math.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Minimal & Mobile
            </h3>
            <p class="text-gray-600 text-sm">
              A clean, responsive interface that works on any device.
            </p>
          </div>
          <div class="bg-white rounded-xl p-6 shadow border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Organized & Secure
            </h3>
            <p class="text-gray-600 text-sm">
              Grades are safely stored and accessible anytime in the cloud.
            </p>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-50 border-t border-gray-200 mt-auto">
      <div class="max-w-4xl mx-auto px-4 py-8 text-center">
        <span class="text-gray-900 font-semibold">QuikGrade</span>
        <span class="text-gray-500 ml-2"
          >is available as an open source under the terms of the
          <a
            class="underline decoration-sky-500"
            target="_blank"
            href="https://github.com/leecheeyong/QuikGrade/blob/main/LICENSE"
            >MIT License</a
          ></span
        >
      </div>
    </footer>
  </div>
</template>
