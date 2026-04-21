export function formatCurrency(amount){
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

export function formatRating(rating){
    return `${rating} / 5`
}

export function formatCategory(category){
    const palabras = category.split(' ');

    const capitalizadas = palabras.map(palabra =>{
        return palabra.charAt(0).toUpperCase() + palabra.slice(1)
    });

    return capitalizadas.join(' ');
}