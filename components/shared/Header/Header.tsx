"use client"
import { SOCIAL_MENU_ITEMS } from '@/constants'
import { babylonica } from '@/utils/fonts'
import { MailOutline } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'
import { CustomButton } from '@/components/shared'
import './styles.css'
export default function Header() {
    return (
        <div className="w-full bg-amber-400 text-white">
            <div className='flex justify-between'>
                <div className="w-[15%] md:w-[25%] hidden md:flex justify-start gap-1 md:gap-2">
                    {SOCIAL_MENU_ITEMS.map((item, i) => {
                        const Icon = item.icon
                        return <IconButton
                            key={i + item.title}
                            LinkComponent={Link}
                            href={item.href ?? "/"}
                            color="inherit"
                            size="small"
                        >
                            <Icon />
                        </IconButton>
                    })}
                </div>
                <div className='w-[15%] md:w-[25%] hidden md:flex justify-end'>
                    <Button
                        href="mailto:hilalvisits@gmail.com"
                        startIcon={<MailOutline />}
                        sx={{ color: "white" }}
                    >
                        Contact
                    </Button>
                </div>
            </div>
        </div>

    )
}

/*
<div
                        key={"/"}
                        className={cn(
                            "brand text-center text-[80px] sm:text-8xl whitespace-nowrap text-amber-400 py-2",
                        )}
                    >
                        <Link href={"/"}>
                            <h1
                                className={babylonica.className}
                            >Hilal Visits</h1>
                        </Link>
                    </div>
*/