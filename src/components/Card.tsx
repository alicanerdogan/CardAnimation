import React, { memo } from "react";
import styled from "@emotion/styled";
import { Overlay } from "./Overlay";

export interface ICardProps {}

export const CardStyle = styled.div`
  height: 240px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    /* transform: scale(1.1); */
  }

  img {
    display: block;
    height: 240px;
    width: 100%;
  }
`;

export const Card: React.FC<ICardProps> = memo(({  }: ICardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const onClick = React.useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

  const collapse = React.useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  return (
    <CardStyle onClick={onClick}>
      <Overlay close={collapse} isOpen={expanded} />
      <img src={"http://lorempixel.com/300/400/food"} alt="food" />
    </CardStyle>
  );
});

Card.displayName = "Card";
