const BASE = import.meta.env.VITE_API_BASE_URL as string

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(path, BASE)
  if (params)
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
    })

  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
  return res.json() as Promise<T>
}

export function toImageUrl(path?: string): string | undefined {
  if (!path) return undefined
  // Ensure no double slashes
  return `${BASE.replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`
}
