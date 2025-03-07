export class TextOverlayManager {
    private textOverlay: HTMLDivElement | undefined
    private textMessage = "Démarre ton moteur cyber-sonic en scrollant"
    private readonly messages = [
        "Belle vue n'es-ce pas ?",
        "C'est bizarre, mais tu n'as pas le choix... Continue d'avancer.",
        "Tu n'as pas encore vu le vrai changement... Accélère !",
        "Tu es déjà bien engagé, ne te retourne pas, c'est trop tard.",
        "Oula... C'est quoi ce bordel, NE T'ARRETE SURTOUT PAS ?",
        "Pourquoi toujours toujours avancer, peut etre que la clé est de rester à admirer une mer",
    ]


    constructor() { }

    public init(): void {
        this.createHTMLTextOverlay()
    }

    private createHTMLTextOverlay(): void {
        const textContainer = document.createElement('div')
        textContainer.style.position = 'absolute'
        textContainer.style.top = '10%'
        textContainer.style.left = '50%'
        textContainer.style.transform = 'translateX(-50%)'
        textContainer.style.padding = '15px 25px'
        textContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        textContainer.style.color = 'white'
        textContainer.style.fontSize = '18px'
        textContainer.style.fontFamily = 'Arial, sans-serif'
        textContainer.style.borderRadius = '5px'
        textContainer.style.textAlign = 'center'
        textContainer.style.zIndex = '1000'
        textContainer.style.pointerEvents = 'none'
        textContainer.style.transition = 'opacity 0.5s ease'
        textContainer.style.boxShadow = '0 0 15px rgba(0, 120, 255, 0.5)'
        textContainer.style.border = '1px solid rgba(0, 150, 255, 0.3)'
        textContainer.innerText = this.textMessage

        document.body.appendChild(textContainer)
        this.textOverlay = textContainer
        this.setupFading()
    }

    private setupFading(): void {
        let fadeTimeout: ReturnType<typeof setTimeout>;

        window.addEventListener('wheel', () => {
            if (!this.textOverlay) return;
            this.textOverlay.style.opacity = '1';
            clearTimeout(fadeTimeout);

            fadeTimeout = setTimeout(() => {
                if (this.textOverlay) {
                    this.textOverlay.style.opacity = '0.5';
                }
            }, 2000);
        });
    }


    public updateMessage(wheelIndex: number): void {
        const safeIndex = Math.min(wheelIndex, this.messages.length - 1)
        this.textMessage = this.messages[safeIndex]

        if (this.textOverlay) {
            this.textOverlay.innerText = this.textMessage
        }
    }

    public dispose(): void {
        if (this.textOverlay && this.textOverlay.parentNode) {
            this.textOverlay.parentNode.removeChild(this.textOverlay)
        }
    }
}