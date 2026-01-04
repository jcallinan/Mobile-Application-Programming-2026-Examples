import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function Planet() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#38bdf8" />
    </mesh>
  );
}

export function App() {
  return (
    <Canvas style={{ height: '100vh', background: '#020617' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1} />
      <Stars radius={50} depth={20} count={2000} factor={4} />
      <Planet />
      <OrbitControls enableZoom />
    </Canvas>
  );
}
