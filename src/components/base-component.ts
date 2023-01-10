export class BaseComponent {
    readonly container: HTMLElement;

    constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
        this.container = document.createElement(tag);
        this.container.classList.add(...styles);
    }
}
