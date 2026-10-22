import Image from 'next/image';
import Link from 'next/link';
import { CardButton, PriceLine, StatusBadge } from './CardParts';

// Static replica of Manifold's `m-card-catalog` widget: same layout and colors,
// but title/image come from data/series.json and price/status from getListings().
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
          {listing && <StatusBadge listing={listing} />}
        </div>

        <div className='grid gap-[10px] p-2'>
          <div className='grid min-h-[60px] grid-rows-[max-content_auto] px-[5px] py-[6px]'>
            <span className='mb-[5px] leading-[1.2]'>{item.title}</span>
            {listing && <PriceLine listing={listing} />}
          </div>

          {listing && <CardButton listing={listing} />}
        </div>
      </div>
    </Link>
  );
}
