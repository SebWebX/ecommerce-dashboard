const BASE_URL = 'https://fakestoreapi.com';

export async function getProducts(){

    try{
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok){
            throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log(error);
    }
}

export async function getCategories(){
    try{
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok){
            throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log(error);
    }
}