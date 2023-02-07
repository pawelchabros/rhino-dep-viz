import { useLayoutEffect, useRef, useState, RefObject } from "react";

interface useSizeParams {
  observe: (number | string | boolean)[];
}
type UseSizeReturn<T> = [RefObject<T>, { width: number; height: number }];

const useSize = <T extends HTMLElement>({
  observe,
}: useSizeParams): UseSizeReturn<T> => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setSize({ width, height });
  }, [...observe]);
  return [ref, size];
};

export default useSize;
