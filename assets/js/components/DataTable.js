import { sanitizeText } from '../utils/sanitizer.js';
import { formatCurrency, formatCategory } from '../utils/formatters.js';



export function renderDataTable(products){

  document.querySelector('.loading-state').hidden = true;
  document.querySelector('.table-wrapper').hidden = false;
  
  const count = document.querySelector('.data-table__count');
  count.textContent = `${products.length} productos`;
    
  const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr')
      
        tr.innerHTML = `
          <td><img src="${sanitizeText(product.image)}" alt="${sanitizeText(product.title)}" width="40" height="40"></td>
          <td>${sanitizeText(product.title)}</td>
          <td>${formatCategory(sanitizeText(product.category))}</td>
          <td>${formatCurrency(product.price)}</td>
          <td>${sanitizeText(String(product.rating.rate))} / 5</td>
          <td></td>
        `
      
        tbody.appendChild(tr)
    });
}

export function initSearch(products){
  const searchInput = document.getElementById('product-search')

  searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase()
      const filtered = products.filter(product =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
      renderDataTable(filtered)  
  })
}

export function initCategoryFilter(products, categories){
  const select = document.getElementById('category-filter');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category
    option.textContent = formatCategory(category)
    select.appendChild(option)
  })

  select.addEventListener('change', () =>{
    const selected = select.value
    const filtered = selected === ''
    ? products
    : products.filter(p => p.category === selected)

    renderDataTable(filtered)
  })
}