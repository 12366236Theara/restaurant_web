import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { apiGet } from '@/lib/http' // uses VITE_API_BASE_URL
import type { StoreConfig } from '@/types/store'

export function useStoreConfig() {
  const route = useRoute()
  const dbcode = computed(() => (route.params.customerId as string | undefined) ?? '')

  const config = ref<StoreConfig | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchConfig() {
    if (!dbcode.value) return
    loading.value = true
    error.value = null
    try {
      // adjust the path to match your backend
      const data = await apiGet<StoreConfig>('/api/v1/store/config', {
        dbcode: dbcode.value,
      })

      config.value = data
      applyTheme(data)
    } catch (e: any) {
      error.value = e?.message ?? String(e)
      config.value = null
    } finally {
      loading.value = false
    }
  }

  function applyTheme(c?: StoreConfig | null) {
    const root = document.documentElement
    if (!c) return
    if (c.primaryColor) root.style.setProperty('--primary', c.primaryColor)
    if (c.secondaryColor) root.style.setProperty('--secondary', c.secondaryColor)
    if (c.accentColor) root.style.setProperty('--accent', c.accentColor)
  }

  watch(
    () => dbcode.value,
    () => fetchConfig(),
    { immediate: true },
  )

  return { dbcode, config, loading, error, fetchConfig }
}
