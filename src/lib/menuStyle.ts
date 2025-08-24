// src/lib/menuStyle.ts
import { apiGet } from '@/lib/http' // or swap for your axios instance

export interface MenuStyleResponse {
  success: boolean
  data?: { color?: string | null }
}

export async function fetchMenuStyle(storeCode: string): Promise<string | undefined> {
  const res = await apiGet<MenuStyleResponse>(`/api/v1/menu_qrcode/menu-style/${storeCode}`)
  const color = res?.data?.color?.trim()
  // Guard: accept only valid 3/6/8-digit hex (#RGB, #RRGGBB, #RRGGBBAA)
  if (color && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)) return color
  return undefined
}
