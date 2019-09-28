import React, { memo } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { media } from "utils/styles";

export interface ICardProps {}

// const OverlayStyle = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   pointer-events: none;

//   background: #edf2f7;
//   transition: opacity 0.5s;
//   will-change: opacity;
//   z-index: 2;
//   pointer-events: none;
//   opacity: 0;

//   &:hover {
//     cursor: pointer;
//   }
// `;

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

const CardContainer = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

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

const spring = {
  type: "spring",
  damping: 30,
  stiffness: 250
};

export const Card: React.FC<ICardProps> = memo(({  }: ICardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = React.useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const cardContainerStyle: React.CSSProperties = expanded
    ? { position: "fixed", zIndex: 3 }
    : {};

  return (
    <CardStyle onClick={toggleExpand}>
      <CardContainer
        whileHover={{ scale: 1.2 }}
        layoutTransition={spring}
        style={cardContainerStyle}
        onAnimationComplete={() => {
          console.log("anim complete");
        }}
      >
        <CardContent>
          <CollapsedCardContent>
            <img src={"http://loremflickr.com/300/400/food"} alt="food" />
          </CollapsedCardContent>
          <ExtendedCardContent>
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
