import React, { memo } from "react";
import styled from "@emotion/styled";

export interface IOverlayProps {
  close: () => void;
  isOpen: boolean;
}

export const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;

  background: #edf2f7;
  transition: opacity 0.5s;
`;

export const Overlay: React.FC<IOverlayProps> = memo(
  ({ close, isOpen }: IOverlayProps) => {
    const style: React.CSSProperties = isOpen
      ? { opacity: 0.8, zIndex: 10, pointerEvents: "all" }
      : { opacity: 0, zIndex: 10, pointerEvents: "none" };

    const onClick = React.useCallback(
      (ev: React.MouseEvent) => {
        ev.stopPropagation();
        close();
      },
      [close]
    );

    return (
      <OverlayStyle style={style} onClick={onClick}>
        {}
      </OverlayStyle>
    );
  }
);

Overlay.displayName = "Overlay";
