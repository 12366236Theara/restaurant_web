import { computed, ref, onMounted } from 'vue'
import { apiGet } from '@/lib/http'
import { mapApiMenuItem } from '@/lib/mapMenu'
import type { MenuItem } from '@/types/menu'
import type { ApiPaginationRes, ApiMenuItem } from '@/types/api'

type PageParams = { page?: number; limit?: number }

export function useMenu() {
  // server data
  const all = ref<MenuItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // pagination
  const page = ref(1)
  const totalPages = ref(1)
  const limit = ref(20) // adjust if your API uses different default
  const totalItems = ref(0)

  // UI state
  const query = ref<string>('')
  const category = ref<string>('All')
  const onlyAvailable = ref<boolean>(true)
  const activeItem = ref<MenuItem | null>(null)

  // categories (built from loaded pages)
  const categories = computed(() => {
    const set = new Set<string>()
    for (const i of all.value) set.add(i.category)
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  })

  async function fetchPage({ page: pg = 1, limit: lm = limit.value }: PageParams = {}) {
    loading.value = true
    error.value = null
    try {
      const res = await apiGet<ApiPaginationRes<ApiMenuItem>>('/api/v1/menu/public_menu', {
        page: pg,
        limit: lm,
        dbcode: 'AA001',
      })

      totalItems.value = res.meta.totalItems
      totalPages.value = res.meta.totalPages ?? 1
      page.value = res.meta.currentPage ?? pg

      const mapped = res.data.map(mapApiMenuItem)
      if (pg === 1) {
        all.value = mapped
      } else {
        // de-dup by id
        const seen = new Set(all.value.map((x) => x.id))
        for (const m of mapped) if (!seen.has(m.id)) all.value.push(m)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      error.value = e?.message ?? String(e)
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (page.value >= totalPages.value || loading.value) return
    await fetchPage({ page: page.value + 1, limit: limit.value })
  }

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    return all.value.filter((i) => {
      if (onlyAvailable.value && i.available === false) return false
      if (category.value !== 'All' && i.category !== category.value) return false
      if (!q) return true
      const hay = `${i.name} ${i.description ?? ''} ${i.category}`.toLowerCase()
      return hay.includes(q)
    })
  })

  const byCategory = computed(() => {
    const map = new Map<string, MenuItem[]>()
    for (const item of filtered.value) {
      const key = item.category
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  })

  onMounted(() => {
    fetchPage({ page: 1, limit: limit.value })
  })

  return {
    // server
    all,
    loading,
    error,
    page,
    totalPages,
    limit,
    totalItems,
    fetchPage,
    loadMore,
    // ui
    query,
    category,
    onlyAvailable,
    activeItem,
    // derived
    categories,
    filtered,
    byCategory,
  }
}
