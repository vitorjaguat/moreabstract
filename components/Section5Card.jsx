import Image from 'next/image';
import Link from 'next/link';
import { CardButton, PriceLine, StatusBadge } from './CardParts';
import LazyVideo from './LazyVideo';

// Static replica of Manifold's `m-card-catalog` widget for a video token: the
// poster shows instantly, the muted loop fades in over it once it is playing.
export default function Section5Card({ item, listing }) {
  return (
    <Link href={`/artwork/${item.id}`} className='block'>
      <div className='group relative grid border border-white/60 bg-[#333] text-white/[.87] transition-colors duration-200 hover:border-white hover:bg-[#3d3d3d]'>
        <div className='relative aspect-video w-full overflow-hidden'>
          <Image
            src={item.image}
            alt={item.title}
            width={item.width}
            height={item.height}
            sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
            className='h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]'
          />
          <LazyVideo
            src={item.video}
            fallback={item.videoFallback}
            className='absolute inset-0 h-full w-full object-contain group-hover:scale-[1.04]'
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
