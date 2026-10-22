// Loading placeholder for the Manifold listing widget on /artwork/[listingId].
// Shapes mirror the loaded widget (1100 px column; two columns from 1000 px up,
// same breakpoint as marketplace.css) so the swap does not move anything.
const Block = ({ className = '', style }) => (
  <div className={`rounded-[2px] bg-white/[.09] ${className}`} style={style} />
);

export default function ListingSkeleton({ className = '' }) {
  return (
    <div className={`bg-[#121212] ${className}`} role='status' aria-busy='true'>
      <span className='sr-only'>Loading artwork…</span>

      <div className='animate-pulse motion-reduce:animate-none' aria-hidden='true'>
        {/* Media: square on small screens, 80vh tall on desktop */}
        <div className='flex justify-center min-[1000px]:h-[80vh]'>
          <Block className='aspect-square w-full min-[1000px]:h-full min-[1000px]:w-auto' />
        </div>

        <div className='grid gap-8 px-5 py-8 min-[1000px]:grid-cols-[1fr_400px] min-[1000px]:p-8'>
          {/* Title, attributes, description, links */}
          <div>
            <Block className='h-[38px] w-3/5' />

            <div className='mt-6 w-full max-w-[331px]'>
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className='flex h-[45px] items-center justify-between border-b border-white/10'>
                  <Block className='h-3 w-1/3' />
                  <Block className='h-3 w-1/4' />
                </div>
              ))}
            </div>

            <div className='mt-8 space-y-[10px]'>
              <Block className='h-3 w-24' />
              {[100, 92, 96, 78, 60].map((w) => (
                <Block key={w} className='h-[14px]' style={{ width: `${w}%` }} />
              ))}
            </div>

            <div className='mt-8 w-full max-w-[400px] space-y-2'>
              {Array.from({ length: 6 }, (_, i) => (
                <Block key={i} className='h-10 w-full' />
              ))}
            </div>
          </div>

          {/* Price, countdown, buy */}
          <div>
            <div className='h-[82px] border border-white/20 p-4'>
              <Block className='h-2 w-10' />
              <Block className='mt-3 h-6 w-28' />
            </div>
            <Block className='mt-5 h-1 w-full' />
            <Block className='mt-6 h-4 w-20' />
            <div className='mt-6 flex h-[70px] items-center justify-end gap-6'>
              {Array.from({ length: 4 }, (_, i) => (
                <Block key={i} className='h-8 w-10' />
              ))}
            </div>
            <Block className='mt-2 h-[60px] w-full' />
            <div className='mt-5 space-y-2'>
              <Block className='h-2 w-full' />
              <Block className='h-2 w-4/5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
