import Section5Card from './Section5Card';
import cloud from '../data/cloud.json';
import vista4 from '../public/img/vistas/004.jpg';
import Vista from './Vista';

export default function Section5({ listings = {} }) {
  return (
    <div className='w-screen bg-black' id='cloud'>
      <div className='h-16 w-full bg-black/80 sticky top-0 left-0 px-10 sm:px-20  z-10 flex items-center tracking-[6px] uppercase text-sm sm:text-md'>
        CLOUD, CONTINENT, ISLAND SERIES (2010)
      </div>
      <div className='w-full pt-20 pb-32 px-4 sm:px-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 sm:gap-6'>
        {cloud.map((item) => (
          <div className='rounded-sm bg-slate-900 h-fit' key={item.id}>
            <Section5Card item={item} listing={listings[item.id]} />
          </div>
        ))}
      </div>
      <Vista img={vista4} />
    </div>
  );
}
