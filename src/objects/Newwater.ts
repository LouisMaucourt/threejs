import { Color, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';
import waterVertex from '../shaders/water/vertex.glsl'
import waterFragment from '../shaders/water/fragment.glsl'

const waterGeometry = new PlaneGeometry(70, 70, 1200, 1200);
const waterMaterial = new ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    uniforms: {
        uTime: { value: 0 },
        uOffset: { value: new Vector2(0.001, 0.001) },

        uBigWavesElevation: { value: 0.25 },
        uBigWavesFrequency: { value: new Vector2(1, 0.5) },
        uBigWavesSpeed: { value: 0.2 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 3 },

        uDepthColor: { value: new Color('#186691') },
        uSurfaceColor: { value: new Color('#5dceff') },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 }

    }

});

export const waterMesh = new Mesh(waterGeometry, waterMaterial)

