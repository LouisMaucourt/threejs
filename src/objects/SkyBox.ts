import { BoxGeometry, Mesh } from "three";
import { skyboxMat } from "../materials/skyboxMaterial";

export const skyboxGeometry = new BoxGeometry(50000, 50000, 50000);
export const SkyBox = new Mesh(skyboxGeometry, skyboxMat);
SkyBox.rotation.set(1, 0, 0);
