export function renderCharts(products){
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
        backgroundColor: 'rgba(29, 29, 31, 0.08)',
        borderColor: 'rgba(29, 29, 31, 0.6)',
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
        y: {
          beginAtZero: true,
          ticks: {stepSize: 1}
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
        backgroundColor: 'rgba(29, 29, 31, 0.6)',
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
            text: 'Producto'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Precio (USD)'
          },
          beginAtZero: true
        }
      }
    }
  })
}