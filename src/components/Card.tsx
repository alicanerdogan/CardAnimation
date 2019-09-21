import React, { memo } from "react";
import styled from "@emotion/styled";

export interface ICardProps {}

export const CardStyle = styled.div`
  height: 240px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Card: React.FC<ICardProps> = memo(({  }: ICardProps) => {
  return <CardStyle>{}</CardStyle>;
});

Card.displayName = "Card";
