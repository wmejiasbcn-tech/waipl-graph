import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  EDGES,
  NODE_MAP,
  NODES,
  VERIFY_TINT,
  type GraphNode,
  type Vec3,
} from "@/lib/graph-data";
import { useEco } from "@/lib/store";
import {
  Atmosphere,
  DriftEmbers,
  FilamentHalo,
  Helices,
  NeuralDust,
  OrbitingGold,
} from "@/components/graph-forms";

function vec(p: Vec3) {
  return new THREE.Vector3(p[0], p[1], p[2]);
}

function noRay() {}

function Pulse({ a, b, offset }: { a: Vec3; b: Vec3; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.18 + offset) % 1;
    const m = ref.current;
    if (!m) return;
    m.position.set(
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    );
    const s = 0.7 + Math.sin(t * Math.PI) * 0.5;
    m.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} raycast={noRay}>
      <sphereGeometry args={[0.055, 10, 10]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
    </mesh>
  );
}

function GraphNodeMesh({ node }: { node: GraphNode }) {
  const selectedId = useEco((s) => s.selectedId);
  const hoveredId = useEco((s) => s.hoveredId);
  const query = useEco((s) => s.query);
  const typeFilter = useEco((s) => s.typeFilter);
  const verifyFilter = useEco((s) => s.verifyFilter);
  const view = useEco((s) => s.view);
  const select = useEco((s) => s.select);
  const hover = useEco((s) => s.hover);
  const showLabels = useEco((s) => s.showLabels);
  const reduceMotion = useEco((s) => s.reduceMotion);
  const active = selectedId === node.id;
  const hovered = hoveredId === node.id;
  const q = query.trim().toLowerCase();
  const matchesQuery = !q || node.name.toLowerCase().includes(q) || node.community.toLowerCase().includes(q);
  const matchesType = typeFilter === "all" || node.type === typeFilter;
  const matchesVerify = verifyFilter === "all" || node.verify === verifyFilter;
  const dim = (!matchesQuery || !matchesType || !matchesVerify) && !active;
  const isCore = node.type === "nucleo";
  const verifyView = view === "verificacion";
  const glow = VERIFY_TINT[node.verify];
  const showName = !dim && (hovered || active || showLabels);
  const group = useRef<THREE.Group>(null);
  const seed = node.position[0] * 1.7 + node.position[2] * 0.9 + node.size;

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: verifyView ? glow : node.color,
        emissiveIntensity: isCore ? 0.7 : 0.48,
        roughness: 0.22,
        metalness: 0.28,
      }),
    [node.color, isCore, verifyView, glow],
  );

  useFrame(({ clock }, dt) => {
    const d = Math.min(dt, 0.1);
    const t = clock.elapsedTime;
    const pulse = reduceMotion ? 0 : 0.18 * (0.5 + 0.5 * Math.sin(t * (node.verify === "ejecutar" ? 2.1 : node.verify === "contrastar" ? 1.2 : 0.65) + seed));
    const base = active ? 1.05 : hovered ? 0.72 : verifyView ? 0.62 : isCore ? 0.62 : 0.42;
    mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, dim ? 0.04 : base + pulse, 8, d);
    mat.opacity = THREE.MathUtils.damp(mat.opacity, dim ? 0.1 : 1, 8, d);
    mat.transparent = dim;
    if (group.current && !reduceMotion) {
      group.current.position.set(
        node.position[0] + Math.sin(t * 0.33 + seed) * 0.11,
        node.position[1] + Math.cos(t * 0.27 + seed * 1.2) * 0.09,
        node.position[2] + Math.sin(t * 0.21 + seed * 0.7) * 0.11,
      );
    }
  });

  const pick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    select(node.id);
  };

  return (
    <group ref={group} position={node.position}>
      <mesh raycast={noRay}>
        <sphereGeometry args={[node.size * 0.78, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh
        material={mat}
        onPointerDown={pick}
        onClick={pick}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hover(null);
          document.body.style.cursor = "auto";
        }}
        scale={active ? 1.18 : hovered ? 1.08 : 1}
      >
        <sphereGeometry args={[node.size * 0.42, 18, 18]} />
      </mesh>
      <mesh visible={false} onPointerDown={pick} onClick={pick}>
        <sphereGeometry args={[Math.max(node.size * 0.85, 0.55), 12, 12]} />
      </mesh>
      {isCore ? (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} raycast={noRay}>
            <torusGeometry args={[node.size * 0.62, 0.03, 10, 48]} />
            <meshStandardMaterial color="#e0a018" emissive="#e0a018" emissiveIntensity={0.7} metalness={0.7} roughness={0.22} />
          </mesh>
          <mesh raycast={noRay}>
            <sphereGeometry args={[node.size * 0.58, 16, 16]} />
            <meshBasicMaterial color="#f6d56a" transparent opacity={0.28} depthWrite={false} />
          </mesh>
        </>
      ) : null}
      {verifyView && !dim ? (
        <mesh rotation={[Math.PI / 2, 0.3, 0]} raycast={noRay}>
          <torusGeometry args={[node.size * 0.7, 0.018, 8, 40]} />
          <meshBasicMaterial color={glow} transparent opacity={0.85} />
        </mesh>
      ) : null}
      {active ? (
        <mesh raycast={noRay}>
          <sphereGeometry args={[node.size * 0.72, 20, 20]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.12} depthWrite={false} />
        </mesh>
      ) : null}
      {showName ? (
        <Html
          center
          sprite
          pointerEvents="none"
          occlude={false}
          distanceFactor={10}
          zIndexRange={[8, 0]}
          position={[0, node.size * 0.58, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className={node.size < 0.55 ? "node-label node-label-sm" : "node-label"}>{node.name}</div>
        </Html>
      ) : null}
    </group>
  );
}

