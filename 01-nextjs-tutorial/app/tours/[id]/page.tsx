import mapsImg from '@/images/maps.jpg';
import Image from 'next/image';
const url = 'https://www.course-api.com/images/tours/tour-1.jpeg';

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className='text-4xl'>ID : {params.id}</h1>
      <section className='flex gap-x-4 mt-4'>
        <div>
          <Image
            src={mapsImg}
            alt='maps'
            width={192}
            height={192}
            className='w-48 h-48 object-cover rounded'
          />
          <h2>local image</h2>
        </div>
        <div>
          <Image
            src={url}
            alt='tour'
            width={192}
            height={192}
            priority
            className='w-48 h-48 object-cover rounded'
          />
          <h2>remote image</h2>
        </div>
      </section>
    </div>
  );
};
export default page;
