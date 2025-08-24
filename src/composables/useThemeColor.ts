// src/composables/useThemeColor.ts
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMenuStyle } from '@/lib/menuStyle'

export function useThemeColor() {
  const route = useRoute()
  const storeCode = computed(() => (route.params.customerId as string) || '')
  const color = ref<string | undefined>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    if (!storeCode.value) return
    loading.value = true
    error.value = null
    try {
      // cache by code to avoid flicker when navigating the same store
      const cacheKey = `menu-style:${storeCode.value}`
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        color.value = cached
        apply(color.value)
      }
      const c = await fetchMenuStyle(storeCode.value)
      if (c) {
        color.value = c
        sessionStorage.setItem(cacheKey, c)
        apply(c)
      }
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load menu style'
    } finally {
      loading.value = false
    }
  }

  function apply(c?: string) {
    if (!c) return
    // Apply as CSS variable; your UI can use var(--primary)
    document.documentElement.style.setProperty('--primary', c)
  }

  watch(
    () => storeCode.value,
    () => load(),
    { immediate: true },
  )

  return { storeCode, color, loading, error, reload: load }
}
