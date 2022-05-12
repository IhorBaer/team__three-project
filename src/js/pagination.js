// export class Pagination {
//     constructor({ initialPage = 1, total = 1, onChange }) {
//         this._currentPage = initialPage
//         this.total = total
//         this.onChange = onChange
//     }

//     get currentPage() {
//         return this._currentPage
//     }

//     set currentPage(value) {
//         this._currentPage = value

//         if (this.onChange) {
//             this.onChange(value)
//         }

//     }

//     incrementPage() {
//         if (this.currentPage >= this.total) {
//             return
//         }

//         this.currentPage += 1
//     }

//     decrementPage() {
//         if (this.currentPage === 1) {
//             return
//         }

//         this.currentPage -= 1
//     }

//     startPage() {
//         this.currentPage = 1;
//     }

//     lastPage() {
//         this.currentPage = this.total
//     }
// }

import { refs } from './base/refs'
import sprite from '../images/sprite.svg';
import MovieApiService from './api/fetch_movies'
import { dataFormat } from './base/data-format'
import { renderListCard } from './base/render';
import Pagination from 'tui-pagination';
import { genres } from './base/genres';

const arrowIcon = `${sprite}#icon-arrow`;
const dotsIcon = `${sprite}#dots`;
export const movieApiService = new MovieApiService()

export const paginationSettings = {
    startPage: 1,
    searchType: null,
    pagination: null,
    totalItemsHome: null,
};

export const initPagination = ({ page, itemsPerPage, totalItems }) => {
    const options = {
        page,
        itemsPerPage,
        totalItems,
        visiblePages: 5,
        centerAlign: true,
        usageStatistics: false,
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}p</strong>',
            currentPage: '<a href="#" class="tui-page-btn tui-is-selected">{{page}}</a>',
            moveButton: '<a href="#" class="tui-page-btn tui-{{type}} hide-{{type}}">' +
                `<svg class="tui-ico-{{type}}" width="16" height="16"></svg>` +
                '</a>',
            disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip change-{{type}}">' +
                `<svg class="tui-ico-ellip" width="14" height="14"><use href="${dotsIcon}"></use></svg>` +
                '</a>',
        },
    };

    const pagination = new Pagination(refs.pagination, options);
    paginationSettings.pagination = pagination;

    pagination.on('afterMove', async({ page }) => {
        if (paginationSettings.searchType === 'popular') {
            try {
                const response = await movieApiService.getPopularMovies(page)
                const formattedData = dataFormat(response.results, genres)
                renderListCard(formattedData)

            } catch (error) {
                console.log(error);
            }
        }
    })

    return pagination
}