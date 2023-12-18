"use client"
import { SOCIAL_MENU_ITEMS } from '@/constants'
import { babylonica } from '@/utils/fonts'
import { Mail } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import cn from 'classnames'
import Link from 'next/link'
import { CustomButton } from '@/components/shared'

export default function Header() {
    return (
        <div className="w-full bg-white border-b-2 sm:border-b-0 text-gray-400">

            <div className='flex justify-between items-end px-1 md:px-4 lg:px-8 gap-2 md:gap-4'>
                <div className="w-[15%] md:w-[25%] hidden md:flex justify-start gap-1 md:gap-2">
                    {SOCIAL_MENU_ITEMS.map((item, i) => {
                        const Icon = item.icon
                        return <IconButton
                            key={i + item.title}
                            LinkComponent={Link}
                            href={item.href ?? "/"}
                            color="inherit"
                            size="small"
                            sx={{
                                height: "100%",
                                aspectRatio: 1
                            }}
                        >
                            <Icon />
                        </IconButton>
                    })}
                </div>
                <div className="flex justify-evenly items-center gap-4 max-w-[1200px] mx-auto">
                    <div
                        key={"/"}
                        className={cn(
                            "text-center text-[80px] sm:text-8xl whitespace-nowrap text-amber-400 py-2",
                        )}
                    >
                        <Link href={"/"}>
                            <h1
                                className={babylonica.className}
                            >Hilal Visits</h1>
                        </Link>
                    </div>
                </div>
                <div className='w-[15%] md:w-[25%] hidden md:flex justify-end'>
                    <CustomButton
                        variant="outlined"
                        href="mailto:hilalvisits@gmail.com"
                        startIcon={<Mail />}
                        color='#9ca3af'
                    >
                        Contact

                    </CustomButton>

                </div>
            </div>
        </div>

    )
}