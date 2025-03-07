import {
  Scene,
  Mesh,
  PointLight,
  PerspectiveCamera,
  Group,
  AmbientLight,
  ShaderMaterial,
} from 'three'
import model from '../../assets/models/fly.glb'


import { waterMesh } from '~/objects/Newwater';
import { TransitionMesh } from '~/objects/Transition';
import { SkyBox } from '~/objects/SkyBox';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import type { Viewport, Clock, Lifecycle } from '~/core';

export interface MainSceneParameters {
  clock: Clock
  camera: PerspectiveCamera
  viewport: Viewport
}

export class ExampleScene extends Scene implements Lifecycle {

  public clock: Clock
  public camera: PerspectiveCamera
  public viewport: Viewport
  public model: Group | null = null
  public sun: AmbientLight
  public light1: PointLight
  public light2: PointLight
  public light3: PointLight
  public Newwater: Mesh
  public TransitionMesh: Mesh
  public SkyBox: Mesh

  public constructor({ clock, camera, viewport }: MainSceneParameters) {
    super();
    this.clock = clock;
    this.camera = camera;
    this.viewport = viewport;

    this.camera.position.set(0, 1, 5);
    this.camera.far = 100000;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(0, 0, 0);

    this.sun = new AmbientLight(0xffbbff, 1);

    this.light1 = new PointLight(0xffbbff, 0.5, 30, 0.5);
    this.light1.position.set(2, 0, -2);

    this.light2 = new PointLight(0xbbffff, 0.5, 30, 0.5);
    this.light2.position.set(-2, 4, 2);

    this.light3 = new PointLight(0xffffff, 1, 30, 2);
    this.light3.position.set(0, 5, 0);

    this.SkyBox = SkyBox;
    this.Newwater = waterMesh;
    this.Newwater = waterMesh;
    this.TransitionMesh = TransitionMesh
    // this.TransitionMesh.visible = false;
    this.Newwater.rotation.x = - Math.PI * 0.5;
    this.Newwater.position.set(0, -1, 0);
    this.TransitionMesh.position.set(0, 1, 4);


    this.add(
      this.sun,
      this.light1,
      this.light2,
      this.light3,
      this.Newwater,
      this.SkyBox,
      this.TransitionMesh
    );
  }

  public async load(): Promise<void> {
    const loader = new GLTFLoader();
    loader.load(model, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(0.003, 0.003, 0.003);
      this.model.rotation.set(0, 11, 0);
      this.model.position.set(0, 0.1, 0);

      this.add(this.model);
    });
  }

  public update(): void {
    const theta = Math.atan2(this.camera.position.x, this.camera.position.z);

    this.light1.position.x = Math.cos(theta + this.clock.elapsed * 0.001) * 2;
    this.light1.position.z = Math.sin(theta + this.clock.elapsed * 0.0005) * 2;
    this.light2.position.y = Math.sin(theta + this.clock.elapsed * 0.001) * 4;
    this.light2.position.z = Math.cos(theta + this.clock.elapsed * 0.0005) * 2;

    const waterMaterial = this.Newwater.material as ShaderMaterial;
    waterMaterial.uniforms.uTime.value = theta + this.clock.elapsed * 0.001;

  }
  public resize(): void {
    this.camera.aspect = this.viewport.ratio;
    this.camera.updateProjectionMatrix();
  }

  public dispose(): void {
    if (this.model) {
      this.remove(this.model);
    }
  }
}