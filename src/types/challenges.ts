export type FeaturedRoute = {
  slug: string
  title: string
  distance: string
  img: string // CSS background-image value
}

export type Comment = { user: string; text: string }

export type ChallengePost = {
  id: string
  userHandle: string
  startedAgo: string
  photoUrl: string
  likes: number
  comments: Array<{ user: string; text: string }>
  confirmedCount: number
  isLocationConfirmed: boolean

  // NEW (optional, for richer fake UI)
  sectorName?: string           // e.g., "San Roque"
  milestoneName?: string        // e.g., "First milestone"
  milestoneLabel?: string       // e.g., "El Alto → Titicaca Lake"
}
