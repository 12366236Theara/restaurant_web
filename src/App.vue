<template>
  <div class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased">
    <header class="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- <img src="/favicon.svg" alt="Logo" class="h-7 w-7" /> -->
          <h1 class="text-xl font-semibold tracking-tight">Your Restaurant</h1>
        </div>
        <!-- <nav class="text-sm text-neutral-600">
          <a
            class="hover:text-neutral-900 transition"
            href="https://example.com"
            target="_blank"
            rel="noreferrer"
            >About</a
          >
        </nav> -->
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="mt-16 border-t border-neutral-200">
      <div class="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-500">
        © {{ new Date().getFullYear() }} MB RESTUARANT. All rights reserved.
      </div>
    </footer>
  </div>
</template>
