import { useMemo, useState } from "react";
import type { FeaturedRoute, ChallengePost } from "../types/challenges";

type Props = {
  route: FeaturedRoute;
  posts: ChallengePost[];
  userPoints: number;
  onClose: () => void;
  onLike: (postId: string) => void;
  onConfirm: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
};

function buildFakePosts(route: FeaturedRoute): ChallengePost[] {
  const nazca =
    "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-460363072-2?_a=BAVAZGID0";
  const titicaca =
    "https://media.istockphoto.com/id/843617562/es/foto/lago-titicaca-puno.jpg?s=612x612&w=0&k=20&c=DF0Yw321__wjupelWzvQuUc2Qu3Ojx-rHBxBczxGFEk=";
  const uyuni =
    "https://media.istockphoto.com/id/639412384/es/foto/amanecer-en-el-salar-de-uyuni-bolivia.jpg?s=612x612&w=0&k=20&c=_zY293KdaRmeC33_gwwtwKOsZyQTHqJFZv8xzkNoYN0=";
  const machu = "https://statics.corta.com/2025/09/68c9e403a75a4.jpeg";

  const bySlug: Record<string, string> = {
    "lake-titicaca-expedition": titicaca,
    "nazca-lines-flight": nazca,
    "machu-picchu-trail": machu,
  };

  const hero = bySlug[route.slug] ?? uyuni;

  return [
    {
      id: "fx1",
      userHandle: "alex.r",
      startedAgo: "just now",
      photoUrl: hero,
      likes: 3,
      comments: [{ user: "sofia", text: "Buen punto de referencia." }],
      confirmedCount: 0,
      isLocationConfirmed: false,
      sectorName: "San Roque",
      milestoneName: "First milestone",
      milestoneLabel: "El Alto → Titicaca Lake",
    },
    {
      id: "fx2",
      userHandle: "mariana.v",
      startedAgo: "1h ago",
      photoUrl: hero,
      likes: 9,
      comments: [{ user: "tomas_q", text: "Creo que es la orilla sur." }],
      confirmedCount: 2,
      isLocationConfirmed: false,
      sectorName: "Bahía Sur",
      milestoneName: "First milestone",
      milestoneLabel: "El Alto → Titicaca Lake",
    },
  ];
}

