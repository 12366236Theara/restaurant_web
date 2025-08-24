<script setup lang="ts">
import defaultLogo from '@/assets/logo.svg'
import { useStoreConfig } from '@/composables/useStore'

const s = useStoreConfig()
function onLogoError(e: Event) {
  ;(e.target as HTMLImageElement).src = defaultLogo
}
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 text-neutral-900 antialiased">
    <header
      class="sticky top-0 z-50 backdrop-blur bg-white/80 border-b"
      :style="{ borderColor: 'var(--primary)' }"
    >
      <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            v-if="s.logoUrl"
            :src="s.config.value?.logo ?? defaultLogo"
            :alt="`${s.config.value?.name || 'Store'} logo`"
            class="h-8 w-8 rounded"
            @error="onLogoError"
          />
          <img v-else :src="defaultLogo" alt="Default logo" class="h-8 w-8 rounded" />
          <h1
            class="text-lg md:text-xl font-semibold tracking-tight"
            :style="{ color: 'var(--primary)' }"
          >
            <!-- {{ s.config?.name ?? 'Restaurant' }} -->
            {{ s.config.value?.name }}
          </h1>
        </div>
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
