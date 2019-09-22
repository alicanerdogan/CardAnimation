import * as React from "react";
import { hot } from "react-hot-loader";
import styled from "@emotion/styled";

import { GlobalStyles } from "./utils/styles";
import { CardList } from "components/CardList";

const AppStyle = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  padding: 48px;
`;

const App: React.SFC<{}> = () => {
  return (
    <GlobalStyles>
      <AppStyle>
        <CardList />
      </AppStyle>
    </GlobalStyles>
  );
};

export default hot(module)(App);
