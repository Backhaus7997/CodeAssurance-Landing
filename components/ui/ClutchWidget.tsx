'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface ClutchWidgetProps {
  clutchCompanyId: string;
  widgetType?: string;
  height?: string;
  nofollow?: boolean;
  expandIframe?: boolean;
  scale?: string;
}

export default function ClutchWidget({
  clutchCompanyId,
  widgetType = '1',
  height = '40',
  nofollow = true,
  expandIframe = true,
  scale = '100',
}: ClutchWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // After the script is loaded and the widget is mounted,
    // try to initialize the widget if CLUTCHCO is available
    const initWidget = () => {
      if (typeof window !== 'undefined' && (window as any).CLUTCHCO && widgetRef.current) {
        try {
          // Re-initialize widget for SPA navigation
          (window as any).CLUTCHCO.Init();
        } catch (error) {
          console.warn('Clutch widget initialization warning:', error);
        }
      }
    };

    if (scriptLoadedRef.current) {
      initWidget();
    }
  }, []);

  const handleScriptLoad = () => {
    scriptLoadedRef.current = true;
    if (typeof window !== 'undefined' && (window as any).CLUTCHCO && widgetRef.current) {
      try {
        (window as any).CLUTCHCO.Init();
      } catch (error) {
        console.warn('Clutch widget initialization warning:', error);
      }
    }
  };

  return (
    <>
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div
        ref={widgetRef}
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type={widgetType}
        data-height={height}
        data-nofollow={nofollow.toString()}
        data-expandifr={expandIframe.toString()}
        data-scale={scale}
        data-clutchcompany-id={clutchCompanyId}
      />
    </>
  );
}
