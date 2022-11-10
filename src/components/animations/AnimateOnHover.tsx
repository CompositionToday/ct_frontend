import React, { ReactNode } from "react";

import { animated, useSpring } from "react-spring";

type PropsWithChildren = {
  rotation: number;
  timing: number;
  children: ReactNode;
};

export const Teeter: React.FC<PropsWithChildren> = ({
  rotation = 0,
  timing = 150,
  children,
}) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const props = useSpring({
    display: "inline-block",
    backfaceVisibility: "hidden",
    transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    config: {
      tension: 300,
      friction: 10,
    },
  } as const);
  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);
  const trigger = () => {
    setIsBooped(true);
  };

  return (
    <animated.span onMouseEnter={trigger} style={props}>
      {children}
    </animated.span>
  );
};
