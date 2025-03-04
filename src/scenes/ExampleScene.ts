import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  PointLight,
  PerspectiveCamera,
  Color,
  Group
} from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import type {
  Viewport,
  Clock,
  Lifecycle
} from '~/core'

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
  public light1: PointLight
  public light2: PointLight
  public light3: PointLight

  public constructor({ clock, camera, viewport }: MainSceneParameters) {
    super();

    this.clock = clock;
    this.camera = camera;
    this.viewport = viewport;
    this.background = new Color(0x1E3A8A);

    this.camera.position.set(0, 0, 6);
    this.camera.lookAt(0, 0, 0);

    this.light1 = new PointLight(0xffbbff, 0.5, 30, 0.5);
    this.light1.position.set(2, 0, -2);

    this.light2 = new PointLight(0xbbffff, 0.5, 30, 0.5);
    this.light2.position.set(-2, 4, 2);

    this.light3 = new PointLight(0xffffff, 1, 30, 2);
    this.light3.position.set(0, 5, 0);

    this.add(this.light1, this.light2, this.light3);
  }

  public async load(): Promise<void> {
    const loader = new GLTFLoader();
    loader.load('assets/models/fly.glb', (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(0.008, 0.008, 0.008)
      this.model.rotation.set(0, 11, 0)
      this.model.position.set(0, -1, 0);
      this.add(this.model);
    });
  }

  public update(): void {
    const theta = Math.atan2(this.camera.position.x, this.camera.position.z);

    this.light1.position.x = Math.cos(theta + this.clock.elapsed * 0.001) * 2;
    this.light1.position.z = Math.sin(theta + this.clock.elapsed * 0.0005) * 2;
    this.light2.position.y = Math.sin(theta + this.clock.elapsed * 0.001) * 4;
    this.light2.position.z = Math.cos(theta + this.clock.elapsed * 0.0005) * 2;

    if (this.model) {
      // this.model.rotation.x += 0.0002 * this.clock.delta;
      // this.model.rotation.y += 0.0002 * this.clock.delta;
    }
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
