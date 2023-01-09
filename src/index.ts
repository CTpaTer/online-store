import { data, IDataItem } from './assets/data/data';
import { LocalStorageUtil } from './localStorageUtil';
import './style.css';
import { ProductDetail } from './pages/product-details/product-details';
import { Basket } from './pages/basket/basket';

const checks = document.querySelectorAll('input[type="checkbox"]');
const mainPage = document.querySelector('.main__wrapper') as HTMLElement;

const storage = new LocalStorageUtil();
let summ = storage.showTotalprice();
let counter = storage.showBasket();
const totalPrice: HTMLElement | null = document.querySelector('.header__total_price');
const basketCount: HTMLElement | null = document.querySelector('.header__basket_count');

class Application {
    aciveClass: string;
    private ProductDetail: ProductDetail;
    private Basket: Basket;
    buttonAddToCard: HTMLElement;
    constructor() {
        this.aciveClass = 'active';

        checks.forEach((item) => {
            item.addEventListener('click', () => {
                // const target = event.target as HTMLInputElement;

                this.onClickEvent();
                this.checkButtons();
            });
        });

        const search = document.querySelector('.search') as HTMLInputElement | null;

        if (!search) {
            throw new Error('undefined');
        }

        search.addEventListener('input', () => {
            this.onClickEvent();
            this.checkButtons();
        });

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
            const indexOfItem = numberOfItem - 1;
            const buttonAdd = buttonContent.classList[0] === 'item__button_add';
            const buttonDetails = buttonContent.classList[0] === 'item__button_details';
            if (buttonContent.tagName === 'BUTTON' && buttonAdd) {
                const dataID = Number(data[indexOfItem].id);
                const dataPrice = Number(data[indexOfItem].price);
                const product = { id: dataID, count: 1, price: dataPrice };
                if (!storage.checkProduct(indexOfItem + 1)) {
                    buttonContent.innerText = 'DROP FROM CART';
                    storage.putProducts(product);
                    if (totalPrice) {
                        summ = storage.showTotalprice();
                        totalPrice.innerText = `${summ}`;
                    }

                    if (basketCount) {
                        counter = storage.showBasket();
                        basketCount.innerText = `${counter}`;
                    }
                } else {
                    buttonContent.innerText = 'ADD TO CART';
                    storage.removeProducts(dataID);
                    if (totalPrice) {
                        summ = storage.showTotalprice();
                        totalPrice.innerText = `${summ}`;
                    }

                    if (basketCount) {
                        counter = storage.showBasket();
                        basketCount.innerText = `${counter}`;
                    }
                }
            } else if (buttonContent.tagName === 'BUTTON' && buttonDetails) {
                this.ProductDetail = new ProductDetail(indexOfItem);
                mainPage.innerHTML = '';
                mainPage.appendChild(this.ProductDetail.container);
            }
        });
    }

    public onClickEvent(): void {
        this.renderItems(products.filter());
    }

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
    }

    public render(data: IDataItem[]): void {
        this.renderItems(data);
    }

    public checkButtons() {
        const buttons = document.querySelectorAll('.item__button_add');
        buttons.forEach((button) => {
            const parentButton = button.parentNode as HTMLElement;
            const numberOfItem = Number(parentButton.classList[1]);
            if (storage.checkProduct(numberOfItem)) {
                button.innerHTML = 'DROP FROM CART';
            }
        });
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
const products = new Products(data);

app.render(data);
app.checkButtons();

const sortPriceIncr = document.querySelector('#sort-price_increase') as HTMLElement;
sortPriceIncr.addEventListener('click', () => {
    data.sort((a, b) => +a.price - +b.price);
    app.renderItems(data);
});

const sortPriceDesc = document.querySelector('#sort-price_descending') as HTMLElement;
sortPriceDesc.addEventListener('click', () => {
    data.sort((a, b) => +b.price - +a.price);
    app.renderItems(data);
});

const sortRatingIncr = document.querySelector('#sort-rating_increase') as HTMLElement;
sortRatingIncr.addEventListener('click', () => {
    data.sort((a, b) => +a.rating - +b.rating);
    app.renderItems(data);
});

const sortRatingDesc = document.querySelector('#sort-rating_descending') as HTMLElement;
sortRatingDesc.addEventListener('click', () => {
    data.sort((a, b) => +b.rating - +a.rating);
    app.renderItems(data);
});
