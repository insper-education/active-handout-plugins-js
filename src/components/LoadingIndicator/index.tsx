import React from "react";
import { motion, Transition, Variants } from "framer-motion";
import styled from "styled-components";
import theme from "../../commons/theme";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants: Variants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

type sizeType = "xs" | "sm" | "base" | "lg" | "xl";

interface IAnimationContainerProps {
  size: sizeType;
}

const AnimationContainer = styled.div<IAnimationContainerProps>`
  ${({ size }) => theme.text[size]}
  padding-top: 1.5em;
`;

interface ILoadingDotProps {
  light: boolean;
}

const LoadingDot = styled(motion.span)<ILoadingDotProps>`
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: ${({ light }) => (light ? "white" : "#3c3c3c")};
`;

interface ILoadingIndicatorProps {
  size?: sizeType;
  className?: string;
  light?: boolean;
}

const DotContainer = styled(motion.div)`
  width: 3em;
  height: 1.5em;
  display: flex;
  justify-content: space-around;
`;

const LoadingIndicator = ({ light, size = "base" }: ILoadingIndicatorProps) => {
  return (
    <AnimationContainer size={size}>
      <DotContainer
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <LoadingDot
          light={!!light}
          variants={DotVariants}
          transition={DotTransition}
        />
        <LoadingDot
          light={!!light}
          variants={DotVariants}
          transition={DotTransition}
        />
        <LoadingDot
          light={!!light}
          variants={DotVariants}
          transition={DotTransition}
        />
      </DotContainer>
    </AnimationContainer>
  );
};

export default LoadingIndicator;
