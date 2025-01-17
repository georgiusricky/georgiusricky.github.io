import Image from 'next/image'

export default function ProfileCircle() {
  return (
    <div className="w-full aspect-square mx-auto mt-5">
      <div className="relative w-full pb-[100%] rounded-full bg-black dark:bg-white overflow-hidden">
            <Image
                src="/img/profile.png"
                alt="Profile photo"
                fill
                className="object-cover object-[center_20%] drop-shadow-[0_5px_15px_white] dark:drop-shadow-[0_5px_15px_black]" 
                priority
            />
      </div>
    </div>
  )
}

