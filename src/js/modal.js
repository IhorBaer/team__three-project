const refs = {
    openModalItem: document.querySelector('[data-action="open-modal"]'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.backdrop'),
};

refs.openModalItem.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
    event.preventDefault();
    
    if (event.target === event.currentTarget) {
        return;
    }

    window.addEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.remove('visually-hidden');
    document.body.classList.add('modal-open');
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.backdrop.classList.add('visually-hidden');
    document.body.classList.remove('modal-open');
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