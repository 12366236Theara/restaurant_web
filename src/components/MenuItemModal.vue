<script setup lang="ts">
import type { MenuItem } from '@/types/menu'
import { formatPrice } from '@/lib/format'

const props = defineProps<{ item: MenuItem }>()
const emit = defineEmits<{ (e: 'close'): void }>()

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
    @click="onBackdrop"
  >
    <div class="w-full max-w-2xl rounded-2xl overflow-hidden bg-white shadow-lg">
      <div class="relative aspect-[16/9] bg-neutral-100">
        <img
          :src="props.item.image ?? 'https://via.placeholder.com/800x450?text=No+Image'"
          :alt="props.item.name"
          class="h-full w-full object-cover"
        />
        <button
          class="absolute right-3 top-3 size-9 grid place-items-center rounded-full bg-white/90 border border-neutral-200 hover:bg-white"
          @click="emit('close')"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div class="p-6 space-y-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold">{{ props.item.name }}</h3>
            <p v-if="props.item.description" class="mt-1 text-neutral-600">
              {{ props.item.description }}
            </p>
          </div>
          <div class="shrink-0 rounded bg-neutral-900 text-white font-medium px-3 py-1.5">
            {{ formatPrice(props.item.price) }}
          </div>
        </div>

        <div v-if="props.item.options?.length" class="space-y-4">
          <h4 class="text-sm font-semibold text-neutral-700 uppercase tracking-wide">Options</h4>
          <div class="space-y-3">
            <div
              v-for="g in props.item.options"
              :key="g.code"
              class="rounded-lg border border-neutral-200 p-3"
            >
              <div class="flex items-center justify-between">
                <div class="font-medium">{{ g.name }}</div>
                <div class="text-xs text-neutral-500">
                  {{ g.required ? 'Required' : 'Optional' }} •
                  {{ g.multiselect ? 'Multi select' : 'Single select' }}
                </div>
              </div>
              <ul class="mt-2 space-y-1 text-sm text-neutral-700">
                <li v-for="c in g.choices" :key="c.code" class="flex items-center justify-between">
                  <span>{{ c.name }}</span>
                  <span v-if="c.price">+ {{ formatPrice(c.price) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-right">
          <button
            class="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-100"
            @click="emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
