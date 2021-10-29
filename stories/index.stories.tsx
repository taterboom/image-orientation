import { useEffect, useRef } from 'react';
import { createImageOrientation } from '@';

const Component = () => {
  const container = useRef();
  const wrapper = useRef();
  const image = useRef();
  const instanceRef = useRef();
  const angleRef = useRef(0);

  useEffect(() => {
    createImageOrientation({
      container: container.current,
      wrapper: wrapper.current,
      image: image.current,
    }).then(instance => {
      instanceRef.current = instance;
    });
  }, []);
  return (
    <>
      <button
        onClick={() => instanceRef.current.rotate((angleRef.current += 90))}>
        rotate
      </button>
      <div
        ref={container}
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxHeight: 200,
          border: '1px solid',
        }}>
        <div ref={wrapper}>
          <img
            ref={image}
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export const Rotate = () => <Component />;

export default {
  title: 'Rotate',
};
