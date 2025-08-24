<template>
  <div class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased">
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
