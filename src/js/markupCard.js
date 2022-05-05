const colorsCard = [
    { hex: '#4287f5' },
    { hex: '#42f5d1' },
    { hex: '#7bf542' },
    { hex: '#f5ef42' },
    { hex: '#f58142' },
    { hex: '#f54242' },
    { hex: '#9342f5' },
    { hex: '#f542a4' },
    { hex: '#f542ef' },
    { hex: '#42daf5' },
];

const galleryRef = document.querySelector('[data-gallery]')

const galleryItems = colorsCard
    .map(({ hex }) =>
        `<li class="films-gallery__item">
          <a href="#!" class="films-gallery__link gallery-card">
            <div class="gallery-card__image" style="background-color:${hex};">
              <img src="#!" alt="test" />
            </div>
            <div class="gallery-card__container">
              <p class="gallery-card__title">ONCE UPON A TIME... IN HOLLYWOOD</p>
              <p class="gallery-card__text">Drama, Comedy | 2019</p>
            </div>
          </a>
        </li>`)
    .join('');

galleryRef.insertAdjacentHTML("beforeend", galleryItems);