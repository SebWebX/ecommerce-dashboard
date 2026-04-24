

export function renderCharts(products){

  const existingBar = Chart.getChart('chart-categories')
  const existingScatter = Chart.getChart('chart-prices')

   if (existingBar) existingBar.destroy()
   if (existingScatter) existingScatter.destroy()

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const barColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(29,29,31,0.08)'
  const barBorder = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(29,29,31,0.6)'
  const dotColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(29,29,31,0.6)'

  const categoryCounts = {}

  products.forEach(product => {
    const cat = product.category
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  })

  const categoryLabels = Object.keys(categoryCounts);
  const categoryData = Object.values(categoryCounts);
  const ctxCategories = document.getElementById('chart-categories').getContext('2d');

  new Chart(ctxCategories, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Productos',
        data: categoryData,
        backgroundColor: barColor,
        borderColor: barBorder,
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {display: false}
      },
      scales: {
        x: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        },
        y: {
          ticks: { color: textColor },
          grid: { color: gridColor }
        }
      }
    }
  })

  const priceData = products.map((product, index) => ({
    x: index + 1,
    y: product.price
  }))
  
  const ctxPrices = document.getElementById('chart-prices').getContext('2d')
  
  new Chart(ctxPrices, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Precio',
        data: priceData,
        backgroundColor: dotColor,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Producto'},
            ticks: {color: textColor},
            grid: {color: gridColor}
          
        },
        y: {
          title: {
            display: true,
            text: 'Precio (USD)'},
            ticks: {color: textColor},
            grid: {color: gridColor},
            beginAtZero: true
        }
      }
    }
  })
}