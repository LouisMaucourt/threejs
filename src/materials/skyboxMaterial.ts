import { MeshBasicMaterial, BackSide, TextureLoader } from "three";

import pathBlue_back from "../../assets/textures/skyblue/bkg1_back.png";
import pathBlue_bot from "../../assets/textures/skyblue/bkg1_bot.png";
import pathBlue_front from "../../assets/textures/skyblue/bkg1_front.png";
import pathBlue_left from "../../assets/textures/skyblue/bkg1_left.png";
import pathBlue_right from "../../assets/textures/skyblue/bkg1_right.png";
import pathBlue_top from "../../assets/textures/skyblue/bkg1_top.png";

const textureLoader = new TextureLoader();

const texturesBlue = {
    back: textureLoader.load(pathBlue_back),
    bottom: textureLoader.load(pathBlue_bot),
    front: textureLoader.load(pathBlue_front),
    left: textureLoader.load(pathBlue_left),
    right: textureLoader.load(pathBlue_right),
    top: textureLoader.load(pathBlue_top),
};

export const skyboxMat = [
    new MeshBasicMaterial({ map: texturesBlue.right, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.left, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.top, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.bottom, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.front, side: BackSide }),
    new MeshBasicMaterial({ map: texturesBlue.back, side: BackSide }),
];
