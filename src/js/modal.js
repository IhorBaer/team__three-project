const refs = {
    openModalItem: document.querySelector('[data-action="open-modal"]'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.backdrop'),
};

refs.openModalItem.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    window.addEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.remove('is-hidden');
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}