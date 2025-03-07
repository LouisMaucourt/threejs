import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import vertexShader from '../shaders/transition/vertex.glsl';
import fragmentShader from '../shaders/transition/fragment.glsl';

const TransitionGeometry = new PlaneGeometry(2, 2, 64, 64);

const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        ratio: { value: 1.0 },
    },
});

export const TransitionMesh = new Mesh(TransitionGeometry, material);