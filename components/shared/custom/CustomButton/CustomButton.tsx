import { Button } from "@mui/material";
import Link from "next/link";
import type { CSSProperties, ElementType, ReactElement, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode
    style?: CSSProperties | undefined
    onClick?: any
    href?: string
    startIcon?: ReactElement
    endIcon?: ReactElement
    color?: string
    colorOnHover?: string
    variant?: "text" | "outlined" | "contained"
    LinkComponent?: ElementType<any> | undefined
}
export default function CustomButton({ children, variant = "outlined", style, href, color = "#fbbf24", colorOnHover = "#fff", onClick, startIcon, endIcon, LinkComponent }: ButtonProps) {
    return <Button
        variant={variant}
        LinkComponent={LinkComponent ?? undefined}
        href={href}
        color="inherit"
        onClick={onClick ?? undefined}
        startIcon={startIcon ?? undefined}
        endIcon={endIcon ?? undefined}
        sx={{
            color: color,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 2,
            borderColor: color,
            borderRadius: 0,
            transition: 'all 700ms',
            ':hover': {
                borderColor: color,
                borderWidth: 2,
                backgroundColor: color,
                color: colorOnHover,
                borderRadius: '6px'
            },
            ...style,
        }}
    >
        {children}
    </Button>
}
