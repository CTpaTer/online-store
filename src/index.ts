import { data, IDataItem } from './assets/data/data';
import { LocalStorageUtil } from './localStorageUtil';
import './style.css';
console.log(data);
const checks = document.querySelectorAll('input[type="checkbox"]');
class Application {
    aciveClass: string;
    constructor() {
        this.aciveClass = 'active';

        checks.forEach((item) => {
            item.addEventListener('click', (event) => {
                const target = event.target as HTMLInputElement;

                this.onClickEvent();

                console.log(item);
            });
        });

        const search = document.querySelector('.search') as HTMLInputElement | null;

        if (!search) {
            throw new Error('undefined');
        }

        search.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;

            this.onClickEvent();

            console.log(this);
        });

        document.querySelector('.clear-button')!.addEventListener('click', () => {
            search.value = '';
            this.onClickEvent();
        });
    }

    public onClickEvent(): void {
        this.renderItems(products.filter());
    }

    clickBasket(): void {
        const items = document.querySelectorAll('.item');

        items.forEach((item) => {
            item.addEventListener('click', (event) => {
                const id = item.getAttribute('data-id');
                const { isPushed, products } = storage.putProducts(id);

                if (isPushed) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }

                this.createHeaderCounter(products.length);
            });
        });
    }

    public createHeader(): void {
        const header = document.createElement('header');
        header.classList.add('header');
        document.body.prepend(header);
    }

    public createHeaderCounter(count: number): number {
        return count;
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
                console.log(elem.id);
            } else {
                activeClass = ' ' + this.aciveClass;
            }

            htmlCatalog += `
            <div class="item${activeClass}" data-id="${elem.id}">
                <h2>${elem.name}</h2>             
                <div class="props">
                   <h3>quantity: ${elem.quantity}</h3>
                   
                   <h3>price: ${elem.price}</h3>
                    <h3>discountPercentage: ${elem.discountPercentage}</h3>
                    <h3>rating: ${elem.rating}</h3>
                    <h3>stock: ${elem.stock}</h3>
                    <h3>brand: ${elem.brand}</h3>
                    <h3>category: ${elem.category}</h3>
                    <h3>thumbnail: ${elem.thumbnail}</h3>
                    <h3>rating: ${elem.rating}</h3>
                    <img src=${elem.thumbnail}>
                   
                </div>
                </div>
            </div>`;
        });

        itemsContainer.innerHTML = htmlCatalog;
        this.clickBasket();
    }

    public render(data: IDataItem[]): void {
        this.createHeader();
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
        const search = document.querySelector('.search') as HTMLInputElement | null;

        const filter = search!.value.toLowerCase();

        const brands = [...document.querySelectorAll('#brands input:checked')].map(
            (input) => (input as HTMLInputElement).value
        );
        const categorys = [...document.querySelectorAll('#categorys input:checked')].map(
            (input) => (input as HTMLInputElement).value
        );

        console.log(brands, categorys);
        const result = this.data.filter(
            (elem) =>
                (!brands.length || brands.includes(elem.brand)) &&
                (!categorys.length || categorys.includes(elem.category)) &&
                elem.name.toLocaleLowerCase().indexOf(filter) !== -1
        );

        this.filteredData = result;

        console.log(result);

        return result;
    }
}

const app = new Application();
const storage = new LocalStorageUtil();
const products = new Products(data);

app.render(data);
