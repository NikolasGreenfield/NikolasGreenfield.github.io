import "./Footer.scss";

export function Footer({
    Style = undefined,
}: {
    Style?: React.CSSProperties | undefined;
}) {
    return (
        <div id="Footer" style={Style}>
            <h1>Footer</h1>
        </div>
    );
}
