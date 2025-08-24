<script setup lang="ts">
/**
 * Parent uses: <MenuSearch v-model:query="query" />
 */
const query = defineModel<string>('query', { required: true })
</script>

<template>
  <div class="flex w-full items-center gap-3">
    <div class="flex-1">
      <label class="sr-only" for="menu-search">Search</label>
      <input
        id="menu-search"
        type="search"
        v-model="query"
        placeholder="ស្វែងរកម៉ឺនុយ…"
        class="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none border-neutral-300 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] caret-[var(--primary)]"
      />
    </div>
  </div>
</template>
