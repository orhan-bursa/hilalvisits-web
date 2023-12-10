import Link from "next/link";
import { CSSProperties } from "react";

type ButtonProps = {
    title: string
    style?: CSSProperties | undefined
    onClick?: any
    href?: string
}
export default function CustomButton({ title, style, href, onClick }: ButtonProps) {
    return <button
        className=" px-6 py-[5px] font-[500]
                    border-2 border-amber-400 
                    bg-transparent text-amber-400 
                    hover:rounded-md hover:bg-amber-400 hover:text-white 
                    transition-all duration-700"
        style={{
            ...style
        }}
        onClick={onClick}
    >
        <Link href={href ?? "/"}>{title}</Link>
    </button>;
}
