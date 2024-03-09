import Link from "next/link";

export default function FooterLegals() {
    return (
        <div className="flex justify-end text-xs gap-8">
            <div>
                <p>&copy; 2023 HilalVisits, All rights reserved.</p>
            </div>
            <div className="flex gap-1">
                <Link href={"/"}>
                    <p className="hover:underline">Terms</p>
                </Link>
                <p>•</p>
                <Link href={"/"}>
                    <p className="hover:underline">Privacy Policy</p>
                </Link>
            </div>
        </div>
    )
}