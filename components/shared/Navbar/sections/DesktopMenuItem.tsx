import { useState } from 'react';
import cn from 'classnames';

export default function DesktopMenuItem() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(!menuOpen);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={cn(
            'bg-slate-200 flex gap-4 p-2 cursor-pointer'
        )}>
            {["Item 1", "Item 2", "Item 3", "Item 4"].map((label, ind) => {
                return <div>{label}</div>
            })}
        </div>
    );
}