<script setup lang="ts">
/**
 * Vue 3.4+: defineModel gives perfect v-model typing.
 * Parent uses: <MenuSearch v-model:query="query" v-model:only-available="onlyAvailable" />
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
        class="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-800"
      />
    </div>
  </div>
</template>
