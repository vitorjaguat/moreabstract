import Section3Card from './Section3Card';
import series from '../data/series.json';
import Detail from '../components/Detail';
import detail1 from '../public/img/detail/001.jpg';
import detail2 from '../public/img/detail/002.jpg';
import detail3 from '../public/img/detail/003.jpg';
import detail4 from '../public/img/detail/004.jpg';
import { useRouter } from 'next/router';

const listingIds = [
  5155, 5156, 5157, 5158, 5159, 5160, 5161, 5163, 5164, 5165, 5166, 5167, 5168,
  5169, 5170, 5171, 5172, 5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180, 5181,
  5182, 5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191,
];

const listingIds1 = [
  5155, 5156, 5157, 5158, 5159, 5160, 5161, 5163, 5164, 5165, 5166, 5167,
];
const listingIds2 = [
  5168, 5169, 5170, 5171, 5172, 5173, 5174, 5175, 5176, 5177, 5178, 5179,
];
const listingIds3 = [
  5180, 5181, 5182, 5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191,
];
const listingIds4 = [5183, 5184, 5185, 5186, 5187, 5188, 5189, 5190, 5191];

const seriesById = Object.fromEntries(series.map((item) => [item.id, item]));

export default function Section3({ listings = {} }) {
  // const openseaLinks =
  //   typeof window !== 'undefined'
  //     ? document.querySelectorAll('.m-interactive-button[data-v-03da633b] span')
  //     : [];

  //   const router = useRouter()

  //   if (typeof window !== undefined) {
  //     const openseaLinks = document.querySelectorAll(
  //       '.m-interactive-button[data-v-03da633b] span'
  //     );

  //     const openseaLinksEnded = Array.from(openseaLinks).map((link) => {
  //       if ((link.innerHTML = 'View on OpenSea')) {
  //         link.addEventListener('click', () => {
  // router.push()
  //         })
  //         return link;
  //       }
  //     });
  //     console.log(openseaLinksEnded);
  //   }

  return (
    <div className='w-screen mt-40 bg-black'>
      <div
        className='h-16 w-full bg-black/80 sticky top-0 left-0 px-10 sm:px-20  z-10 flex items-center tracking-[6px] uppercase text-sm sm:text-md'
        id='view'
      >
        VIEW TO NOTHINGNESS SERIES (2008-2012)
      </div>
      <div className='w-full pt-20 pb-20 px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6'>
        {listingIds1.map((listingId) => (
          <div className='rounded-sm bg-slate-900 h-fit' key={listingId}>
            <Section3Card
              item={seriesById[listingId]}
              listing={listings[listingId]}
            />
          </div>
        ))}
      </div>
      <Detail img={detail1} />

      <div className='w-full pt-20 pb-20 px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6'>
        {listingIds2.map((listingId) => (
          <div className='rounded-sm bg-slate-900 h-fit' key={listingId}>
            <Section3Card
              item={seriesById[listingId]}
              listing={listings[listingId]}
            />
          </div>
        ))}
      </div>
      <Detail img={detail2} />

      <div className='w-full pt-20 pb-20 px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6'>
        {listingIds3.map((listingId) => (
          <div className='rounded-sm bg-slate-900 h-fit' key={listingId}>
            <Section3Card
              item={seriesById[listingId]}
              listing={listings[listingId]}
            />
          </div>
        ))}
      </div>
      <Detail img={detail3} />

      {/* <div className='w-full pt-20 pb-20 px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6'>
        {listingIds4.map((listingId) => (
          <div className='rounded-sm bg-slate-900 h-fit' key={listingId}>
            <Section3CardItem id={listingId} />
          </div>
        ))}
      </div>
      <Detail img={detail4} /> */}
    </div>
  );
}
