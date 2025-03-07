import { MeshBasicMaterial, BackSide, TextureLoader } from "three";

const textureLoader = new TextureLoader();
const pathBlue = "assets/textures/skyblue/bkg1_";

const texturesBlue = {
    back: textureLoader.load(`${pathBlue}back.png`),
    bottom: textureLoader.load(`${pathBlue}bot.png`),
    front: textureLoader.load(`${pathBlue}front.png`),
    left: textureLoader.load(`${pathBlue}left.png`),
    right: textureLoader.load(`${pathBlue}right.png`),
    top: textureLoader.load(`${pathBlue}top.png`),
};

export const skyboxMat = [
    new MeshBasicMaterial({ map: texturesBlue.right, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.left, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.top, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.bottom, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.front, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.back, side: BackSide }),
];