export default function ChallengePostModal({
  route,
  posts,
  userPoints,
  onClose,
  onLike,
  onConfirm,
  onComment,
}: Props) {
  // no gating while simulating
  const canVerify = true;

  const initialFeed = useMemo(
    () => (posts.length ? posts : buildFakePosts(route)),
    [posts, route]
  );

  const [feed, setFeed] = useState(
    initialFeed.map((p) => ({
      ...p,
      _liked: false as boolean,
      _verifyFlash: null as null | "correct" | "incorrect",
      _pulse: false as boolean,
    }))
  );

  const routeDistance =
    route.distance?.replace("Distance:", "").trim() || "unknown";
  const routeCategory = "Category 2";

  function toggleLike(postId: string) {
    setFeed((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextLiked = !p._liked;
        return {
          ...p,
          _liked: nextLiked,
          likes: p.likes + (nextLiked ? 1 : -1),
        };
      })
    );
    // onLike(postId) // enable later
  }

  function verify(postId: string, verdict: "correct" | "incorrect") {
    setFeed((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        if (verdict === "correct") {
          return {
            ...p,
            isLocationConfirmed: true,
            confirmedCount: p.confirmedCount + 1,
            _verifyFlash: "correct",
            _pulse: false,
          };
        }
        return { ...p, _verifyFlash: "incorrect", _pulse: true };
      })
    );
    window.setTimeout(() => {
      setFeed((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, _verifyFlash: null, _pulse: false } : p
        )
      );
    }, 1600);
    // onConfirm(postId) // enable later
  }

  function submitComment(postId: string, text: string) {
    setFeed((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { user: "you", text }] }
          : p
      )
    );
    onComment(postId, text);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-community-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      <div className="relative z-10 w-full sm:max-w-2xl sm:rounded-2xl bg-white shadow-xl sm:mx-0 mx-2 overflow-hidden transition">
        {/* Header */}
        <div className="px-5 py-4 border-b border-black/5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                id="route-community-title"
                className="text-[18px] font-semibold text-[#0d171c] tracking-tight"
              >
                {route.title} — Community activity
              </h3>
              <p className="text-sm text-[#4b5a61]">
                See what others are posting and help validate locations
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg.black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8dd0]"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Acceptance banner */}
          <div className="mt-3 rounded-lg bg-[#f4f9fc] border border-[#e6eef4] px-4 py-3 text-sm">
            <span className="font-semibold text-[#0d171c]">
              {feed[0]?.userHandle ?? "user"}
            </span>{" "}
            <span className="text-[#4b5a61]">
              has accepted the challenge from{" "}
              <span className="font-medium text-[#0d171c]">{route.title}</span>.
              Route length <span className="font-medium">{routeDistance}</span>,{" "}
              {routeCategory}. Do you think they will make it?
            </span>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[70vh] overflow-y-auto">
          <ul className="divide-y divide-[#eef2f5]">
            {feed.map((p) => (
              <li
                key={p.id}
                className={[
                  "p-5 space-y-3 transition",
                  p._pulse
                    ? "animate-[pulse_0.6s_ease-in-out_2] border border-[#ffd6d6] rounded-lg"
                    : "",
                ].join(" ")}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-sm text-[#4b5a61]">
                    <span className="font-semibold text-[#0d171c]">
                      {p.userHandle}
                    </span>{" "}
                    started this challenge {p.startedAgo}
                  </p>
                  <div className="text-xs text-[#4b5a61]">
                    {p.isLocationConfirmed
                      ? `Verified by community • ${p.confirmedCount}`
                      : `Awaiting verification`}
                  </div>
                </div>

                <div className="rounded-md bg-[#f7fbfd] border border-[#e6f0f6] px-3 py-2 text-sm text-[#0d171c]">
                  He just shared his first image of that sector (
                  <span className="font-medium">
                    {(p as any).sectorName ?? "San Roque"}
                  </span>
                  ) that belongs to the first milestone (
                  <span className="font-medium">
                    {(p as any).milestoneLabel ?? "El Alto → Titicaca Lake"}
                  </span>
                  ).
                </div>

                {/* Photo + actions */}
                <div className="relative overflow-hidden rounded-xl">
                  {/* prevent the image from intercepting taps/clicks */}
                  <img
                    src={p.photoUrl}
                    alt=""
                    className="w-full h-56 object-cover pointer-events-none"
                  />
                  {/* ensure the action bar sits above the image and is clickable */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 z-10 pointer-events-auto">
                    <div className="flex items-center gap-3 text-white text-sm">
                      {/* Like */}
                      <button
                        type="button"
                        onClick={() => toggleLike(p.id)}
                        className={[
                          "inline-flex items-center gap-1 rounded px-2 py-1 transition transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                          p._liked
                            ? "scale-105 bg-white/90 text-[#0d171c]"
                            : "hover:opacity-90",
                        ].join(" ")}
                        aria-pressed={p._liked}
                        aria-label="Like photo"
                        title={p._liked ? "Unlike" : "Like"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M12 21s-6-4.35-9-7.5C-0.5 9.5 2 4 6.5 5.5 8.5 6.2 10 8 12 10c2-2 3.5-3.8 5.5-4.5C22 4 24.5 9.5 21 13.5 18 16.65 12 21 12 21" />
                        </svg>
                        {p.likes}
                      </button>

                      {/* Verify actions - always enabled in simulation */}
                      <div className="ml-auto flex gap-2">
                        <button
                          type="button"
                          onClick={() => verify(p.id, "correct")}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm bg-white/90 text-[#0d171c] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label="Mark as correct location"
                          title="Confirm location"
                        >
                          Correct
                        </button>
                        <button
                          type="button"
                          onClick={() => verify(p.id, "incorrect")}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm bg-white/90 text-[#0d171c] hover:bg.white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label="Mark as incorrect location"
                          title="Report incorrect location"
                        >
                          Incorrect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline feedback chips */}
                {p._verifyFlash && (
                  <div
                    className={[
                      "inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs",
                      p._verifyFlash === "correct"
                        ? "bg-[#e8f6ed] text-[#0e7a3a] border border-[#c9ecd5]"
                        : "bg-[#fff1f1] text-[#8a1111] border border-[#ffd6d6]",
                    ].join(" ")}
                    aria-live="polite"
                  >
                    {p._verifyFlash === "correct"
                      ? "Thanks. Your confirmation helps keep routes accurate."
                      : "Thanks. Your report helps keep content reliable."}
                  </div>
                )}

                {/* Comments */}
                <div className="space-y-2">
                  {p.comments.slice(0, 3).map((c, i) => (
                    <p key={i} className="text-sm">
                      <span className="font-semibold text-[#0d171c]">
                        {c.user}
                      </span>{" "}
                      <span className="text-[#4b5a61]">{c.text}</span>
                    </p>
                  ))}
                </div>

                {/* Add comment */}
                <form
                  className="flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.elements.namedItem(
                      "comment"
                    ) as HTMLInputElement;
                    const value = input.value.trim();
                    if (!value) return;
                    submitComment(p.id, value);
                    input.value = "";
                  }}
                >
                  <input
                    name="comment"
                    placeholder="Add a helpful comment..."
                    className="flex-1 rounded-md border border-[#dbe6ec] px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="h-9 rounded-md bg-[#0da6f2] hover:bg-[#0a8dd0] px-3 text-sm font-semibold text-white"
                  >
                    Post
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-black/5 text-xs text-[#4b5a61]">
          Simulation mode. All actions are local.
        </div>
      </div>
    </div>
  );
}
