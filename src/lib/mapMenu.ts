import type { ApiMenuItem } from '@/types/api'
import type { MenuItem, MenuOptionGroup } from '@/types/menu'
import { toImageUrl } from '@/lib/http'

function pickCategory(i: ApiMenuItem): string {
  // Prefer Khmer, then EN, fall back to generic
  return (
    i.category?.DESC_KH?.trim() ||
    i.CAT_DESC_KH?.trim() ||
    i.category?.DESC_EN?.trim() ||
    i.CAT_DESC_EN?.trim() ||
    ''
  )
}

function buildOptions(i: ApiMenuItem): MenuOptionGroup[] {
  const groups: MenuOptionGroup[] = []
  for (const g of i.GROUP_OPTIONS ?? []) {
    for (const d of g.GROUP_DETAIL ?? []) {
      groups.push({
        code: d.GROUP_CODE,
        name: d.GROUP_NAME,
        required: !!d.IS_REQUIRED,
        multiselect: !!d.IS_MULTISELECT,
        choices: (d.OPT_CHOICES ?? []).map((c) => ({
          code: c.CHOICE_CODE,
          name: c.CHOICE_NAME,
          price: c.PRICE ?? 0,
        })),
      })
    }
  }
  return groups
}

export function mapApiMenuItem(i: ApiMenuItem): MenuItem {
  return {
    id: i.ITEM_CODE,
    name: i.ITEM_DESC,
    price: i.ITEM_PRICE1,
    image: toImageUrl(i.ITEM_IMG),
    category: pickCategory(i),
    available: i.ITEM_STAT === 'A',
    featured: false,
    options: buildOptions(i),
    // description: you can compose from ingredients if you want:
    // description: i.INGREDIENTS?.map(x => x.INGREDIENTS_DETAIL?.ITEM_DESC).filter(Boolean).join(" • ")
  }
}
