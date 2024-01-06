import { Chip } from "@mui/material";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function BlogDetailSideContent({ albums }: { albums: PageObjectResponse[] }) {
    console.log(albums);

    return (
        <div>

            <div className="flex flex-wrap gap-2">
                <Chip label="TEST" /><Chip label="TEST" /><Chip label="TEST" /><Chip label="TEST" />
            </div>
            <div>
                <h4>See also</h4>
                {albums.map((album: any) => {
                    return <div>{album?.properties?.city?.multi_select?.[0]?.name}</div>
                })}
            </div>
        </div>
    )
}