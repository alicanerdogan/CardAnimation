import React, { memo } from "react";
import styled from "@emotion/styled";
import { Spring } from "wobble";

import { media } from "utils/styles";

export interface ICardProps {}

const animation = new Spring({
  fromValue: 0,
  toValue: 100,
  stiffness: 350,
  damping: 30
});

const PAD = 0;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;

  background: #edf2f7;
  transition: opacity 0.5s;
  will-change: opacity;
  z-index: 2;
  pointer-events: none;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
`;

const CollapsedCardContent = styled.div`
  height: 100%;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CardDetails = styled.div`
  background: #fff;
  padding: 16px;
`;

const ExtendedCardContent = styled.div`
  opacity: 0;
  will-change: opacity;
`;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
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

  &:hover {
    cursor: pointer;
  }
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

  const w1 = rect.width;
  const h1 = rect.height;
  const x1 = (rect as any).x;
  const y1 = (rect as any).y;

  const w2 = overlayRect.width - PAD * 2;
  const scale = w2 / w1;
  const h2 = overlayRect.height - PAD * 2;
  const x2 = (overlayRect as any).x + PAD;
  const y2 = (overlayRect as any).y + PAD;
  const x2_ = x2 + (w2 / 2) * (1 - 1 / scale);
  const y2_ = y2 + (h2 / 2) * (1 - 1 / scale);

  const translateY = y1 - y2_;
  const translateX = x1 - x2_;

  return {
    width: w2,
    height: scale * h1,
    scale,
    translateX,
    translateY
  };
}

export const Card: React.FC<ICardProps> = memo(({  }: ICardProps) => {
  const cardContainerRef = React.useRef<HTMLDivElement>();
  const cardContentRef = React.useRef<HTMLDivElement>();
  const collapsedCardContentRef = React.useRef<HTMLDivElement>();
  const extendedCardContentRef = React.useRef<HTMLDivElement>();
  const overlayRef = React.useRef<HTMLDivElement>();
  const cardRef = React.useRef<HTMLDivElement>();

  const onClick = React.useCallback(() => {
    if (animation.isAnimating) {
      return;
    }
    animation.start();

    if (
      !cardContentRef.current ||
      !overlayRef.current ||
      !cardRef.current ||
      !extendedCardContentRef.current ||
      !collapsedCardContentRef.current ||
      !cardContainerRef.current
    ) {
      return;
    }

    const cardContainerEl = cardContainerRef.current;
    const cardContentEl = cardContentRef.current;
    const overlayEl = overlayRef.current;
    const collapsedCardContentEl = collapsedCardContentRef.current;
    const extendedCardContentEl = extendedCardContentRef.current;
    const dimensions = getDimensions(overlayRef.current, cardRef.current);

    cardContainerEl.style.padding = `${PAD}px`;
    cardContainerEl.style.zIndex = "3";
    cardContainerEl.style.position = "fixed";
    cardContainerEl.style.pointerEvents = "none";
    overlayEl.style.pointerEvents = "all";
    overlayEl.style.opacity = "0.8";
    collapsedCardContentEl.style.height = `${dimensions.height}px`;
    cardContentEl.style.transform = `translateY(${
      dimensions.translateY
    }px) translateX(${dimensions.translateX}px) scale(${1 / dimensions.scale})`;
    extendedCardContentEl.style.opacity = "0";

    recursiveAnimate(animation, val => {
      const coeff = (100 - val) / 100;
      const scaleCoeff = Math.max(1, (val / 100) * dimensions.scale);

      const translateX = coeff * dimensions.translateX;
      const translateY = coeff * dimensions.translateY;
      const scale = scaleCoeff / dimensions.scale;

      cardContentEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`;
      extendedCardContentEl.style.opacity = (val / 100).toString();
    });
  }, []);

  const collapse = React.useCallback(() => {
    if (animation.isAnimating) {
      return;
    }
    animation.start();

    if (
      !cardContentRef.current ||
      !overlayRef.current ||
      !cardRef.current ||
      !extendedCardContentRef.current ||
      !collapsedCardContentRef.current ||
      !cardContainerRef.current
    ) {
      return;
    }

    const cardContainerEl = cardContainerRef.current;
    const cardContentEl = cardContentRef.current;
    const overlayEl = overlayRef.current;
    const extendedCardContentEl = extendedCardContentRef.current;
    const collapsedCardContentEl = collapsedCardContentRef.current;
    const dimensions = getDimensions(overlayRef.current, cardRef.current);

    overlayEl.style.pointerEvents = "";
    overlayEl.style.opacity = "";

    recursiveAnimate(animation, (val, isAtRest) => {
      if (isAtRest) {
        cardContentEl.style.transform = "";
        cardContentEl.style.width = "";
        cardContentEl.style.height = "";
        collapsedCardContentEl.style.height = "";
        extendedCardContentEl.style.opacity = "";
        cardContainerEl.style.padding = "";
        cardContainerEl.style.zIndex = "";
        cardContainerEl.style.position = "";
        cardContainerEl.style.pointerEvents = "";
        return;
      }

      const coeff = val / 100;
      const scaleCoeff = Math.max(1, ((100 - val) / 100) * dimensions.scale);

      const translateX = coeff * dimensions.translateX;
      const translateY = coeff * dimensions.translateY;
      const scale = scaleCoeff / dimensions.scale;

      cardContentEl.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`;
      extendedCardContentEl.style.opacity = ((100 - val) / 100).toString();
    });
  }, []);

  const onOverlayClick = React.useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      collapse();
    },
    [collapse]
  );

  return (
    <CardStyle
      onClick={onClick}
      ref={el => (cardRef.current = el || undefined)}
    >
      <OverlayStyle
        onClick={onOverlayClick}
        ref={el => (overlayRef.current = el || undefined)}
      />
      <CardContainer ref={el => (cardContainerRef.current = el || undefined)}>
        <CardContent ref={el => (cardContentRef.current = el || undefined)}>
          <CollapsedCardContent
            ref={el => (collapsedCardContentRef.current = el || undefined)}
          >
            <img src={"http://loremflickr.com/300/400/food"} alt="food" />
          </CollapsedCardContent>
          <ExtendedCardContent
            ref={el => (extendedCardContentRef.current = el || undefined)}
          >
            <CardDetails>
              <p>{"Test"}</p>
            </CardDetails>
          </ExtendedCardContent>
        </CardContent>
      </CardContainer>
    </CardStyle>
  );
});

Card.displayName = "Card";
