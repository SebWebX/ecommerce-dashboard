import { getProducts, getCategories } from './core/api.js'
import store from './core/store.js'
import { navigateTo } from './core/router.js'
import { renderKpiCards } from './components/KpiCards.js'
import { renderDataTable, initSearch, initCategoryFilter } from './components/DataTable.js'
import { renderCharts } from './components/Charts.js'



async function init(){
    store.setLoading(true);

    const products = await getProducts();
    const categories = await getCategories();

    store.setProducts(products);
    store.setCategories(categories);

    renderKpiCards(products);

    store.setLoading(false);
}

document.querySelectorAll('.nav-list__link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const sectionId = link.getAttribute('href').replace('#', '')
      navigateTo(sectionId)

      if (sectionId === 'inventario') {
        renderDataTable(store.state.products)
        initSearch(store.state.products)
        initCategoryFilter(store.state.products, store.state.categories)
      }

      if (sectionId === 'ventas') {
        renderCharts(store.state.products)
      }
    });
  });

init();
 