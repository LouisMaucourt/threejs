import { MeshBasicMaterial, BackSide, TextureLoader } from "three";

const textureLoader = new TextureLoader();
const pathBlue = "assets/textures/skyblue/bkg1_";
const pathRed = "assets/textures/skyblue/bkg1_";

const texturesBlue = {
    back: textureLoader.load(`${pathBlue}back.png`),
    bottom: textureLoader.load(`${pathBlue}bot.png`),
    front: textureLoader.load(`${pathBlue}front.png`),
    left: textureLoader.load(`${pathBlue}left.png`),
    right: textureLoader.load(`${pathBlue}right.png`),
    top: textureLoader.load(`${pathBlue}top.png`),
};
const texturesRed = {
    back: textureLoader.load(`${pathRed}back.png`),
    bottom: textureLoader.load(`${pathRed}bot.png`),
    front: textureLoader.load(`${pathRed}front.png`),
    left: textureLoader.load(`${pathRed}left.png`),
    right: textureLoader.load(`${pathRed}right.png`),
    top: textureLoader.load(`${pathRed}top.png`),
};

export const skyboxMat = [
    new MeshBasicMaterial({ map: texturesBlue.right, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.left, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.top, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.bottom, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.front, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.back, side: BackSide }),

    new MeshBasicMaterial({ map: texturesRed.right, side: BackSide }),
    new MeshBasicMaterial({ map: texturesRed.left, side: BackSide }),
    new MeshBasicMaterial({ map: texturesRed.top, side: BackSide }),
    new MeshBasicMaterial({ map: texturesRed.bottom, side: BackSide }),
    new MeshBasicMaterial({ map: texturesRed.front, side: BackSide }),
    new MeshBasicMaterial({ map: texturesRed.back, side: BackSide }),
];
