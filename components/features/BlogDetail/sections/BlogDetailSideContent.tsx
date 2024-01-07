import { Chip } from "@mui/material";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function BlogDetailSideContent({ albums }: { albums: PageObjectResponse[] }) {
    console.log(albums);

    return (
        <div>
            <div>
                {albums.map((album: any) => {
                    return <div>{album?.properties?.city?.multi_select?.[0]?.name}</div>
                })}
            </div>
        </div>
    )
}