function Edges() {
  const selectedId = useEco((s) => s.selectedId);
  const curves = useMemo(
    () =>
      EDGES.map((e, i) => {
        const a = NODE_MAP[e.source];
        const b = NODE_MAP[e.target];
        if (!a || !b) return null;
        const mid = new THREE.Vector3(
          (a.position[0] + b.position[0]) / 2,
          (a.position[1] + b.position[1]) / 2 + 0.22 + (i % 5) * 0.08,
          (a.position[2] + b.position[2]) / 2,
        );
        const curve = new THREE.QuadraticBezierCurve3(vec(a.position), mid, vec(b.position));
        return { e, pts: curve.getPoints(16) };
      }).filter(Boolean) as { e: (typeof EDGES)[number]; pts: THREE.Vector3[] }[],
    [],
  );
  return (
    <group>
      {curves.map(({ e, pts }) => {
        const hot = selectedId === e.source || selectedId === e.target;
        const color = hot ? "#e8c04a" : e.kind === "nucleo" ? "#e08a48" : "#3ec8e0";
        return (
          <Line
            key={`${e.source}-${e.target}`}
            points={pts}
            color={color}
            lineWidth={hot ? 2.4 : 1.2}
            transparent
            opacity={hot ? 0.95 : 0.38}
            raycast={noRay}
          />
        );
      })}
    </group>
  );
}

function Pulses() {
  const reduceMotion = useEco((s) => s.reduceMotion);
  if (reduceMotion) return null;
  const list = EDGES.filter((e) => e.kind === "nucleo" || e.kind === "flujo").slice(0, 10);
  return (
    <group>
      {list.map((e, i) => {
        const a = NODE_MAP[e.source];
        const b = NODE_MAP[e.target];
        if (!a || !b) return null;
        return <Pulse key={`${e.source}-${e.target}`} a={a.position} b={b.position} offset={i * 0.11} />;
      })}
    </group>
  );
}

function CameraRig({ interactive }: { interactive: boolean }) {
  const selectedId = useEco((s) => s.selectedId);
  const autoRotate = useEco((s) => s.autoRotate);
  const reduceMotion = useEco((s) => s.reduceMotion);
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    const controls = controlsRef.current;
    if (!controls) return;
    const node = selectedId ? NODE_MAP[selectedId] : null;
    if (node) {
      target.set(node.position[0], node.position[1], node.position[2]);
      controls.target.lerp(target, 1 - Math.exp(-2.4 * d));
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={interactive}
      enableDamping
      dampingFactor={0.055}
      autoRotate={autoRotate && !reduceMotion && !selectedId}
      autoRotateSpeed={0.38}
      minDistance={4.2}
      maxDistance={28}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI * 0.78}
      enablePan={interactive}
    />
  );
}

function Scene({ interactive }: { interactive: boolean }) {
  const quality = useEco((s) => s.quality);
  return (
    <>
      <Atmosphere />
      <NeuralDust />
      <Helices />
      <FilamentHalo />
      <OrbitingGold />
      {quality === "alta" ? <DriftEmbers /> : null}
      <Edges />
      {quality === "alta" ? <Pulses /> : null}
      {NODES.map((n) => (
        <GraphNodeMesh key={n.id} node={n} />
      ))}
      <CameraRig interactive={interactive} />
    </>
  );
}

export function GraphCanvas({
  interactive,
  onFail,
}: {
  interactive: boolean;
  onFail?: () => void;
}) {
  const quality = useEco((s) => s.quality);
  const reduceMotion = useEco((s) => s.reduceMotion);
  const select = useEco((s) => s.select);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <Canvas
      camera={{ position: [0.6, 1.8, 13.2], fov: 42, near: 0.1, far: 90 }}
      dpr={quality === "alta" ? [1, 1.35] : [1, 1]}
      gl={{
        antialias: quality === "alta",
        alpha: false,
        powerPreference: quality === "alta" ? "high-performance" : "low-power",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
      }}
      frameloop={reduceMotion || hidden || !interactive ? "demand" : "always"}
      style={{
        touchAction: "none",
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
      }}
      onPointerMissed={() => select(null)}
      onCreated={({ gl }) => {
        const el = gl.domElement;
        const lost = (ev: Event) => {
          ev.preventDefault();
          onFail?.();
        };
        el.addEventListener("webglcontextlost", lost);
      }}
    >
      <Scene interactive={interactive} />
    </Canvas>
  );
}
