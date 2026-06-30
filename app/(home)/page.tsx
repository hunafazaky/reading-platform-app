import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/dragon-book.avif"
        width={1000}
        height={760}
        className="hidden md:block w-200"
        alt="Dragon love reading"
        loading="eager"
      />
      <Image
        src="/dragon-book.avif"
        width={560}
        height={620}
        className="block md:hidden w-200"
        alt="Dragon love reading"
        loading="eager"
      />
    </div>
  );
}
