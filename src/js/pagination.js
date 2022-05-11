export class Pagination {
    constructor({ initialPage = 1, total = 1, onChange }) {
        this._currentPage = initialPage
        this.total = total
        this.onChange = onChange
    }

    get currentPage() {
        return this._currentPage
    }

    set currentPage(value) {
        this._currentPage = value

        if (this.onChange) {
            this.onChange(value)
        }

    }

    incrementPage() {
        if (this.currentPage === this.total) {
            return
        }

        if (this.currentPage === 500) {
            return
        }

        this.currentPage += 1
    }

    decrementPage() {
        if (this.currentPage === 1) {
            return
        }

        this.currentPage -= 1
    }

    startPage() {
        this.currentPage = 1;
    }

    lastPage() {
        this.currentPage = 500
    }
}