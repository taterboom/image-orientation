const TRANSITION_MAP = {
  0: [0, 0],
  90: [0, -1],
  180: [-1, -1],
  270: [-1, 0],
  '-0': [0, 0],
  '-90': [-1, 0],
  '-180': [-1, -1],
  '-270': [0, -1],
};

type SupportAngle = 0 | 90 | 180 | 270 | -0 | -90 | -180 | -270;

function loadImageEl(imgEl: HTMLImageElement) {
  if (imgEl.complete) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve, reject) => {
    imgEl.onload = () => {
      resolve();
    };
    imgEl.onerror = e => {
      reject(e);
    };
  });
}

function renderImgInBox(
  imgWidth: number,
  imgHeight: number,
  boxWidth: number,
  boxHeightOrNothing?: number,
) {
  const imgRatio = imgHeight / imgWidth;
  const boxHeight = boxHeightOrNothing || boxWidth * imgRatio;
  const boxRatio = boxHeight / boxWidth;
  if (imgRatio < boxRatio) {
    const maxWidth = Math.min(boxWidth, imgWidth);
    return [maxWidth, maxWidth * imgRatio];
  } else {
    const maxHeight = Math.min(boxHeight, imgHeight);
    return [maxHeight / imgRatio, maxHeight];
  }
}

export type CreateImageOrientationOptions = {
  container: HTMLElement;
  wrapper: HTMLElement;
  image: HTMLImageElement;
  useElHeight?: boolean;
  initialAngle?: number;
};

export type ImageOrientationInstance = {
  rotate: (angle: number) => void;
  metaData: {
    width: number;
    height: number;
  };
};

export async function createImageOrientation(
  options: CreateImageOrientationOptions,
): Promise<ImageOrientationInstance> {
  const {
    container,
    wrapper,
    image,
    useElHeight = true,
    initialAngle = 0,
  } = options;

  const containerWidth = container.clientWidth;
  const containerMaxHeight = useElHeight
    ? parseInt(window.getComputedStyle(container).maxHeight, 10) ||
      container.clientHeight
    : undefined;

  await loadImageEl(image);

  const imageWidth = image.width;
  const imageHeight = image.height;

  const setStyle = (angle: number) => {
    const formattedAngle = (angle % 360) as SupportAngle;
    const horizontal = [0, 180].includes(Math.abs(formattedAngle));
    if (horizontal) {
      const [suitableWidth, suitableHeight] = renderImgInBox(
        imageWidth,
        imageHeight,
        containerWidth,
        containerMaxHeight,
      );
      wrapper.style.width = `${suitableWidth}px`;
      wrapper.style.height = `${suitableHeight}px`;
      image.style.width = `${suitableWidth}px`;
      image.style.height = `${suitableHeight}px`;
    } else {
      const [suitableWidth, suitableHeight] = renderImgInBox(
        imageHeight,
        imageWidth,
        containerWidth,
        containerMaxHeight,
      );
      wrapper.style.width = `${suitableWidth}px`;
      wrapper.style.height = `${suitableHeight}px`;
      image.style.width = `${suitableHeight}px`;
      image.style.height = `${suitableWidth}px`;
    }
    image.style.transform = `rotate(${angle}deg) translate(${
      TRANSITION_MAP[formattedAngle]?.[0] * 100
    }%, ${TRANSITION_MAP[formattedAngle]?.[1] * 100}%)`;
  };

  const init = () => {
    image.style.maxWidth = 'unset';
    image.style.webkitTransformOrigin = 'top left';
    image.style.transformOrigin = 'top left';
    setStyle(initialAngle);
  };

  init();

  return {
    rotate: setStyle,
    metaData: {
      width: imageWidth,
      height: imageHeight,
    },
  };
}
