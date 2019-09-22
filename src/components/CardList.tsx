import React, { memo } from "react";
import styled from "@emotion/styled";
import { Card, CardStyle } from "./Card";
import { media } from "utils/styles";

export interface ICardListProps {}

export const CardListStyle = styled.div`
  position: relative;
  display: flex;
  overflow: none;
  flex-wrap: wrap;
  margin: -16px;

  ${CardStyle} {
    margin: 16px;
    width: calc(${100 / 5}% - 32px);

    ${media.md`
      width: calc(${100 / 3}% - 32px);
    `}

    ${media.sm`
      width: calc(${100 / 2}% - 32px);
    `}
  }
`;

const randData = new Uint32Array(13);
window.crypto.getRandomValues(randData);

const data = Array.from(randData);

export const CardList: React.FC<ICardListProps> = memo(
  ({  }: ICardListProps) => {
    return (
      <CardListStyle>
        {data.map(key => (
          <Card key={key} />
        ))}
      </CardListStyle>
    );
  }
);

CardList.displayName = "CardList";
