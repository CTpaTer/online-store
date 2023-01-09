import './basket.css';
import DataProducts from '../../assets/data/products.json';
import { BaseComponent } from '../../components/base-component';
import { IData, ObjectLocalStorage } from '../../components/interfaces';
import createNewElement from '../../components/createNewElement';
import { LocalStorageUtil } from '../../localStorageUtil';

export class Basket extends BaseComponent {
    data: IData;
    private cartWrapper: HTMLElement;
    private productsInCart: HTMLElement;
    private prodItems: HTMLElement;
    private cartItem: HTMLElement;
    private titleAndPageControl: HTMLElement;
    private pageControl: HTMLElement;
    private spanTitle: HTMLElement;
    private totalCart: HTMLElement;
    constructor() {
        super('div', ['basket']);
        // this.data = DataProducts.products();
        this.cartWrapper = createNewElement('div', 'cart-wrapper');
        this.productsInCart = createNewElement('div', 'products-in-cart');
        this.titleAndPageControl = createNewElement('div', 'title-and-page-control');
        this.spanTitle = createNewElement('span', 'span-title');
        this.spanTitle.innerText = 'Products In Cart';

        this.titleAndPageControl.appendChild(this.spanTitle);

        this.pageControl = createNewElement('div', 'page-control');
        this.titleAndPageControl.append(this.pageControl);

        this.prodItems = createNewElement('div', 'prod-items');

        // start generate block productsInCart
        const products = storage.getProducts();
        let count = 1;
        products.forEach((product: ObjectLocalStorage) => {
            const id = product.id - 1;
            this.data = DataProducts.products[id];
            this.cartItem = createNewElement('div', 'cart-item');
            this.cartItem.innerHTML = `
                <div class="item-i">${count}</div>
                <div class="item-info">
                    <img src="${this.data.thumbnail}" alt="${this.data.title}">
                    <div class="item-detail-p">
                        <div class="basket-product-title">${this.data.title}</div>
                        <div class="product-description">${this.data.description}</div>
                        <div class="product-other">
                            <span>Rating: ${this.data.rating}</span>
                            <span>Discount: ${this.data.discountPercentage}</span>
                        </div>
                    </div>
                </div>
                <div class="number-control">
                <div class="stock-control">Stock: ${this.data.stock}</div>
                <div class="incDec-control">
                    <button>+</button>
                    1
                    <button>-</button>
                </div>
                <div class="amount-control">€${this.data.price}</div>
                </div>
            `;

            this.prodItems.append(this.cartItem);
            count++;
        });

        // stop generate block productsInCart

        this.productsInCart.append(this.titleAndPageControl);
        this.productsInCart.append(this.prodItems);

        this.cartWrapper.append(this.productsInCart);

        // ===================

        this.totalCart = createNewElement('div', 'total-cart');

        this.totalCart.innerHTML = `
                <h2>Summary<h2>
                <div class="total-price">Products: ${storage.showBasket()}</div>
                <div class="total-price">Total: €${storage.showTotalprice()}</div>
                <div class="promo-code">
                    <input type="search" placeholder="Enter promo code" class="ng-pristine ng-valid ng-touched">
                </div>
                <span class="promo-ex">Promo for test: 'RS', 'EPM'</span>
                <button>BUY NOW</button>
            `;

        this.cartWrapper.append(this.totalCart);

        this.container.appendChild(this.cartWrapper);
    }
}

const storage = new LocalStorageUtil();
