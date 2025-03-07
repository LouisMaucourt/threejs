import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import vertexShader from '../shaders/transition/vertex.glsl';
import fragmentShader from '../shaders/transition/fragment.glsl';

const TransitionGeometry = new PlaneGeometry(3, 3, 124, 124);

const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        ratio: { value: 0.0 },
        time: { value: 1.0 },
    },

    depthWrite: false,
    depthTest: false,
    visible: false
});

export const TransitionMesh = new Mesh(TransitionGeometry, material)