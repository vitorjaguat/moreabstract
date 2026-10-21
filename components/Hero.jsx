import Image from 'next/image';
import Link from 'next/link';
import vista1 from '../public/img/vistas/001.jpg';

export default function Hero() {
  return (
    <div className='w-screen h-screen relative text-black bg-black'>
      <div className='uppercase text-black text-5xl md:text-6xl lg:text-7xl sticky max-w-[30px] sm:max-w-none top-0 p-4 z-10'>
        MORE ABSTRACT
      </div>

      <div className='absolute z-0 top-0 left-0 w-screen h-screen'>
        <Image
          src={vista1}
          fill
          alt='Vista da exposição'
          className='object-cover'
          unoptimized
        />
      </div>

      <Link
        href='https://www.portasvilaseca.com.br'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div
          className='absolute p-8 bottom-4 sm:bottom-full sm:top-6 flex right-2 sm:right-4 lg:right-8 w-[90px] sm:w-[140px] h-[150px] sm:h-[180px]'
          style={{ color: '#d1d1d1' }}
        >
          <Image
            src='/img/logo-pvg.svg'
            fill
            className='object-contain'
            alt='Portas Vilaseca Galeria'
            style={{ color: '#d1d1d1' }}
          />
        </div>
      </Link>
    </div>
  );
}
