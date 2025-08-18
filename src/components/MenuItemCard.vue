<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MenuItem } from '@/types/menu'
import { formatPrice } from '@/lib/format'

const props = defineProps<{ item: MenuItem }>()
const emit = defineEmits<{ (e: 'open'): void }>()

const imgBroken = ref(false)

const hasUrl = computed(() => !!props.item.image && props.item.image.trim().length > 0)
console.log('HAS URL ', hasUrl.value)
const showImg = computed(() => hasUrl.value && !imgBroken.value)

function onImgError() {
  imgBroken.value = true
}
</script>

<template>
  <article
    class="group rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-sm transition cursor-pointer"
    @click="emit('open')"
  >
    <div class="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
      <!-- Actual image -->
      <img
        v-if="showImg"
        :src="props.item.image"
        :alt="props.item.name"
        class="h-full w-full object-cover transition group-hover:scale-[1.03]"
        loading="lazy"
        @error="onImgError"
      />

      <!-- Fallback placeholder -->
      <img
        v-else
        src="/image/noimage.jpg"
        alt="No image available"
        class="h-full w-full object-contain"
      />

      <span
        v-if="props.item.featured"
        class="absolute left-2 top-2 text-[11px] uppercase tracking-wide bg-black text-white/90 px-2 py-1 rounded"
        >Featured</span
      >

      <span
        v-if="props.item.available === false"
        class="absolute right-2 top-2 text-[11px] uppercase tracking-wide bg-amber-600 text-white px-2 py-1 rounded"
        >Sold out</span
      >
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between gap-3">
        <h4 class="text-base font-semibold leading-tight">{{ props.item.name }}</h4>
        <div class="shrink-0 rounded bg-neutral-900 text-white text-xs px-2 py-1">
          {{ formatPrice(props.item.price) }}
        </div>
      </div>

      <p v-if="props.item.description" class="mt-1.5 text-sm text-neutral-600 line-clamp-2">
        {{ props.item.description }}
      </p>

      <div v-if="props.item.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="t in props.item.tags"
          :key="t"
          class="text-[11px] px-2 py-0.5 rounded-full border border-neutral-300 text-neutral-700 bg-neutral-50"
          >{{ t }}</span
        >
      </div>
    </div>
  </article>
</template>
