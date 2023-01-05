import "../styles/globals.css";

import { type AppType } from "next/dist/shared/lib/utils";

import { StoreProvider } from "../backend/tasks/store";

const NextApp: AppType = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};
export default NextApp;
