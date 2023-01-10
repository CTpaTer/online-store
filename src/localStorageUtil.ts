type ObjectLocalStorage = {
    id: number;
    count: number;
    price: number;
};

export class LocalStorageUtil {
    keyName: string;

    constructor() {
        this.keyName = 'products';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(ObjectProduct: ObjectLocalStorage) {
        const products = this.getProducts();
        let isProduct = false;
        products.forEach((element: ObjectLocalStorage) => {
            if (element.id === ObjectProduct.id) {
                isProduct = true;
            }
        });
        if (!isProduct) {
            products.push(ObjectProduct);
            // isPushed = true;
            window.localStorage.setItem(this.keyName, JSON.stringify(products));
        } else {
            // products.splice(index, 1);
        }
        return {
            // isPushed: isPushed,
            products: products,
        };
    }

    removeProducts(idProduct: number) {
        const products = this.getProducts();
        let isProduct = false;
        products.forEach((element: ObjectLocalStorage) => {
            if (element.id === idProduct) {
                isProduct = true;
            }
        });

        if (isProduct) {
            const newProducts = products.filter((item: ObjectLocalStorage) => item.id !== idProduct);
            window.localStorage.setItem(this.keyName, JSON.stringify(newProducts));
        }
    }

    checkProduct(idProduct: number) {
        const products = this.getProducts();
        let isProduct = false;
        products.forEach((element: ObjectLocalStorage) => {
            if (element.id === idProduct) {
                isProduct = true;
            }
        });
        return isProduct;
    }

    showTotalprice() {
        const products = this.getProducts();
        let price = 0;
        products.forEach((element: ObjectLocalStorage) => {
            if (element) {
                price += element.price;
            }
        });
        return price;
    }

    showBasket() {
        const products = this.getProducts();
        let count = 0;
        products.forEach((element: ObjectLocalStorage) => {
            if (element) {
                count += element.count;
            }
        });
        return count;
    }
}
