import { getProducts, getCategories } from './core/api.js'
import store from './core/store.js'
import { navigateTo } from './core/router.js'
import { renderKpiCards } from './components/KpiCards.js'
import { renderDataTable, initSearch, initCategoryFilter } from './components/DataTable.js'
import { renderCharts } from './components/Charts.js'

function initSidebarToggle() {
  const toggle = document.querySelector('.topbar__left-button')
  const sidebar = document.getElementById('sidebar')
  const overlay = document.querySelector('.sidebar-overlay')

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--open')
    overlay.classList.toggle('sidebar-overlay--visible')
    const isOpen = sidebar.classList.contains('sidebar--open')
    toggle.setAttribute('aria-expanded', isOpen)
  })

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('sidebar--open')
    overlay.classList.remove('sidebar-overlay--visible')
    toggle.setAttribute('aria-expanded', 'false')
  })
}

async function init(){
    store.setLoading(true);

    const products = await getProducts();
    const categories = await getCategories();

    store.setProducts(products);
    store.setCategories(categories);

    renderKpiCards(products);

    store.setLoading(false);

    initSidebarToggle();
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
 