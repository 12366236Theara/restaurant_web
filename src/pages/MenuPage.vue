<script setup lang="ts">
import MenuSearch from '@/components/MenuSearch.vue'
import MenuCategoryTabs from '@/components/MenuCategoryTabs.vue'
import MenuItemCard from '@/components/MenuItemCard.vue'
import MenuItemModal from '@/components/MenuItemModal.vue'
import { useMenu } from '@/composables/useMenu'

const m = useMenu()

const loading = m.loading
const error = m.error
const categories = m.categories
const query = m.query
const onlyAvailable = m.onlyAvailable
const category = m.category
const byCategory = m.byCategory
const activeItem = m.activeItem
</script>

<template>
  <section class="mx-auto max-w-6xl px-4">
    <div class="py-5 md:py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <MenuSearch v-model:query="query" v-model:only-available="onlyAvailable" />
    </div>

    <MenuCategoryTabs :categories="categories" v-model="category" />

    <div class="mt-8 space-y-12">
      <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Failed to load menu: {{ error }}
        <button class="ml-3 underline" @click="m.fetchPage({ page: 1, limit: m.limit.value })">
          Retry
        </button>
      </div>

      <template v-if="loading && m.all.value.length === 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6"
            :key="n"
            class="rounded-xl border border-neutral-200 bg-white overflow-hidden"
          >
            <div class="aspect-[4/3] bg-neutral-100 animate-pulse" />
            <div class="p-4 space-y-2">
              <div class="h-4 w-1/2 bg-neutral-200 rounded animate-pulse"></div>
              <div class="h-3 w-2/3 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <template v-for="[cat, items] in byCategory" :key="cat">
          <div>
            <h3 class="text-xl font-semibold tracking-tight mb-5">{{ cat }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MenuItemCard
                v-for="item in items"
                :key="item.id"
                :item="item"
                @open="activeItem = item"
              />
            </div>
          </div>
        </template>

        <p v-if="m.filtered.value.length === 0" class="text-neutral-500">
          No items match your filters.
        </p>

        <div class="pt-6 flex items-center justify-center">
          <button
            v-if="m.page < m.totalPages"
            class="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50"
            :disabled="loading"
            @click="m.loadMore"
          >
            {{ m.loading ? 'Loading…' : 'Load more' }}
          </button>
          <p v-else class="text-sm text-neutral-500">
            Showing {{ m.all.value.length }} of {{ m.totalItems }} items.
          </p>
        </div>
      </template>
    </div>

    <MenuItemModal v-if="activeItem" :item="activeItem" @close="activeItem = null" />
  </section>
</template>
