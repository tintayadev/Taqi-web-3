// src/pages/Pagina1.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { WalletConnect } from "../components/WalletConnect";
import { useTaqiContracts } from "../hooks/useTaqiContracts";
import { useFarcaster } from "../hooks/useFarcaster";
import profile from "/src/assets/Presentación_Tecnología_Diseño_Web_colorida_sencilla_moderna__3__1-removebg-preview.png";
import profile1 from "/src/assets/Presentación Tecnología Diseño Web colorida sencilla moderna31.png";
import profile2 from "/src/assets/bro.jpg";
import logo from "/src/assets/Group 5.png";
import nft1 from "/src/assets/Presentación Tecnología Diseño Web colorida sencilla moderna5.png";
import nft2 from "/src/assets/Presentación_Tecnología_Diseño_Web_colorida_sencilla_moderna__4__2-removebg-preview.png";
import nft3 from "/src/assets/Depth 7, Frame 0.png";
import FeaturedRoutes from "../components/FeaturedRoutes";
import ChallengePostModal from "../components/ChallengePostModal";
import { FEATURED_ROUTES } from "../data/featuredRoutes";
import { ROUTE_POSTS } from "../data/mockPosts";

const Pagina1 = () => {
  const { address, isConnected } = useAccount();
  const {
    userProfile,
    creditsBalance,
    userNFTs,
    userPoints,
    createProfile,
    refetchAll,
  } = useTaqiContracts();

  const { shareAchievement, shareRouteCompletion } = useFarcaster();
  const [username, setUsername] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);

  // NEW: mobile nav toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  // Estado para la información del perfil que cambia dinámicamente
  const [currentProfile, setCurrentProfile] = useState({
    image: profile1,
    name: "Traveler",
    level: "Level 1 Explorer",
  });

  useEffect(() => {
    // Definimos el perfil que queremos mostrar
    const newProfile = isConnected
      ? {
          image: profile2,
          name: "Paulo",
          level: address,
        }
      : {
          image: profile1,
          name: "Traveler",
          level: "Level 1 Explorer",
        };

    // Solo actualizamos el estado si el perfil es diferente al actual
    // Esto previene un bucle de re-renderizado
    if (
      newProfile.image !== currentProfile.image ||
      newProfile.name !== currentProfile.name ||
      newProfile.level !== currentProfile.level
    ) {
      setCurrentProfile(newProfile);
    }
  }, [isConnected, address]); // Solo dependemos de isConnected y address

  // Mantenemos este useEffect por separado para refetchAll
  useEffect(() => {
    if (isConnected && address) {
      refetchAll();
    }
  }, [isConnected, address, refetchAll]);

  const handleCreateProfile = async () => {
    if (username.trim()) {
      try {
        await createProfile(username.trim());
        setShowProfileModal(false);
        setUsername("");
        refetchAll();
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    }
  };

  const handleShareAchievement = async () => {
    try {
      await shareAchievement(
        "Explorer Badge",
        "https://taqi.com/nft/explorer-badge"
      );
    } catch (error) {
      console.error("Error sharing achievement:", error);
    }
  };
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const openRouteModal = (slug: string) => {
    setSelectedRoute(slug);
    setRouteModalOpen(true);
  };

  const handleLike = (postId: string) => {
    // TODO call API then refetch
  };

  const handleConfirm = (postId: string) => {
    // TODO call API then refetch
  };

  const handleComment = (postId: string, text: string) => {
    // TODO call API then refetch
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fbfc] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="gap-1 px-0 flex flex-1 justify-center py-5">
          {/* Make the two columns stack on small screens */}
          <div className="flex w-full max-w-[1280px] flex-col md:flex-row md:items-start md:gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="layout-content-container flex flex-col w-full md:w-80 md:shrink-0">
              {/* User Profile */}
              <div className="flex p-4 @container">
                <div className="flex w-full flex-col gap-4 items-center">
                  <div className="flex gap-4 flex-col items-center">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 sm:min-h-28 sm:w-28 md:min-h-32 md:w-32"
                      // Usar el estado dinámico para la imagen de perfil
                      style={{
                        backgroundImage: `url(${currentProfile.image})`,
                      }}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-[#0d171c] text-[20px] sm:text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                        {/* Usar el estado dinámico para el nombre */}
                        {currentProfile.name}
                      </p>
                      <p className="text-[#49819c] text-sm sm:text-base font-normal leading-normal text-center">
                        {/* Usar el estado dinámico para el nivel/dirección */}
                        {currentProfile.level}
                      </p>
                      {!userProfile && isConnected && (
                        <button
                          onClick={() => setShowProfileModal(true)}
                          className="mt-2 px-3 py-1 bg-[#0da6f2] text-white text-xs rounded hover:bg-[#0b8cc7] transition-colors"
                        >
                          Create Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="flex items-center gap-4 bg-[#f8fbfc] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="text-[#0d171c] flex items-center justify-center rounded-lg bg-[#e7eff4] shrink-0 size-10 sm:size-12"
                    data-icon="CurrencyDollar"
                    data-size="24px"
                    data-weight="regular"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">
                      Balance
                    </p>
                    <p className="text-[#49819c] text-sm font-normal leading-normal line-clamp-2">
                      {isConnected
                        ? `${creditsBalance} TAQI-CREDITS`
                        : "Connect Wallet"}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link to="/tucredits">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#e7eff4] text-[#0d171c] text-sm font-medium leading-normal w-fit">
                      <span className="truncate">Top Up Credits</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Stats (only when wallet is connected; fake values if missing) */}
              {isConnected && (
                <>
                  <h3 className="text-[#0d171c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                    Stats
                  </h3>

                  {(() => {
                    // ---- Goals (adjust later) ----
                    const MONTHLY_ROUTE_GOAL = 10;
                    const NFT_GOAL = 5;

                    // ---- Real or Fake (only applied when connected) ----
                    const FAKE_ROUTES_COMPLETED = 3; // e.g., 3/10
                    const FAKE_NFTS_COLLECTED = 2; // e.g., 2/5
                    const FAKE_TOTAL_POINTS = 120; // e.g., 120/250 (toward next level)

                    // Prefer real data; if falsy or 0, use fake
                    const routesCompleted =
                      (userProfile?.routesCompleted ?? 0) > 0
                        ? (userProfile!.routesCompleted as number)
                        : FAKE_ROUTES_COMPLETED;

                    const nftsCollected =
                      (userNFTs?.length ?? 0) > 0
                        ? userNFTs!.length
                        : FAKE_NFTS_COLLECTED;

                    const totalPoints =
                      (userProfile?.totalPoints ?? 0) > 0
                        ? (userProfile!.totalPoints as number)
                        : FAKE_TOTAL_POINTS;

                    // Next level cap (simple thresholds; align later with your leveling)
                    const nextPointsThreshold = (points: number) => {
                      if (points < 50) return 50;
                      if (points < 100) return 100;
                      if (points < 250) return 250;
                      if (points < 500) return 500;
                      return Math.ceil((points + 1) / 250) * 250;
                    };
                    const pointsCap = nextPointsThreshold(totalPoints);

                    const pct = (num: number, den: number) =>
                      den > 0
                        ? Math.min(100, Math.round((num / den) * 100))
                        : 0;

                    const fmt = (num: number, den: number) => `${num}/${den}`;

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 px-4 py-3">
                        {/* Routes Completed */}
                        <div className="flex flex-col gap-2 rounded-lg border border-[#cee0e8] p-3">
                          <p className="text-[#0d171c] text-2xl font-bold leading-tight">
                            {fmt(routesCompleted, MONTHLY_ROUTE_GOAL)}
                          </p>
                          <p className="text-[#49819c] text-sm leading-normal">
                            Routes Completed (monthly goal)
                          </p>
                          <div className="h-2 w-full rounded bg-[#eef5f8] overflow-hidden">
                            <div
                              className="h-full bg-[#0da6f2] transition-all"
                              style={{
                                width: `${pct(
                                  routesCompleted,
                                  MONTHLY_ROUTE_GOAL
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* NFTs Collected */}
                        <div className="flex flex-col gap-2 rounded-lg border border-[#cee0e8] p-3">
                          <p className="text-[#0d171c] text-2xl font-bold leading-tight">
                            {fmt(nftsCollected, NFT_GOAL)}
                          </p>
                          <p className="text-[#49819c] text-sm leading-normal">
                            NFTs Collected
                          </p>
                          <div className="h-2 w-full rounded bg-[#eef5f8] overflow-hidden">
                            <div
                              className="h-full bg-[#0da6f2] transition-all"
                              style={{
                                width: `${pct(nftsCollected, NFT_GOAL)}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Total Points */}
                        <div className="flex flex-col gap-2 rounded-lg border border-[#cee0e8] p-3">
                          <p className="text-[#0d171c] text-2xl font-bold leading-tight">
                            {fmt(totalPoints, pointsCap)}
                          </p>
                          <p className="text-[#49819c] text-sm leading-normal">
                            Total Points (to next level)
                          </p>
                          <div className="h-2 w-full rounded bg-[#eef5f8] overflow-hidden">
                            <div
                              className="h-full bg-[#0da6f2] transition-all"
                              style={{
                                width: `${pct(totalPoints, pointsCap)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}

              {/* Achievements */}
              <h3 className="text-[#0d171c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Achievements
              </h3>
              <div className="flex flex-col gap-3 p-4">
                <div className="flex gap-6 justify-between">
                  <p className="text-[#0d171c] text-base font-medium leading-normal">
                    Explorer Badge
                  </p>
                </div>
                <div className="rounded bg-[#cee0e8]">
                  <div
                    className="h-2 rounded bg-[#0da6f2]"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-[#49819c] text-sm font-normal leading-normal">
                  75% Complete
                </p>
                <div className="flex gap-6 justify-between mt-3">
                  <p className="text-[#0d171c] text-base font-medium leading-normal">
                    Collector Badge
                  </p>
                </div>
                <div className="rounded bg-[#cee0e8]">
                  <div
                    className="h-2 rounded bg-[#0da6f2]"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <p className="text-[#49819c] text-sm font-normal leading-normal">
                  50% Complete
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <section className="layout-content-container flex flex-col w-full max-w-[960px] md:flex-1 mt-4 md:mt-0">
              <h2 className="text-[#0d171c] tracking-light text-[24px] md:text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
                Explore Your World
              </h2>

              <Link
                className="text-[#0d171c] text-sm font-medium leading-normal"
                to="/location"
              >
                <div className="flex px-4 py-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg object-cover"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDORfNA8EGU48kIeU9n3b7gMu4gsTxxdenpJtseZu3VBJ14SunzH7aojuYsBEawyfmpDjdAfWDJwx3TAJbOh2Nqu36RW4ae98k0gdRKqD_LCxR-DAza5PNIzsWVTbrbwkhFGz0Adcb4NXtPK_Jma6DGCMtnCi8bGLI4eb3pz0klmu319SpOJTqwxC-NDkS_mTXDOhpByTN_rzeUKsQ0WGTizEzkGxq_cO0h-N_ObP-yAcvg4Daps6HAAKNE5qBhMbOCc7ICwVWJtWQ")',
                    }}
                  />
                </div>
              </Link>
              <FeaturedRoutes
                routes={FEATURED_ROUTES}
                onOpen={openRouteModal}
              />

              {routeModalOpen && selectedRoute && (
                <ChallengePostModal
                  route={FEATURED_ROUTES.find((r) => r.slug === selectedRoute)!}
                  posts={ROUTE_POSTS[selectedRoute] ?? []}
                  userPoints={userPoints ?? 0}
                  onClose={() => setRouteModalOpen(false)}
                  onLike={handleLike}
                  onConfirm={handleConfirm}
                  onComment={handleComment}
                />
              )}

              <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                My NFTs
              </h2>

              <Link
                className="text-[#0d171c] text-sm font-medium leading-normal"
                to="/nfts"
              >
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 p-4">
                  {[nft1, nft2, nft3].map((img, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </div>
                  ))}
                </div>
              </Link>

              <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Upcoming Events
              </h2>

              <div className="p-4">
                {/* Stack on small screens, keep side-by-side on md+ */}
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-lg">
                  <div className="flex flex-[2_2_0px] flex-col gap-4 order-2 md:order-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#49819c] text-sm font-normal leading-normal">
                        Event
                      </p>
                      <p className="text-[#0d171c] text-base font-bold leading-tight">
                        Andean Music Festival
                      </p>
                      <p className="text-[#49819c] text-sm font-normal leading-normal">
                        Join us for a celebration of traditional Andean music
                        and dance.
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#e7eff4] text-[#0d171c] text-sm font-medium leading-normal w-fit">
                      <span className="truncate">View Details</span>
                    </button>
                  </div>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 order-1 md:order-2"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCa_LjDy1VWkXV7ZDGShrNR67w0mf98iPy9wu0BIhI3RdDAJeer6DjRmp-jla71-Yk7mFvjtLPzJN2TvEZduJwuZxUgitZZewXZWdYUJwdY5eCnjNNqvet850YxuIPan5bEI9yQwKYTtiqUz4Ck1tTOibAKGRb2FLGe9w4ElNUNfcoxtuUX8miUhLGWE4UFmkNEmY4Vrtsmk_iPnNFTjPd9DJXmQCXxnEyMbuLvYtgSDdVKvr0kCURMNIiLnCZxkzRK6uLbGjpOh9U")',
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Profile Creation Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full sm:w-96 max-w-md">
            <h3 className="text-lg font-bold text-[#0d171c] mb-4">
              Create Your Profile
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#0d171c] mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-[#cee0e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0da6f2]"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 text-[#49819c] border border-[#cee0e8] rounded-lg hover:bg-[#f8fbfc] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                disabled={!username.trim()}
                className="px-4 py-2 bg-[#0da6f2] text-white rounded-lg hover:bg-[#0b8cc7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagina1;
