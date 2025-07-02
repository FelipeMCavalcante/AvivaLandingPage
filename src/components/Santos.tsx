'use client';

export default function Hero() {
  return (
    <div>
      <div className='bg-gray-100' id='Santos'>
        <div className='flex justify-center'>
          <p className='text-[80px] font-ozikB mt-10 text-[#030303]'>
            Baluartes
          </p>
        </div>

        <div className='text-gray-800 justify-center text-center flex font-outfitregular text-lg p-5 font-bold'>
          <p>Todos os nossos baluartes.</p>
        </div>
        <div className=''>
          <img src='/imgbaluarte/baluarte.png' alt='' className='w-full' />
        </div>
      </div>
    </div>
  );
}
