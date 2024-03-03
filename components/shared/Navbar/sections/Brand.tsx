import { whisper } from "@/utils/fonts";
import cn from "classnames";
import Link from "next/link";

export default function Brand() {
    return (
        <div className={cn(
            "brand text-center text-[80px]",
            "text-amber-400 whitespace-nowrap"
        )}
        >
            <Link href={"/"}>
                <h1 className={cn(whisper.className, " leading-[50px]")}
                >Hilal Visits
                </h1>
            </Link>
        </div>
    )
}