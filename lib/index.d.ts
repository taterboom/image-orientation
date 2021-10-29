export declare type CreateImageOrientationOptions = {
    container: HTMLElement;
    wrapper: HTMLElement;
    image: HTMLImageElement;
    useElHeight?: boolean;
    initialAngle?: number;
};
export declare type ImageOrientationInstance = {
    rotate: (angle: number) => void;
    metaData: {
        width: number;
        height: number;
    };
};
export declare function createImageOrientation(options: CreateImageOrientationOptions): Promise<ImageOrientationInstance>;
