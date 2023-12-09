import Link from "next/link";
import { CSSProperties } from "react";

type ButtonProps = {
    title: string
    style?: CSSProperties | undefined
    onClick?: any
    href?: string
}
export default function CustomButton({ title, style, href }: ButtonProps) {
    return <button
        className=" px-6 py-[5px] font-[500]
                    border-2 border-amber-400 
                    bg-white text-amber-400 
                    hover:rounded-md hover:bg-amber-400 hover:text-white 
                    transition-all duration-700"
        style={{
            ...style
        }}
    >
        <Link href={href ?? "/"}>{title}</Link>
    </button>;
}
