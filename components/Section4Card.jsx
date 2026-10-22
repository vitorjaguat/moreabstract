import Link from 'next/link';
import { CardButton, PriceLine, StatusBadge } from './CardParts';
import useWarmOnView from './useWarmOnView';

// Static replica of Manifold's `m-card-catalog` widget for an audio token:
// no image, a native player instead. Title/audio come from data/click.json,
// price/status from getListings().
export default function Section4Card({ item, listing }) {
  const warmRef = useWarmOnView(item.id);

  return (
    <div ref={warmRef} className='group relative grid border border-white/60 bg-[#333] text-white/[.87] transition-colors duration-200 hover:border-white hover:bg-[#3d3d3d]'>
      <div className='relative flex min-h-[100px] items-center justify-center pb-3 pt-14'>
        {listing && <StatusBadge listing={listing} />}
        {/* Outside the link on purpose: using the controls must never navigate. */}
        {/* Manifold's CDN (keyed by the file's sha256) answers instantly; the Arweave
            gateway is very slow for this 172 MB file, so it is only the fallback. */}
        <audio controls preload='metadata' className='h-[2.7rem] w-[95%]'>
          <source src={item.audio} type='audio/mpeg' />
          <source src={item.audioFallback} type='audio/mpeg' />
        </audio>
      </div>

      <Link href={`/artwork/${item.id}`} className='grid gap-[10px] p-2'>
        <div className='grid min-h-[60px] grid-rows-[max-content_auto] px-[5px] py-[6px]'>
          <span className='mb-[5px] leading-[1.2]'>{item.title}</span>
          {listing && <PriceLine listing={listing} />}
        </div>

        {listing && <CardButton listing={listing} />}
      </Link>
    </div>
  );
}
