export default function EnvironmentProps() {
  const wood = { color: "#2a1f1a", roughness: 0.88, metalness: 0.04 };
  const stone = { color: "#2a2a38", roughness: 0.95, metalness: 0.08 };
  const moss = { color: "#1a2e24", roughness: 1, metalness: 0 };

  return (
    <group>
      <group position={[6.2, 0, 1.2]}>
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.16, 0.72]} />
          <meshStandardMaterial {...wood} />
        </mesh>
        <mesh position={[-1.15, 0.26, 0]} castShadow>
          <boxGeometry args={[0.16, 0.52, 0.72]} />
          <meshStandardMaterial {...wood} />
        </mesh>
        <mesh position={[1.15, 0.26, 0]} castShadow>
          <boxGeometry args={[0.16, 0.52, 0.72]} />
          <meshStandardMaterial {...wood} />
        </mesh>
        <mesh position={[0, 0.12, -0.2]} receiveShadow>
          <boxGeometry args={[2.4, 0.08, 0.5]} />
          <meshStandardMaterial color="#1a1410" roughness={1} />
        </mesh>
      </group>

      <group position={[-1.2, 0, 3.4]}>
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial {...stone} />
        </mesh>
        <mesh position={[0.75, 0.14, -0.35]} castShadow>
          <dodecahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial {...stone} />
        </mesh>
        <mesh position={[-0.55, 0.1, 0.45]} castShadow>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial {...stone} />
        </mesh>
      </group>

      <mesh position={[3.8, 0.28, 4.2]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial {...moss} />
      </mesh>

      <mesh position={[0.8, 0.18, 5.6]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial {...moss} />
      </mesh>

      <group position={[4.8, 0, -2.2]}>
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[0.14, 3.2, 0.14]} />
          <meshStandardMaterial color="#3b2020" roughness={0.75} />
        </mesh>
        <mesh position={[-0.9, 2.35, 0]} castShadow>
          <boxGeometry args={[1.05, 0.12, 0.12]} />
          <meshStandardMaterial color="#4a2424" roughness={0.7} />
        </mesh>
        <mesh position={[0.9, 2.35, 0]} castShadow>
          <boxGeometry args={[1.05, 0.12, 0.12]} />
          <meshStandardMaterial color="#4a2424" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.75, 0]} castShadow>
          <boxGeometry args={[0.12, 0.12, 1.6]} />
          <meshStandardMaterial color="#4a2424" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}