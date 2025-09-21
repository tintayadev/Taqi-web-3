// src/pages/Pagina2.tsx
import React, { useMemo, useState } from "react";

type DetailPair = [string, string];

const DETAILS: Array<DetailPair> = [
  ["Distance", "10 km"],
  ["Estimated Time", "2 hours"],
  ["Difficulty", "Moderate"],
  ["Reward", "NFT Collectible"],
];

const MILESTONES = [
  "Checkpoint 1: Lago Titicaca",
  "Checkpoint 2: Cementerio de Trenes",
  "Checkpoint 3: Tiwuanacu",
  "Checkpoint 4: Aguas Termales de Oruro",
  "Finish Line: Salar de Uyuni",
];

type Challenge = {
  id: number;
  title: string;
  description: string;
  xp: number;
  imageUrl: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Take a photo at San Roque Urbanización",
    description:
      "From the starting point in La Ceja, your first mission is to capture a clear photo at San Roque Urbanización.",
    xp: 30,
    // TODO: Replace with a real image you’re allowed to use (drive, CDN, or your own asset).
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Find Isla de la Tortuga",
    description:
      "Head to “Isla de la Tortuga” and upload a photo that proves you reached the spot.",
    xp: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Photo by Lake Titicaca",
    description:
      "Near the shores of Lake Titicaca, take a landscape picture. Keep the horizon straight for extra style points.",
    xp: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
];

