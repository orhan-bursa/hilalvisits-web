"use client"
import { SOCIAL_MENU_ITEMS } from '@/constants'
import { MailOutline } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import './styles.css'
export default function Header() {
    return (
        <div className="w-full bg-amber-400 text-white ">
            <div className='flex justify-between max-w-[1200px] mx-auto'>
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