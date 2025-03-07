import { Color, ShaderMaterial, Vector3 } from "three";

const skyDomeRadius = 500.01;
export const SkyMaterial = new ShaderMaterial({
    uniforms: {
        skyRadius: { value: skyDomeRadius },
        env_c1: { value: new Color('#0d1a2f') },
        env_c2: { value: new Color('#0f8682') },
        noiseOffset: { value: new Vector3(100.01, 100.01, 100.01) },
        starSize: { value: 0.01 },
        starDensity: { value: 0.09 },
        clusterStrength: { value: 0.2 },
        clusterSize: { value: 0.2 },
    },
});
