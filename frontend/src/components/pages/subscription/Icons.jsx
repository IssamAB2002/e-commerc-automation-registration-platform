import { T } from '../../../design/pages/subscription/designTokens.js'

export function CheckIcon({ color = T.cyan }) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5L6 11L12.5 4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CrossIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
      aria-hidden="true"
    >
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke={T.muted}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}
