import Image from 'next/image';
import Link from 'next/link';

// Static replica of Manifold's `m-card-catalog` widget: same layout and colors,
// but title/image come from data/series.json and price/status from getListings().
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

const BUTTON_BASE =
  'flex h-6 items-center justify-center text-[x-small] uppercase transition-colors duration-200';

function CardButton({ listing }) {
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

export default function Section3Card({ item, listing }) {
  return (
    <Link href={`/artwork/${item.id}`} className='block'>
      <div className='group relative grid border border-white/60 bg-[#333] text-white/[.87] transition-colors duration-200 hover:border-white hover:bg-[#3d3d3d]'>
        {/* No background here: the WebP's alpha shows the card's #333 through. */}
        <div className='relative aspect-square w-full overflow-hidden'>
          <Image
            src={item.image}
            alt={item.title}
            width={item.width}
            height={item.height}
            sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
            className='h-full w-full transition-transform duration-500 group-hover:scale-[1.04]'
          />
          {listing && (
            <i className='absolute left-0 top-0 z-[1] flex items-center bg-black/50 px-[10px] py-[3px] text-[9px] leading-[15px] uppercase not-italic text-white'>
              <span
                className={`mr-[6px] block h-[5px] w-[5px] rounded-full ${
                  DOT[listing.status] ?? 'bg-white'
                }`}
              />
              {statusLabel(listing)}
            </i>
          )}
        </div>

        <div className='grid gap-[10px] p-2'>
          <div className='grid min-h-[60px] grid-rows-[max-content_auto] px-[5px] py-[6px]'>
            <span className='mb-[5px] leading-[1.2]'>{item.title}</span>
            {listing && (
              <span className='mt-[5px] uppercase'>
                <span className='mr-2 text-[x-small] font-bold'>Price</span>
                <span>{listing.price}</span>
              </span>
            )}
          </div>

          {listing && <CardButton listing={listing} />}
        </div>
      </div>
    </Link>
  );
}
