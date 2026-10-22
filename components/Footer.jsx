import { BsInstagram, BsTwitter } from 'react-icons/bs';
import logoFarcaster from '../public/img/logo-farcaster.svg';

export default function Footer() {
  return (
    <div className='h-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 sm:py-10 px-3 sm:px-6 md:px-8 bg-slate-900 text-xs sm:text-sm text-white'>
      <div className='flex flex-col items-center sm:items-start justify-center text-right sm:text-left'>
        <div className='flex items-center'>
          <a
            href='http://pedrovictor.com.br'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-2'
          >
            pedrovictor.com.br
          </a>
          <a
            href='https://twitter.com/pierresacoman'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-2'
          >
            <BsTwitter />
          </a>
          <a
            href='https://instagram.com/pedr_vict_r'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-2'
          >
            <BsInstagram />
          </a>
          <a
            href='https://fcast.me/pedrovictor'
            target='_blank'
            rel='noopener noreferrer'
            className='sm:mr-2 w-3 h-3'
          >
            <img src='/img/logo-farcaster.svg' alt='farcaster' />
          </a>
        </div>
        <div className='flex items-center'>
          <a
            href='http://portasvilaseca.com.br'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-2'
          >
            portasvilaseca.com.br
          </a>
          <a
            href='https://twitter.com/portasvilaseca'
            target='_blank'
            rel='noopener noreferrer'
            className='mr-2'
          >
            <BsTwitter />
          </a>
          <a
            href='https://instagram.com/portasvilaseca'
            target='_blank'
            rel='noopener noreferrer'
            className='sm:mr-2'
          >
            <BsInstagram />
          </a>
        </div>
      </div>
      <div className='h-full flex flex-col justify-center text-center sm:text-right'>
        <div className=''>
          powered by{' '}
          <a
            href='http://www.manifold.xyz'
            target='_blank'
            rel='noopener noreferrer'
          >
            Manifold
          </a>
        </div>
        <div className='mb-2 sm:mb-0'>
          developed by{' '}
          <a
            href='http://www.uint.studio'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vitor Butkus
          </a>
        </div>
        <div className='-mb-2 sm:mb-0'>2023</div>
      </div>
    </div>
  );
}
