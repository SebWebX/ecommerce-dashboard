import { formatCurrency } from '../utils/formatters.js';

export function renderKpiCards(products){

    const totalSales = products.reduce((sum, p) => sum + p.price, 0);
    const totalProducts = products.length;
    const totalCategories = new Set(products.map(p => p.category)).size;
    const avgPrice = totalSales / totalProducts;

    const amounts = document.querySelectorAll('.kpi-card__amount');
    amounts[0].textContent = formatCurrency(totalSales);
    amounts[1].textContent = totalProducts;
    amounts[2].textContent = totalCategories;
    amounts[3].textContent = formatCurrency(avgPrice);
}

