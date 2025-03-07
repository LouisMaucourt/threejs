import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import vertexShader from '../shaders/transition/vertex.glsl';
import fragmentShader from '../shaders/transition/fragment.glsl';

const GlitchGeometry = new PlaneGeometry(5, 5, 124, 124);

const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        ratio: { value: 1.0 },
        time: { value: 10.0 },
        opacity: { value: 0.1 },
    },

    depthWrite: false,
    depthTest: false,
    visible: false
});

export const GlitchMesh = new Mesh(GlitchGeometry, material)