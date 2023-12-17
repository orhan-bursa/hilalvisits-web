import { babylonica } from '@/utils/fonts'
import cn from 'classnames'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="w-full py-2 bg-white">
            <div className="flex justify-evenly items-center gap-4 max-w-[1200px] mx-auto font-extralight">
                <div
                    key={"/"}
                    className={cn(
                        "text-center text-7xl whitespace-nowrap text-amber-400",
                    )}
                >
                    <Link href={"/"}>
                        <h1
                            className={babylonica.className}
                        >Hilal Visits</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}