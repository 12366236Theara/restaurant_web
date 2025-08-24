// src/composables/useStore.ts
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'

type StoreConfig = {
  dbcode: string
  name: string
  logo?: string | null
  primaryColor?: string | null
}

const _config = ref<StoreConfig | null>(null)
const _loading = ref(false)
const _error = ref<unknown>(null)
let _fetched = false

export function useStoreConfig() {
  const route = useRoute()
  const dbcode = computed(() => String(route.params.customerId ?? route.query.dbcode ?? 'AA001'))

  async function refresh() {
    if (_fetched) return
    _loading.value = true
    try {
      // Prefer the same base for API and asset building
      const API_BASE =
        (import.meta.env.VITE_API_BASE_URL as string) ||
        (import.meta.env.VITE_API_BASE as string) ||
        'http://192.168.1.137:12010'
      const base = API_BASE.replace(/\/+$/, '')
      const url = `${base}/api/v1/store/config?dbcode=${encodeURIComponent(dbcode.value)}`

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()

      // ✅ Assign as a whole object (avoids writing to null)

      const data = json?.data ?? {}
      const fullLogoUrl = data.logo ? `${base}/${data.logo}` : null
      _config.value = {
        dbcode: data.dbcode ?? dbcode.value,
        name: data.name ?? '',
        logo: fullLogoUrl,
        primaryColor: data.primaryColor ?? null,
      }

      _fetched = true // mark fetched only after success
    } catch (e) {
      _error.value = e
    } finally {
      _loading.value = false
    }
  }

  onMounted(refresh)

  // ✅ Apply theme globally whenever the config arrives/changes
  watchEffect(() => {
    const color = _config.value?.primaryColor
    if (typeof color === 'string' && color.trim()) {
      document.documentElement.style.setProperty('--primary', color)

      // <meta name="theme-color"> for mobile browser UI
      let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'theme-color'
        document.head.appendChild(meta)
      }
      meta.content = color
    }
  })

  // ✅ Build a full logo URL (handles relative paths from the API)
  const logoUrl = computed(() => {
    const path = _config.value?.logo
    if (!path || /\[object Sequelize/i.test(path)) return null
    if (/^https?:\/\//i.test(path)) return path

    // Keep env names consistent with refresh()
    const ASSET_BASE =
      (import.meta.env.VITE_ASSET_BASE as string) ||
      (import.meta.env.VITE_API_BASE_URL as string) ||
      (import.meta.env.VITE_API_BASE as string) ||
      (typeof window !== 'undefined' ? window.location.origin : '')
    return `${String(ASSET_BASE).replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`
  })

  return {
    config: _config,
    loading: _loading,
    error: _error,
    refresh,
    logoUrl,
  }
}
