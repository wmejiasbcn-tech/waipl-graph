import { useEffect, useState } from "react";
import { Ambient } from "@/components/ambient";
import { GraphStage } from "@/components/graph-stage";
import { PortalView } from "@/components/portal-view";
import { SafeBoundary } from "@/components/safe-boundary";
import { Shell } from "@/components/shell";
import { useEco } from "@/lib/store";
import { cn } from "@/lib/cn";

function tuneDevice() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 820;
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const cores = navigator.hardwareConcurrency || 8;
  const low = coarse || small || saveData || cores <= 4;
  if (low) {
    useEco.setState({ quality: "media" });
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) useEco.setState({ reduceMotion: true, autoRotate: false });
  return { mobile: coarse || small };
}

export function EcoApp() {
  const entered = useEco((s) => s.entered);
  const view = useEco((s) => s.view);
  const cursor = useEco((s) => s.cursor);
  const stackLen = useEco((s) => s.stack.length);
  const [portalGone, setPortalGone] = useState(false);
  const [ready, setReady] = useState(false);
  const [worldOn, setWorldOn] = useState(false);

  useEffect(() => {
    setReady(true);
    void Promise.resolve(useEco.persist.rehydrate()).finally(() => {
      const { mobile } = tuneDevice();
      if (!mobile) setWorldOn(true);
    });
  }, []);

  useEffect(() => {
    if (entered) setWorldOn(true);
  }, [entered]);

  useEffect(() => {
    if (entered) {
      const t = window.setTimeout(() => setPortalGone(true), 280);
      return () => window.clearTimeout(t);
    }
    setPortalGone(false);
  }, [entered]);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-mist"
      data-ready={ready ? "true" : "false"}
      data-entered={entered ? "1" : "0"}
      data-view={view}
      data-cursor={cursor}
      data-stack={stackLen}
    >
      <Ambient />
      {worldOn ? (
        <div className="absolute inset-0 z-0">
          <SafeBoundary
            fallback={
              <img
                src="/stills/city-wide.jpg"
                alt=""
                className="h-full w-full object-cover opacity-80"
              />
            }
          >
            <GraphStage interactive={entered} />
          </SafeBoundary>
        </div>
      ) : (
        <img
          src="/stills/city-wide.jpg"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-80"
        />
      )}

      {portalGone ? null : (
        <div
          className={cn(
            "absolute inset-0 z-20 transition-opacity duration-300 ease-out motion-reduce:duration-0",
            entered ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          )}
        >
          <PortalView />
        </div>
      )}

      {entered ? (
        <SafeBoundary fallback={null}>
          <Shell />
        </SafeBoundary>
      ) : null}
    </div>
  );
}
