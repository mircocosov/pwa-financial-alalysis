export const palette = {
  background: '#0d111c',
  backgroundAlt: '#101523',
  surface: '#161d2f',
  surfaceElevated: '#1c243a',
  surfaceMuted: '#232d46',
  border: '#2d3753',
  borderStrong: 'rgba(255, 255, 255, 0.1)',
  accent: '#f9b54c',
  accentStrong: '#d89425',
  accentSoft: '#fff2d3',
  positive: '#4ade80',
  negative: '#f87171',
  warning: '#fbbf24',
  info: '#38bdf8',
  textPrimary: '#f5f7fb',
  textSecondary: '#c4c9db',
  textMuted: '#8a93aa',
  grid: 'rgba(255, 255, 255, 0.06)',
  divider: 'rgba(255, 255, 255, 0.08)',
  overlay: 'rgba(5, 9, 18, 0.75)',
  tooltip: '#111827',
} as const

export const typography = {
  fontFamily: {
    base: `'IBMPlexSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    heading: `'IBMPlexSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'IBMPlexSans', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`,
  },
  sizes: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 28,
} as const

export const shadows = {
  soft: '0 18px 50px rgba(7, 11, 27, 0.35)',
  inset: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
} as const

export const layout = {
  maxWidth: 1280,
  desktopGutter: 32,
  mobileGutter: 20,
  sectionGap: 28,
} as const

export type Theme = {
  palette: typeof palette
  typography: typeof typography
  spacing: typeof spacing
  radii: typeof radii
  shadows: typeof shadows
  layout: typeof layout
}

export const theme: Theme = {
  palette,
  typography,
  spacing,
  radii,
  shadows,
  layout,
}

export type ColorKey = keyof typeof palette
export type SpacingKey = keyof typeof spacing
