export const CLIENTS_PER_GROUP = 15

export function groupsNeeded(clientCount, perGroup = CLIENTS_PER_GROUP) {
  const safeCount = Number.isFinite(clientCount) ? clientCount : 0
  const safePerGroup = Number.isFinite(perGroup) && perGroup > 0 ? perGroup : CLIENTS_PER_GROUP
  return Math.max(1, Math.ceil(Math.max(0, safeCount) / safePerGroup))
}

