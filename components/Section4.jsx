import Section4Card from './Section4Card';
import click from '../data/click.json';
import vista3 from '../public/img/vistas/003.jpg';
import Vista from './Vista';

export default function Section4({ listings = {} }) {
  return (
    <div className='bg-black w-screen' id='click'>
      <div className='h-16 w-full bg-black/80 sticky top-0 left-0 px-10 sm:px-20  z-10 flex items-center tracking-[6px] uppercase text-sm sm:text-md'>
        CLIQUE NO SAIBA MAIS (2023), FROM DETREMURA SERIES (2019-)
      </div>
      <div className='w-full py-[15vh] md:py-[25vh] flex justify-center'>
        <div className='w-[90%] md:w-[800px] rounded-sm bg-slate-900 h-fit'>
          <Section4Card item={click} listing={listings[click.id]} />
        </div>
      </div>
      <Vista img={vista3} />
    </div>
  );
}
