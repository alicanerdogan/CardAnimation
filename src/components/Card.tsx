import React, { memo } from "react";
import styled from "@emotion/styled";
import { Spring } from "wobble";

import { Overlay } from "./Overlay";
import { media } from "utils/styles";

export interface ICardProps {}

const animation = new Spring({
  fromValue: 0,
  toValue: 100,
  stiffness: 250,
  damping: 30
});

const PAD = 48;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  will-change: transform;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const CardContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
`;

export const CardStyle = styled.div`
  position: relative;
  height: 240px;
  transition: transform 0.2s;

  ${media.md`
    height: 200px;
  `}

  ${media.sm`
    height: 160px;
  `}

  &:hover {
    cursor: pointer;
    /* transform: scale(1.1); */
  }
`;

function recursiveAnimate(
  animation: Spring,
  callback: (value: number, isAtRest: boolean) => void
) {
  window.requestAnimationFrame(() => {
    callback(animation.currentValue, animation.isAtRest);
    if (animation.isAnimating) {
      recursiveAnimate(animation, callback);
      return;
    }
  });
}

function getDimensions(
  overlay: HTMLElement,
  card: HTMLElement
): {
  width: number;
  height: number;
  scale: number;
  translateX: number;
  translateY: number;
} {
  const overlayRect = overlay.getBoundingClientRect();
  const rect = card.getBoundingClientRect();

  const width = overlayRect.width - PAD * 2;
  const scale = width / rect.width;
  const height = scale * rect.height;

  const translateY = (rect as any).y - PAD;
  const translateX = (rect as any).x - PAD;

  return {
    width,
    height,
    scale,
    translateX,
    translateY
  };
}

export const Card: React.FC<ICardProps> = memo(({  }: ICardProps) => {
  const cardContentRef = React.useRef<HTMLDivElement>();
  const overlayRef = React.useRef<HTMLDivElement>();
  const cardRef = React.useRef<HTMLDivElement>();

  const [expanded, setExpanded] = React.useState(false);

  const onClick = React.useCallback(() => {
    setExpanded(true);
    animation.start();

    if (!cardContentRef.current || !overlayRef.current || !cardRef.current) {
      return;
    }

    const cardContentEl = cardContentRef.current;
    const dimensions = getDimensions(overlayRef.current, cardRef.current);

    cardContentEl.style.width = `${dimensions.width}px`;
    cardContentEl.style.height = `${dimensions.height}px`;
    cardContentEl.style.transformOrigin = "top left";
    cardContentEl.style.transform = `translateY(${
      dimensions.translateY
    }px) translateX(${dimensions.translateX}px) scale(${1 / dimensions.scale})`;

    recursiveAnimate(animation, val => {
      const coeff = (100 - val) / 100;
      const scaleCoeff = Math.max(1, (val / 100) * dimensions.scale);

      const translateX = coeff * dimensions.translateX;
      const translateY = coeff * dimensions.translateY;
      const scale = scaleCoeff / dimensions.scale;

      // console.log({ translateX, translateY, scale });

      cardContentEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`;
    });
  }, [setExpanded]);

  const collapse = React.useCallback(() => {
    animation.stop();
    animation.start();

    if (!cardContentRef.current || !overlayRef.current || !cardRef.current) {
      return;
    }

    const cardContentEl = cardContentRef.current;
    const dimensions = getDimensions(overlayRef.current, cardRef.current);

    recursiveAnimate(animation, (val, isAtRest) => {
      if (isAtRest) {
        cardContentEl.style.transformOrigin = "top left";
        cardContentEl.style.transform = "";
        cardContentEl.style.width = "";
        cardContentEl.style.height = "";
        setExpanded(false);
        return;
      }

      const coeff = val / 100;
      const scaleCoeff = Math.max(1, ((100 - val) / 100) * dimensions.scale);

      const translateX = coeff * dimensions.translateX;
      const translateY = coeff * dimensions.translateY;
      const scale = scaleCoeff / dimensions.scale;

      // console.log({ translateX, translateY, scale });

      cardContentEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`;
    });
  }, [setExpanded]);

  const cardContainerStyle: React.CSSProperties = expanded
    ? { position: "fixed", zIndex: 3, padding: `${PAD}px` }
    : {};

  return (
    <CardStyle
      onClick={onClick}
      ref={el => (cardRef.current = el || undefined)}
    >
      <Overlay close={collapse} isOpen={expanded} forwardRef={overlayRef} />
      <CardContainer style={cardContainerStyle}>
        <CardContent ref={el => (cardContentRef.current = el || undefined)}>
          <img src={"http://loremflickr.com/300/400/food"} alt="food" />
        </CardContent>
      </CardContainer>
    </CardStyle>
  );
});

Card.displayName = "Card";
