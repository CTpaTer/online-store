import './product-details.css';
import DataProducts from '../../assets/data/products.json';
import { BaseComponent } from '../../components/base-component';
import { IData } from '../../components/interfaces';
import createNewElement from '../../components/createNewElement';
import { LocalStorageUtil } from '../../localStorageUtil';

export class ProductDetail extends BaseComponent {
    data: IData;
    spanTitle: HTMLElement;
    spanPath: HTMLElement;
    productTitle: HTMLElement;
    productData: HTMLElement;
    productPhotos: HTMLElement;
    photoSlides: HTMLElement;
    photoMain: HTMLElement;
    imgPhotoMain: HTMLImageElement;
    productInfo: HTMLElement;
    addToCart: HTMLElement;
    blockOfButtons: HTMLElement;
    spanPrice: HTMLElement;
    buttonAddToCard: HTMLElement;
    buttonBuyNow: HTMLElement;
    private LocalStorageUtil: LocalStorageUtil;

    constructor(idNumber: number) {
        super('div', ['product-details']);
        this.data = DataProducts.products[idNumber];
        let summ = storage.showTotalprice();
        let counter = storage.showBasket();
        const totalPrice: HTMLElement | null = document.querySelector('.header__total_price');
        const basketCount: HTMLElement | null = document.querySelector('.header__basket_count');

        this.productTitle = createNewElement('div', 'product-title');
        this.spanPath = createNewElement('span', 'span-path');
        this.spanTitle = createNewElement('span', 'span-title');
        this.spanPath.innerText = `Store > ${this.data.category} > ${this.data.brand} > ${this.data.title}`;
        this.spanTitle.innerText = this.data.title;
        this.productTitle.append(this.spanPath);
        this.productTitle.append(this.spanTitle);

        this.productData = createNewElement('div', 'product-data');

        this.productPhotos = createNewElement('div', 'product-photos');
        this.photoSlides = createNewElement('div', 'photo-slides');
        const slides = this.data.images;
        for (let i = 0; i < slides.length; i += 1) {
            const slideImg = document.createElement('img');
            slideImg.src = `${slides[i]}`;
            slideImg.alt = 'Slide';
            this.photoSlides.append(slideImg);
        }

        this.photoMain = createNewElement('div', 'photo-main');
        this.imgPhotoMain = document.createElement('img');
        this.imgPhotoMain.classList.add('main-img');
        this.imgPhotoMain.src = `${this.data.thumbnail}`;
        this.imgPhotoMain.alt = `${this.data.title}`;
        this.photoMain.append(this.imgPhotoMain);

        this.productPhotos.append(this.photoSlides);
        this.productPhotos.append(this.photoMain);

        this.productInfo = createNewElement('div', 'product-info');
        this.productInfo.innerText = `
            description: ${this.data.description}
            discountPercentage: ${this.data.discountPercentage}
            rating: ${this.data.rating}
            stock: ${this.data.stock}
            brand: ${this.data.brand}
            category: ${this.data.category}
        `;

        this.addToCart = createNewElement('div', 'add-to-cart');
        this.blockOfButtons = createNewElement('div', 'block-of-buttons');

        this.spanPrice = createNewElement('span', 'span-price');
        this.spanPrice.innerText = `€${this.data.price}`;

        this.buttonAddToCard = createNewElement('button', 'button-add-to-card');
        this.buttonAddToCard.innerText = 'ADD TO CART';

        this.buttonBuyNow = createNewElement('button', 'button-buy-now');
        this.buttonBuyNow.innerText = 'BUY NOW';

        this.blockOfButtons.append(this.spanPrice);
        this.blockOfButtons.append(this.buttonAddToCard);
        this.blockOfButtons.append(this.buttonBuyNow);

        this.addToCart.append(this.blockOfButtons);

        this.productData.append(this.productPhotos);
        this.productData.append(this.productInfo);
        this.productData.append(this.addToCart);

        this.container.appendChild(this.productTitle);
        this.container.appendChild(this.productData);

        if (storage.checkProduct(this.data.id)) {
            this.buttonAddToCard.innerText = 'DROP FROM CART';
        }

        if (totalPrice) {
            totalPrice.innerText = `${summ}`;
        }

        if (basketCount) {
            basketCount.innerText = `${counter}`;
        }

        document.addEventListener('click', (e) => {
            const imgContent = e.target as HTMLImageElement;
            const buttonContent = e.target as HTMLButtonElement;
            const buttonAdd = buttonContent.classList[0] === 'button-add-to-card';
            const buttonBuy = buttonContent.classList[0] === 'button-buy-now';
            if (imgContent.tagName === 'IMG') {
                const changeMainImg: HTMLElement | null = document.querySelector('.main-img');
                if (changeMainImg) {
                    this.imgPhotoMain.src = imgContent.src;
                }
            } else if (buttonContent.tagName === 'BUTTON' && buttonAdd) {
                if (!storage.checkProduct(this.data.id)) {
                    this.buttonAddToCard.innerText = 'DROP FROM CART';
                    const product = { id: this.data.id, count: 1, price: this.data.price };
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
                    storage.removeProducts(this.data.id);
                    this.buttonAddToCard.innerText = 'ADD TO CART';
                    if (totalPrice) {
                        summ = storage.showTotalprice();
                        totalPrice.innerText = `${summ}`;
                    }

                    if (basketCount) {
                        counter = storage.showBasket();
                        basketCount.innerText = `${counter}`;
                    }
                }
            } else if (buttonContent.tagName === 'BUTTON' && buttonBuy) {
                storage.showTotalprice();
            }
        });
    }
}

const storage = new LocalStorageUtil();
