import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useSkipFirstRenderEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}