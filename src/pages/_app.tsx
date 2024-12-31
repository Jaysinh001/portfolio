// Updated app.tsx
import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useRef } from "react";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const refScrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let scroll: any;

    async function initializeLocomotiveScroll() {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
        // smoothMobile: false, // Disable smooth scroll on mobile
        multiplier: 1.2,
      });
    }

    initializeLocomotiveScroll();

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div lang={"en"} className={dmSans.className} ref={refScrollContainer} data-scroll-container>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;