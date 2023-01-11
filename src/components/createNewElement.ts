export default function createNewElement(tag: string, style: string) {
    const template: HTMLElement = document.createElement(tag);
    template.classList.add(style);
    return template;
}