const Pagina2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const activeChallenge = useMemo(() => CHALLENGES[activeIndex], [activeIndex]);

  const handleOpen = () => {
    setActiveIndex(0);
    setUploadNotice(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setUploadNotice(null);
  };

  const handlePrev = () => {
    setUploadNotice(null);
    setActiveIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setUploadNotice(null);
    setActiveIndex((i) => Math.min(CHALLENGES.length - 1, i + 1));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Stub: here you would send to your API or storage.
    setUploadNotice(`Uploaded “${file.name}”. +${activeChallenge.xp} XP`);
    // Reset input so the same file can be selected again if needed.
    e.currentTarget.value = "";
  };

  return (
    <div className="w-full font-sans">
      {/* Hero */}
      <section className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#f8fbfc] @[480px]:rounded-lg min-h-[218px]"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url("https://www.lorenzoexpeditions.com/wp-content/uploads/2022/12/IMG_1019-scaled.jpg")',
            }}
          >
            <div className="flex p-4">
              <h1 className="text-white text-[24px] md:text-[28px] font-bold leading-tight tracking-tight">
                Salar de Uyuni
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="p-4">
        <dl className="divide-y divide-[#eef5f8]">
          {DETAILS.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-x-6 py-2">
              <dt className="text-[#49819c] text-sm leading-normal">{label}</dt>
              <dd className="text-[#0d171c] text-sm leading-normal text-right">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Milestones */}
      <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Milestones
      </h2>
      <ol className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
        {MILESTONES.map((text, idx) => {
          const isLast = idx === MILESTONES.length - 1;
          const isFirst = idx === 0;
          const isFinish = isLast;
          return (
            <React.Fragment key={`${idx}-${text}`}>
              <div
                className={`flex flex-col items-center gap-1 ${
                  isFirst ? "pt-3" : ""
                } ${isLast ? "pb-3" : ""}`}
              >
                {!isFirst && <div className="w-px bg-[#cee0e8] h-2" />}

                <div className="text-[#0d171c]">
                  {isFinish ? (
                    // trophy
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      aria-hidden
                      focusable="false"
                    >
                      <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z" />
                    </svg>
                  ) : (
                    // pin
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      aria-hidden
                      focusable="false"
                    >
                      <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                    </svg>
                  )}
                </div>

                {!isLast && <div className="w-px bg-[#cee0e8] h-2 grow" />}
              </div>

              <li
                className={`flex flex-1 flex-col ${isFirst ? "pt-3" : ""} ${
                  isLast ? "pb-5" : ""
                }`}
              >
                <p className="text-[#0d171c] text-base font-medium leading-normal">
                  {text}
                </p>
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      {/* CTA */}
      <div className="flex px-4 py-3 justify-center">
        <button
          type="button"
          onClick={handleOpen}
          className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#0da6f2] hover:bg-[#0a8dd0] text-white text-base font-bold tracking-[0.015em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8dd0] transition"
        >
          <span className="truncate">Start Challenge</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="challenge-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-100 transition-opacity"></div>

          {/* Panel */}
          <div className="relative z-10 w-full sm:max-w-lg sm:rounded-2xl bg-white shadow-xl sm:mx-0 mx-2 overflow-hidden transform transition-all duration-200 ease-out translate-y-0 sm:scale-100">
            {/* Header */}
            <div className="px-5 py-4 border-b border-black/5">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    id="challenge-modal-title"
                    className="text-[18px] font-semibold text-[#0d171c] tracking-tight"
                  >
                    Kickoff: La Ceja
                  </h3>
                  <p className="text-sm text-[#4b5a61]">
                    Your route begins at La Ceja. Complete the following
                    challenges to progress and earn XP.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8dd0]"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#0d171c]"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="px-5 pt-4">
              <div className="flex items-center gap-2">
                {CHALLENGES.map((c, i) => {
                  const done = i < activeIndex;
                  const current = i === activeIndex;
                  return (
                    <div key={c.id} className="flex items-center gap-2">
                      <div
                        className={[
                          "h-6 w-6 rounded-full grid place-items-center text-xs font-semibold",
                          done
                            ? "bg-[#0da6f2] text-white"
                            : current
                            ? "bg-[#e6f5fd] text-[#0da6f2]"
                            : "bg-[#edf2f5] text-[#6b7b82]",
                        ].join(" ")}
                        aria-label={
                          done
                            ? `Step ${i + 1} completed`
                            : current
                            ? `Step ${i + 1} current`
                            : `Step ${i + 1} pending`
                        }
                      >
                        {i + 1}
                      </div>
                      {i < CHALLENGES.length - 1 && (
                        <div className="h-px w-8 bg-[#e6edf2]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="px-5 pb-5 pt-4">
              {/* Thumbnail with subtle zoom on mount */}
              <div className="relative overflow-hidden rounded-xl shadow-sm">
                <img
                  src={activeChallenge.imageUrl}
                  alt=""
                  className="h-44 w-full object-cover transition-transform duration-300 ease-out will-change-transform"
                />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[#0d171c] shadow">
                  +{activeChallenge.xp} XP
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-[16px] font-semibold text-[#0d171c] tracking-tight">
                  {activeChallenge.title}
                </h4>
                <p className="text-sm text-[#4b5a61]">
                  {activeChallenge.description}
                </p>
              </div>

              {/* Upload stub */}
              <div className="mt-4">
                <label className="inline-flex items-center gap-2 rounded-lg border border-[#dbe6ec] px-4 py-2 text-sm font-medium text-[#0d171c] hover:bg-[#f7fbfd] cursor-pointer transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="sr-only"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <path d="M17 8l-5-5-5 5"></path>
                    <path d="M12 3v12"></path>
                  </svg>
                  Upload photo
                </label>

                {uploadNotice && (
                  <div className="mt-3 rounded-md bg-[#e8f6fd] px-3 py-2 text-sm text-[#0d171c] border border-[#cae9f9]">
                    {uploadNotice}
                  </div>
                )}
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex items-center justify-between gap-2 px-5 pb-5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="h-10 rounded-lg border border-[#dbe6ec] px-4 text-sm font-medium text-[#0d171c] disabled:opacity-50 hover:bg-[#f7fbfd] transition"
              >
                Previous
              </button>
              <div className="flex-1" />
              {activeIndex < CHALLENGES.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-10 rounded-lg bg-[#0da6f2] hover:bg-[#0a8dd0] px-4 text-sm font-semibold text-white transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="h-10 rounded-lg bg-[#0da6f2] hover:bg-[#0a8dd0] px-4 text-sm font-semibold text-white transition"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagina2;
