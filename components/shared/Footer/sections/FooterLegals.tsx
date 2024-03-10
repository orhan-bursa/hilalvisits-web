import Link from "next/link";

export default function FooterLegals() {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 text-xs">
            <div>
                <p>&copy; {(new Date()).getFullYear()} Hilal Visits, Tüm hakları saklıdır.</p>
            </div>
            <div className="flex gap-1">
                <Link href={"/-/kullanim-kosullari"}>
                    <p className="hover:underline">Kullanım Koşulları</p>
                </Link>
                <p>•</p>
                <Link href={"/-/cerez-politikasi"}>
                    <p className="hover:underline">Çerezler</p>
                </Link>
                <p>•</p>
                <Link href={"/-/gizlilik-politikasi"}>
                    <p className="hover:underline">Gizlilik</p>
                </Link>
            </div>
        </div>
    )
}