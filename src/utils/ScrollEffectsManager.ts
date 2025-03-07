import { PerspectiveCamera, Color, Audio, AudioListener, AudioLoader, ShaderMaterial } from 'three';
import gsap from 'gsap';
import { ExampleScene } from '~/scenes/ExampleScene';
import { TextOverlayManager } from './TextOverlayManager';

interface ScrollEffectsManagerParams {
    scene: ExampleScene;
    camera: PerspectiveCamera;
    textOverlayManager: TextOverlayManager;
}

export class ScrollEffectsManager {
    private readonly scene: ExampleScene;
    private readonly camera: PerspectiveCamera;
    private readonly textOverlayManager: TextOverlayManager;

    private scrollDistance = 0;
    private readonly maxWheelIndex = 5;
    private readonly originalFov = 30;
    private readonly maxFovOffset = 50;

    private readonly uSurfaceColor = [
        '#9bd8ff',
        '#9bd8ff',
        '#77f1f3',
        '#29526a',
        '#d7e052',
        '#ae0f0f',
    ];

    private readonly uDepthColor = [
        '#186691',
        '#186691',
        '#5992b1',
        '#17900e',
        '#7a8f32',
        '#530e0e',
    ];

    private readonly uBigWavesSpeed = [
        '0.2',
        '0.3',
        '0.35',
        '0.4',
        '0.5',
        '0.7',
    ];

    private readonly uBigWavesElevation = [
        '0.25',
        '0.5',
        '0.75',
        '1',
        '1.2',
        '1.3',
    ];

    private readonly uColorMultiplier = [
        '5',
        '5',
        '5.2',
        '5.3',
        '5',
        '10',
    ];
    private readonly AudioPlayBackrate = [
        '1',
        '1.05',
        '1.1',
        '1.2',
        '1.5',
        '2',
    ];
    private readonly glitchRatio = [
        '1',
        '2',
        '10',
        '20',
        '30',
        '50',
    ];
    private readonly glitchOpacity = [
        '0.1',
        '0.1',
        '0.2',
        '0.4',
        '0.6',
        '0.8',
    ];
    private audioListener: AudioListener;
    private audio: Audio;
    private audioLoader: AudioLoader;

    constructor({
        scene,
        camera,
        textOverlayManager,
    }: ScrollEffectsManagerParams) {
        this.scene = scene;
        this.camera = camera;
        this.textOverlayManager = textOverlayManager;
        this.audioListener = new AudioListener();
        this.camera.add(this.audioListener);
        this.audio = new Audio(this.audioListener);
        this.audioLoader = new AudioLoader();
    }

    public start(): void {
        window.addEventListener('wheel', this.handleWheel);
        this.setupWheelReset();
        this.loadAudio();
    }

    public stop(): void {
        window.removeEventListener('wheel', this.handleWheel);
    }

    private handleWheel = (event: WheelEvent): void => {
        const speed = 0.001;
        const zoomSpeed = 0.05;

        this.scrollDistance += event.deltaY * 0.5;
        this.scene.light1.position.z += event.deltaY * speed;
        this.scene.light2.position.z += event.deltaY * speed;
        this.scene.light3.position.z += event.deltaY * speed;
        const waterMaterial = this.scene.Newwater.material as ShaderMaterial;
        waterMaterial.uniforms.uOffset.value.y += event.deltaY * 0.002;

        this.animateCameraFov(event.deltaY * zoomSpeed);
        this.updateWaterMaterial();
        this.updateTextMessage();
        this.updateAudioPlaybackRate();
        this.updateTransition();
    };



    private updateTransition(): void {
        const glitchchance = [
            0.0,
            0.05,
            0.1,
            0.15,
            0.3,
            0.5,
        ];

        const wheelIndex = this.calculateWheelIndex();
        const transitionMaterial = this.scene.GlitchMesh.material as ShaderMaterial;
        const chance = glitchchance[wheelIndex];
        transitionMaterial.uniforms.ratio.value = this.glitchRatio[wheelIndex];
        transitionMaterial.uniforms.opacity.value = this.glitchOpacity[wheelIndex];

        const chanceTransition = Math.random();
        if (chanceTransition < chance) {
            console.log(chanceTransition);
            transitionMaterial.visible = true;
            setTimeout(() => {
                transitionMaterial.visible = false;
            }, 1000);
        } else {
            transitionMaterial.visible = false;
        }
    }


    private updateAudioPlaybackRate(): void {
        const wheelIndex = this.calculateWheelIndex();
        const playbackRate = parseFloat(this.AudioPlayBackrate[wheelIndex]);
        this.audio.setPlaybackRate(playbackRate);
    }

    private animateCameraFov(deltaFov: number): void {
        const currentFov = this.camera.fov;
        const newFov = Math.max(
            this.originalFov - this.maxFovOffset,
            Math.min(
                this.originalFov + this.maxFovOffset,
                currentFov - deltaFov
            )
        );

        gsap.to(this.camera, {
            fov: newFov,
            duration: 0.5,
            onUpdate: () => {
                this.camera.updateProjectionMatrix();
            },
            ease: 'power1.out',
        });
    }

    private updateWaterMaterial(): void {
        const waterMaterial = this.scene.Newwater.material as ShaderMaterial;
        const wheelIndex = this.calculateWheelIndex();
        waterMaterial.uniforms.uSurfaceColor.value = new Color(this.uSurfaceColor[wheelIndex]);
        waterMaterial.uniforms.uDepthColor.value = new Color(this.uDepthColor[wheelIndex]);
        waterMaterial.uniforms.uBigWavesElevation.value = this.uBigWavesElevation[wheelIndex];
        waterMaterial.uniforms.uColorMultiplier.value = this.uColorMultiplier[wheelIndex];
        waterMaterial.uniforms.uBigWavesSpeed.value = this.uBigWavesSpeed[wheelIndex];
    }
    private calculateWheelIndex(): number {
        const wheel = Math.floor(Math.abs(this.scrollDistance) / (window.innerHeight * 10));
        return wheel % (this.maxWheelIndex + 1); // Boucle entre 0 et 5
    }


    private updateTextMessage(): void {
        const wheelIndex = this.calculateWheelIndex();
        this.textOverlayManager.updateMessage(wheelIndex);
    }

    private setupWheelReset(): void {
        let wheelTimeout: NodeJS.Timeout;

        const resetZoom = () => {
            gsap.to(this.camera, {
                fov: this.originalFov,
                duration: 1,
                onUpdate: () => {
                    this.camera.updateProjectionMatrix();
                },
                ease: 'power1.inOut',
            });
        };

        window.addEventListener('wheel', () => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(resetZoom, 100);
        });
    }

    private loadAudio(): void {
        window.addEventListener("click", () => {
            if (!this.audio.isPlaying) {
                this.audioLoader.load('/assets/sound.mp3', (buffer) => {
                    this.audio.setBuffer(buffer);
                    this.audio.setLoop(true);
                    this.audio.setVolume(0.5);
                    this.audio.setPlaybackRate(1);
                    this.audio.play();
                });
            }
        });
    }

    public update(): void { }

    public dispose(): void {
        this.stop();
        this.audio.stop();
    }
}
