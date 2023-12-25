type IPropTypes = {
    children: React.ReactNode
}
export default function BlogDetailLayout(props: IPropTypes) {

    return (
        <div>
            <p>This will be the BlogDetailLayout</p>
            <div>
                {props.children}
            </div>
        </div>
    )
}