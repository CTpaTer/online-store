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

    putProducts(id: string | null) {
        const products = this.getProducts();
        let isPushed = false;
        const index = products.indexOf(id);

        if (index === -1) {
            products.push(id);
            isPushed = true;
        } else {
            products.splice(index, 1);
        }
        return {
            isPushed: isPushed,
            products: products,
        };
    }
}
