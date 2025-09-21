import type { FeaturedRoute } from "../types/challenges";

type Props = {
  routes: FeaturedRoute[];
  onOpen: (slug: string) => void;
};

export default function FeaturedRoutes({ routes, onOpen }: Props) {
  return (
    <>
      <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Featured Routes
      </h2>

      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {routes.map((card) => (
            <button
              key={card.slug}
              type="button"
              onClick={() => onOpen(card.slug)}
              className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a8dd0]"
              aria-label={`Open community activity for ${card.title}`}
            >
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                style={{ backgroundImage: card.img }}
              />
              <div>
                <p className="text-[#0d171c] text-base font-medium leading-normal">
                  {card.title}
                </p>
                <p className="text-[#49819c] text-sm font-normal leading-normal">
                  {card.distance}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
