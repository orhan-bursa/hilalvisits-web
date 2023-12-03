import { CSSProperties } from "react";

type ButtonProps = {
    title: string
    style?: CSSProperties | undefined
}
export default function CustomButton({ title, style }: ButtonProps) {
    return <button
        className="px-6 py-[5px] font-[500]
border-2 border-amber-400 
bg-amber-400 text-white rounded-md 
hover:rounded-none hover:bg-white hover:text-amber-400 
transition-all duration-700"
        style={{
            ...style
        }}
    >
        {title}
    </button>;
}
