
interface IFrameProps  {
    height: number;
    width: number;
    url: string;

}

export default function IframeComponent({height, width, url}: IFrameProps) {
    return (
        <>
            <iframe
                src={url}
                height={height}
                width={width}
            ></iframe>
        </>
    )
}