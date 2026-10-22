// Pieces shared by the static card replicas of Manifold's `m-card-catalog`
// widget (Section3Card, Section4Card).
const DOT = {
  available: 'bg-[#3a9d3f]',
  ended: 'bg-red-600',
  sold: 'bg-orange-500',
  soon: 'bg-blue-500',
};

function statusLabel({ status, remaining }) {
  if (status === 'available') return `available : ${remaining} remaining`;
  if (status === 'soon') return 'available soon';
  return status;
}

export function StatusBadge({ listing }) {
  return (
    <i className='absolute left-0 top-0 z-[1] flex items-center bg-black/50 px-[10px] py-[3px] text-[9px] leading-[15px] uppercase not-italic text-white'>
      <span
        className={`mr-[6px] block h-[5px] w-[5px] rounded-full ${
          DOT[listing.status] ?? 'bg-white'
        }`}
      />
      {statusLabel(listing)}
    </i>
  );
}

export function PriceLine({ listing }) {
  return (
    <span className='mt-[5px] uppercase'>
      <span className='mr-2 text-[x-small] font-bold'>Price</span>
      <span>{listing.price}</span>
    </span>
  );
}

const BUTTON_BASE =
  'flex h-6 items-center justify-center text-[x-small] uppercase transition-colors duration-200';

export function CardButton({ listing }) {
  if (listing.status === 'available') {
    return (
      <div
        className={`${BUTTON_BASE} bg-white text-black shadow-[0_1px_1px_0_rgba(0,0,0,.14)] hover:bg-neutral-300`}
      >
        Buy {listing.price} per token
      </div>
    );
  }
  // Same height as the buy button so every card is the same size.
  return (
    <div className={`${BUTTON_BASE} cursor-not-allowed bg-white/10 text-white/40`}>
      {listing.status === 'soon' ? 'Not yet available' : 'Sold out'}
    </div>
  );
}
