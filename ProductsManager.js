import fs from 'fs';

const path = 'products.json';

class ProductsManager {

    constructor(path){
        this.products = [];
        this.path = path;
    }
  
    async getProducts(queryObject) {
        const {limit} = queryObject;
        try{
                    if(fs.existsSync(path)) {
                        const contenidoEnElArchivo = await fs.promises.readFile(path,"utf-8");
                        const productosEnElArray = JSON.parse(contenidoEnElArchivo)
                        return limit ? productosEnElArray.slice(0,limit) : productosEnElArray;
                    } else {
                        return [];       
                    }
                } catch (error) {
                    return error;
                }
        }

    async getProductById(id) {
        try {
            const products = await this.getProducts({});
            const product = products.find((product) => product.id === id);
            if(product) {
                console.log(`Product id: ${id} found.`);
                return product;
                } else {
                    return `Product id: ${id} not found.` ;
                }

        } catch (error) {
            return error;
        }
    }

        async addProduct(object) {
          try {
                if (!object.name || !object.price || !object.code) {
                        console.log("No has especificado al menos un campo. Producto no agregado.");
                        return;
                    }
                const products = await this.getProducts({});
                const isCode = products.some((product) => product.code === object.code);
                if (isCode) {
                        console.log(`Validación del campo code al agregar producto. Error ${object.code} ya existe. Producto no agregado.`);
                        return;
                    }        
                let id;
                if(!products.length) {
                        id = 1;
                    } else {
                        id = products[products.length - 1].id+1;
                    }
                products.push({id, ...object});
                await fs.promises.writeFile(path, JSON.stringify(products));                            
                return products;
               }
                catch (error) {
                    return error;
               }
            }
}

const product1 = {
    name: "Amoladora",
    price: 24000,
    code: "a"
}

const product2 = {
    name: "Taladro",
    price: 40000,
    code: "b"
}

const product3 = {
    name: "Destornillador plano",
    price: 1400,
    code: "c"
}

const product4 = {
    name: "Sierra",
    price: 3200,
    code: "d"
}

const product5 = {
    name: "Escalera de tres peldaños",
    price: 10000,
    code: "e"
}

const product6 = {
    name: "Pala",
    price: 8732,
    code: "f"
}

const product7 = {
    name: "Martillo",
    price: 1200,
    code: "g"
}

const product8 = {
    name: "Pinza de punta",
    price: 4000,
    code: "h"
}

const product9 = {
    name: "Balde",
    price: 2000,
    code: "i"
}

const product10 = {
    name: "Soldadora",
    price: 120000,
    code: "j"
}



// async function testing() {
//     const manager1 = new ProductsManager();
    
//     await manager1.addProduct(product1);
//     await manager1.addProduct(product2);
//     await manager1.addProduct(product3);
//     await manager1.addProduct(product4);
//     await manager1.addProduct(product5);
//     await manager1.addProduct(product6);
//     await manager1.addProduct(product7);
//     await manager1.addProduct(product8);
//     await manager1.addProduct(product9);
//     await manager1.addProduct(product10);
   
// }

// testing();
    
export const productsManager = new ProductsManager();