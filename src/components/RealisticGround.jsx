/** Dark warm earth — lit mainly by nearby lanterns */
export default function RealisticGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial
        color="#3a302c"
        roughness={0.94}
        metalness={0.02}
        envMapIntensity={0.18}
      />
    </mesh>
  );
}