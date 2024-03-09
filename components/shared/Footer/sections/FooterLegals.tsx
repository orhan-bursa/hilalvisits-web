import Link from "next/link";

export default function FooterLegals() {
    return (
        <div className="flex justify-end text-xs gap-8">
            <div>
                <p>&copy; 2024 Hilal Visits, Tüm hakları saklıdır.</p>
            </div>
            <div className="flex gap-1">
                <Link href={"/-/kullanim-kosullari"}>
                    <p className="hover:underline duration-300">Kullanım Koşulları</p>
                </Link>
                <p>•</p>
                <Link href={"/-/gizlilik-politikasi"}>
                    <p className="hover:underline duration-300">Gizlilik</p>
                </Link>
                <p>•</p>
                <Link href={"/-/cerez-politikasi"}>
                    <p className="hover:underline duration-300">Çerezler</p>
                </Link>
            </div>
        </div>
    )
}