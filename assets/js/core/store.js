const store = {
    state: {
        products: [],
        categories: [],
        currentSection: 'kpis',
        isLoading: false,
        error: null
    },

    setProducts(products) {
        this.state.products = products
    },
    setCategories(categories) {
        this.state.categories = categories
    },
    setCurrentSection(section) {
        this.state.currentSection = section
    },
    setLoading(value) {
        this.state.isLoading = value
    },
    setError(error){
        this.state.error = error
    }

}

export default store;