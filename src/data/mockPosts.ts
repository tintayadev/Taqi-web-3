import type { ChallengePost } from "../types/challenges"

export const ROUTE_POSTS: Record<string, ChallengePost[]> = {
  "lake-titicaca-expedition": [
    {
      id: "p1",
      userHandle: "mariana.v",
      startedAgo: "2h ago",
      photoUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      likes: 12,
      comments: [{ user: "diego", text: "Great angle near the pier" }],
      confirmedCount: 3,
      isLocationConfirmed: true,
    },
    {
      id: "p2",
      userHandle: "tomas_q",
      startedAgo: "1d ago",
      photoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      likes: 7,
      comments: [],
      confirmedCount: 0,
      isLocationConfirmed: false,
    },
  ],
}
