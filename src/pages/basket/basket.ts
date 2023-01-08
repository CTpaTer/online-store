import './basket.css';
import DataProducts from '../../assets/data/products.json';
import { BaseComponent } from '../../components/base-component';
import { IData } from '../../components/interfaces';
import createNewElement from '../../components/createNewElement';

export class Basket extends BaseComponent {
    data: IData;
    private basketTitle: HTMLElement;
    private spanTitle: HTMLElement;
    constructor() {
        super('div', ['basket']);
        this.data = DataProducts.products[10];
        this.basketTitle = createNewElement('div', 'basket-title');
        this.spanTitle = createNewElement('span', 'span-title');
        this.spanTitle.innerText = this.data.title;
        this.basketTitle.append(this.spanTitle);

        this.container.appendChild(this.basketTitle);
    }
}
