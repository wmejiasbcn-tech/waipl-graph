import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEco } from "@/lib/store";

const FOG = "#0d1826";
const GOLD = "#e0a018";
const CYAN = "#1ec8d4";

function noRay() {}

export function Atmosphere() {
  const reduceMotion = useEco((s) => s.reduceMotion);
  const quality = useEco((s) => s.quality);
  const gold = useMemo(() => new THREE.Color("#1a2a3c"), []);
  const cyan = useMemo(() => new THREE.Color("#123048"), []);
  const mist = useMemo(() => new THREE.Color(FOG), []);
  const mix = useMemo(() => new THREE.Color(FOG), []);

  useFrame(({ clock, scene }) => {
    const u = reduceMotion ? 0.45 : 0.5 + 0.5 * Math.sin(clock.elapsedTime * 0.11);
    mix.copy(mist).lerp(gold, u * 0.28).lerp(cyan, (1 - u) * 0.22);
    const fog = scene.fog as THREE.Fog | null;
    if (fog) fog.color.copy(mix);
    scene.background = mix;
  });

  return (
    <>
      <color attach="background" args={[FOG]} />
      <fog attach="fog" args={[FOG, 14, 42]} />
      <hemisphereLight args={["#4a6a88", "#061018", 0.7]} />
      <ambientLight intensity={0.28} />
      <pointLight position={[0, 1.1, 0]} intensity={2.1} color="#ffd060" distance={18} />
      {quality === "alta" ? (
        <>
          <pointLight position={[3.2, 2.4, -2]} intensity={1.35} color="#2ad4e0" distance={16} />
          <pointLight position={[-3.4, 1.6, 2.2]} intensity={0.9} color="#5b7cff" distance={14} />
        </>
      ) : null}
      <directionalLight position={[8, 10, 6]} intensity={0.28} color="#c8e4ff" />
    </>
  );
}

export function Helices() {
  const reduceMotion = useEco((s) => s.reduceMotion);
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(
    () => [
      { r: 2.85, color: GOLD, opacity: 0.28 },
      { r: 4.65, color: CYAN, opacity: 0.22 },
      { r: 5.45, color: "#14C4B0", opacity: 0.16 },
      { r: 6.35, color: "#1DB888", opacity: 0.18 },
      { r: 7.55, color: "#7B6CFF", opacity: 0.16 },
      { r: 8.45, color: "#4A8EE8", opacity: 0.14 },
    ],
    [],
  );

  useFrame((_, dt) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.y += Math.min(dt, 0.1) * 0.06;
  });

  return (
    <group ref={group} position={[0, 0.2, 0]} rotation={[0.18, 0, 0.08]}>
      {rings.map((ring) => (
        <mesh key={ring.r} rotation={[Math.PI / 2, 0, 0]} raycast={noRay}>
          <torusGeometry args={[ring.r, 0.012, 8, 96]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function FilamentHalo() {
  const reduceMotion = useEco((s) => s.reduceMotion);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: CYAN,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      }),
    [],
  );
  const inner = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#8ad4e8",
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (reduceMotion) return;
    const u = 0.14 + 0.08 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 0.7));
    mat.opacity = u;
  });

  return (
    <group position={[0, 0.35, 0]}>
      <mesh raycast={noRay} material={inner}>
        <sphereGeometry args={[1.05, 32, 24]} />
      </mesh>
      <mesh raycast={noRay} material={mat} scale={1.22}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
    </group>
  );
}

const SLABS: { pos: [number, number, number]; rot: [number, number, number]; size: [number, number, number] }[] = [
  { pos: [2.6, 0.8, -1.4], rot: [0.15, 0.7, -0.08], size: [1.1, 1.6, 0.08] },
  { pos: [-2.8, 0.2, 1.1], rot: [-0.2, -0.5, 0.1], size: [0.9, 1.4, 0.07] },
  { pos: [0.4, -1.5, 2.2], rot: [0.4, 0.2, 0], size: [1.4, 0.12, 1.4] },
];

export function GlassSlabs() {
  return (
    <group>
      {SLABS.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} raycast={noRay}>
          <boxGeometry args={s.size} />
          <meshPhysicalMaterial
            color={i === 2 ? "#cfe6ee" : "#d8c8e8"}
            transparent
            opacity={0.22}
            roughness={0.08}
            metalness={0.25}
            transmission={0.55}
            thickness={0.35}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function DriftEmbers() {
  const quality = useEco((s) => s.quality);
  const reduceMotion = useEco((s) => s.reduceMotion);
  const count = quality === "alta" ? 42 : 18;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        x: ((i * 37) % 17) - 8,
        y: ((i * 13) % 11) - 5,
        z: ((i * 19) % 15) - 7,
        s: 0.035 + (i % 6) * 0.008,
        p: i * 0.37,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const inst = mesh.current;
    if (!inst) return;
    const t = reduceMotion ? 0 : clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      dummy.position.set(
        s.x + Math.sin(t * 0.17 + s.p) * 0.55,
        ((s.y + t * 0.22 + s.p) % 10) - 5,
        s.z + Math.cos(t * 0.14 + s.p) * 0.45,
      );
      dummy.scale.setScalar(s.s);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} raycast={noRay}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#7ee8ff" transparent opacity={0.7} depthWrite={false} />
    </instancedMesh>
  );
}

export function OrbitingGold() {
  const reduceMotion = useEco((s) => s.reduceMotion);
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current || reduceMotion) return;
    const t = clock.elapsedTime * 0.22;
    light.current.position.set(Math.cos(t) * 4.2, 1.4 + Math.sin(t * 0.7) * 0.6, Math.sin(t) * 4.2);
  });
  return <pointLight ref={light} intensity={0.85} color="#ffd9a0" distance={12} position={[4, 1.4, 0]} />;
}

export function NeuralDust() {
  const quality = useEco((s) => s.quality);
  const reduceMotion = useEco((s) => s.reduceMotion);
  const count = quality === "alta" ? 110 : 36;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: 160 }, (_, i) => {
        const a = (i * 2.399) % (Math.PI * 2);
        const r = 1.4 + (i % 23) * 0.38;
        return {
          x: Math.cos(a) * r,
          y: ((i * 11) % 17) * 0.22 - 1.8,
          z: Math.sin(a) * r * 0.92,
          s: 0.018 + (i % 5) * 0.006,
          p: i * 0.21,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    const inst = mesh.current;
    if (!inst) return;
    const t = reduceMotion ? 0 : clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      dummy.position.set(
        s.x + Math.sin(t * 0.21 + s.p) * 0.22,
        s.y + Math.cos(t * 0.17 + s.p) * 0.16,
        s.z + Math.sin(t * 0.15 + s.p * 0.8) * 0.22,
      );
      dummy.scale.setScalar(s.s * (0.85 + 0.25 * Math.sin(t * 1.4 + s.p)));
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} raycast={noRay}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#5ee0ff" transparent opacity={0.45} depthWrite={false} />
    </instancedMesh>
  );
}
