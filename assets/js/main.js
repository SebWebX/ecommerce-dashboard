import { getProducts, getCategories } from './core/api.js'
import store from './core/store.js'
import { navigateTo } from './core/router.js'
import { renderKpiCards } from './components/KpiCards.js'
import { renderDataTable, initSearch, initCategoryFilter } from './components/DataTable.js'
import { renderCharts } from './components/Charts.js'

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark')
}

let themeToggleInitialized = false;
let profileFormInitialized = false;

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

function initThemeToggle(){
  const toggle = document.querySelector('.theme-toggle')
  const html = document.documentElement

  
  const currentTheme = html.getAttribute('data-theme')
  if (currentTheme === 'dark') {
    toggle.setAttribute('aria-checked', 'true')
  } else {
    toggle.setAttribute('aria-checked', 'false')
  }

  
  toggle.addEventListener('click', () => {
    const isDark = toggle.getAttribute('aria-checked') === 'true'
    if (isDark) {
      html.removeAttribute('data-theme')
      toggle.setAttribute('aria-checked', 'false')
      localStorage.setItem('theme', 'light')
    } else {
      html.setAttribute('data-theme', 'dark')
      toggle.setAttribute('aria-checked', 'true')
      localStorage.setItem('theme', 'dark')
    }
  })
}
function initProfileForm() {
  const form = document.querySelector('.profile-form')
  
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const saveStatus = document.querySelector('#save-status')
    saveStatus.textContent = '✓ Cambios guardados'
    
    setTimeout(() => {
      saveStatus.textContent = ''
    }, 3000)
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

      if(sectionId === 'ventas'){
        setTimeout(() =>{
          renderCharts(store.state.products)
        }, 50)
      }

      if (sectionId === 'perfil') {
        if (!themeToggleInitialized) {
          initThemeToggle()
          themeToggleInitialized = true
        } else {
          
          const toggle = document.querySelector('.theme-toggle')
          const currentTheme = document.documentElement.getAttribute('data-theme')
          toggle.setAttribute('aria-checked', currentTheme === 'dark' ? 'true' : 'false')
        }
      
        if (!profileFormInitialized) {
          initProfileForm()
          profileFormInitialized = true
        }
      }
    });
  });

init();
 