import { data, IDataItem } from './assets/data/data';
import { LocalStorageUtil } from './localStorageUtil';
import './style.css';
import { ProductDetail } from './pages/product-details/product-details';
import { Basket } from './pages/basket/basket';

const checks = document.querySelectorAll('input[type="checkbox"]');
const mainPage = document.querySelector('.main__wrapper') as HTMLElement;

const summ = Number(localStorage.getItem('TotalPrice'));
const counter = Number(localStorage.getItem('basketCount'));
const totalPrice: HTMLElement | null = document.querySelector('.header__total_price');
const basketCount: HTMLElement | null = document.querySelector('.header__basket_count');

if (!localStorage.getItem('TotalPrice')) {
    localStorage.setItem('TotalPrice', '0');
}

if (!localStorage.getItem('basketCount')) {
    localStorage.setItem('basketCount', '0');
}

class Application {
    aciveClass: string;
    private ProductDetail: ProductDetail;
    private Basket: Basket;
    constructor() {
        this.aciveClass = 'active';

        checks.forEach((item) => {
            item.addEventListener('click', () => {
                // const target = event.target as HTMLInputElement;

                this.onClickEvent();
            });
        });

        const search = document.querySelector('.search') as HTMLInputElement | null;

        if (!search) {
            throw new Error('undefined');
        }

        search.addEventListener('input', () => {
            // const target = event.target as HTMLInputElement;

            this.onClickEvent();
        });

        // document.querySelector('.clear-button')!.addEventListener('click', () => {
        //     search.value = '';
        //     this.onClickEvent();
        // });

        const clickHeaderLogo = document.querySelector('.header__logo') as HTMLElement;
        clickHeaderLogo.addEventListener('click', () => {
            window.location.replace('./index.html');
        });

        const clickHeaderBasket = document.querySelector('.header__basket') as HTMLElement;
        clickHeaderBasket.addEventListener('click', () => {
            this.Basket = new Basket();
            mainPage.innerHTML = '';
            mainPage.appendChild(this.Basket.container);
        });

        if (totalPrice) {
            totalPrice.innerText = `${summ}`;
        }

        if (basketCount) {
            basketCount.innerText = `${counter}`;
        }

        document.addEventListener('click', (e) => {
            const buttonContent = e.target as HTMLButtonElement;
            const parentButton = buttonContent.parentNode as HTMLElement;
            const numberOfItem = Number(parentButton.classList[1]);
            const buttonAdd = buttonContent.classList[0] === 'item__button_add';
            const buttonDetails = buttonContent.classList[0] === 'item__button_details';
            if (buttonContent.tagName === 'BUTTON' && buttonAdd) {
                console.log(numberOfItem);
            } else if (buttonContent.tagName === 'BUTTON' && buttonDetails) {
                this.ProductDetail = new ProductDetail(numberOfItem - 1);
                mainPage.innerHTML = '';
                mainPage.appendChild(this.ProductDetail.container);
            }
        });
    }

    public onClickEvent(): void {
        this.renderItems(products.filter());
    }

    // clickBasket(): void {
    //     const items = document.querySelectorAll('.item');

    //     items.forEach((item) => {
    //         item.addEventListener('click', () => {
    //             const id = item.getAttribute('data-id');
    //             const { isPushed, products } = storage.putProducts(id);

    //             if (isPushed) {
    //                 item.classList.add('active');
    //             } else {
    //                 item.classList.remove('active');
    //             }

    //             // this.createHeaderCounter(products.length);
    //         });
    //     });
    // }

    // public createHeader(): void {
    //     const header = document.createElement('header');
    //     header.classList.add('header');
    //     document.body.prepend(header);
    // }

    // public createHeaderCounter(count: number): number {
    //     return count;
    // }
    public renderItems(data: IDataItem[]): void {
        const itemsContainer = document.querySelector('.items') as HTMLElement;
        let htmlCatalog = '';
        const catalog = storage.getProducts();

        if (data.length === 0) {
            itemsContainer.innerHTML = 'Nothing to show';
            return;
        }

        data.forEach((elem: IDataItem) => {
            let activeClass = '';

            if (catalog.indexOf(elem.id) === -1) {
                // console.log(elem.id);
            } else {
                activeClass = ' ' + this.aciveClass;
            }

            htmlCatalog += `
            <div class="item${activeClass}" data-id="${elem.id}">
                <div class="item__title">
                <h2>${elem.name}</h2>
                </div>
                <div class="item__wrapper">
                    <div class="item__photo">
                    <img src=${elem.thumbnail}>
                    </div>
                    <div class="props">
                    <h3>price: ${elem.price}</h3>
                        <h3>discountPercentage: ${elem.discountPercentage}</h3>
                        <h3>rating: ${elem.rating}</h3>
                        <h3>stock: ${elem.stock}</h3>
                        <h3>brand: ${elem.brand}</h3>
                        <h3>category: ${elem.category}</h3>
                        <h3>rating: ${elem.rating}</h3>
                    </div>
                </div>
                <div class="item__buttons ${elem.id}">
                <button class="item__button_add">ADD TO CART</button>
                <button class="item__button_details">DETAILS</button>
                </div>
            </div>`;
        });

        itemsContainer.innerHTML = htmlCatalog;
        // this.clickBasket();
    }

    public render(data: IDataItem[]): void {
        // this.createHeader();
        this.renderItems(data);
    }
}

class Products {
    data: IDataItem[];
    filteredData: IDataItem[];
    filteredRules: IDataItem[];

    constructor(data: IDataItem[]) {
        this.data = data;
        this.filteredData = data;
        this.filteredRules = [];
    }

    filter() {
        const search = document.querySelector('.search') as HTMLInputElement;

        const filter = search.value.toLowerCase();

        const brands = [...document.querySelectorAll('#brands input:checked')].map(
            (input) => (input as HTMLInputElement).value
        );
        const categorys = [...document.querySelectorAll('#categorys input:checked')].map(
            (input) => (input as HTMLInputElement).value
        );

        // console.log(brands, categorys);
        const result = this.data.filter(
            (elem) =>
                (!brands.length || brands.includes(elem.brand)) &&
                (!categorys.length || categorys.includes(elem.category)) &&
                elem.name.toLocaleLowerCase().indexOf(filter) !== -1
        );

        this.filteredData = result;

        return result;
    }
}

const app = new Application();
const storage = new LocalStorageUtil();
const products = new Products(data);

app.render(data);
