import Image from 'next/image';

const Hero = () => {
  return (
    <div>
      <Image
        src="/hero.png"
        alt="Hero"
        width={720}
        height={720}
        className="object-contain m-auto my-20"
      />
    </div>
  );
};

export default Hero;
