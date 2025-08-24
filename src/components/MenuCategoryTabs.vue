<script setup lang="ts">
const props = defineProps<{
  categories: readonly string[]
}>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div
    class="sticky top-[60px] z-40 bg-neutral-50/80 backdrop-blur border-b border-neutral-200 -mx-4"
  >
    <div class="mx-auto max-w-6xl px-4 overflow-auto">
      <div class="flex gap-2 py-3">
        <button
          v-for="c in props.categories"
          :key="c"
          @click="model = c"
          class="px-3 py-1.5 text-sm rounded-full border transition-colors whitespace-nowrap"
          :class="
            model === c
              ? 'text-white bg-[var(--primary)] border-[var(--primary)]'
              : 'bg-white text-neutral-700 border-neutral-300 hover:border-[var(--primary)] hover:text-[var(--primary)]'
          "
        >
          {{ c }}
        </button>
      </div>
    </div>
  </div>
</template>
