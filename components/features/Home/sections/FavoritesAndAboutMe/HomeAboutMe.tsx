import Image from "next/image";

export default function HomeAboutMe() {
    return (
        <div className="w-full md:w-1/2 space-y-4">
            <div className="w-full aspect-video">
                <Image
                    src={"/images/mostar2.jpg"}
                    alt="hilal kulüp mostar resim"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover duration-1000"
                />
            </div>
            <div>
                <h2 className="w-full cursor-default mb-6 text-4xl font-semibold text-start">
                    Ben Kimim?
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nemo voluptatem rerum quibusdam. Itaque fugiat beatae nihil, vitae quam architecto culpa cum blanditiis facere.
                </p>
            </div>
        </div>
    )
}
