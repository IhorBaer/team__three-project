import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import MovieApiService from './api/fetch_movies';
import { refs } from './base/refs'

export const paginationSettings = {
    startPage: 1,
    searchType: null,
    pagination: null,
    totalItemsHome: null,
}

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
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            currentPage: '<a href="#" class="tui-page-btn tui-is-selected">{{page}}</a>',
            moveButton: '<a href="#" class="tui-page-btn tui-{{type}} hide-{{type}}" >' +
                // svg
                '' +
                '</a>',
            disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip change-{{type}}  ">' +
                '<svg class="tui-ico-ellip">...</svg>' +
                '</a>'
        }
    };
}

const pagination = new Pagination(refs.pagination, options)
paginationSettings.pagination = pagination;