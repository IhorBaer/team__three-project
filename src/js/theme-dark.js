const themeDark = document.querySelector('.change-theme-dark');
const themeLight = document.querySelector('.change-theme-light');
const body = document.querySelector('body');
const authModalContainer = document.querySelector('.auth-modal-container');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const footerContainer = document.querySelector('.footer-container');
const formInputName = document.querySelector('.input-name-dark');
const formInputEmail = document.querySelector('.input-email-dark');
const formInputPassword = document.querySelector('.input-password-dark');
const themeIcon = document.querySelector('.theme');
const changeThemeSun = document.querySelector('.change-theme-light');

const Theme = {
    LIGHT: 'theme-light',
    DARK: 'theme-dark',
};

const { LIGHT, DARK } = Theme;

themeDark.addEventListener('click', changeTheme);
themeLight.addEventListener('click', changeTheme);

function changeTheme(event) {
    const theme = event.target;
    
    if (theme === event.currentTarget) {
        body.classList.add(DARK);
        authModalContainer.classList.add(DARK);
        modal.classList.add(DARK);
        modalContainer.classList.add(DARK);
        footerContainer.classList.add(DARK);
        formInputName.classList.add(DARK);
        formInputEmail.classList.add(DARK);
        formInputPassword.classList.add(DARK);
        themeIcon.classList.add(DARK);
        changeThemeSun.classList.add(DARK);


        body.classList.remove(LIGHT);
        authModalContainer.classList.remove(LIGHT);
        modal.classList.remove(LIGHT);
        modalContainer.classList.remove(LIGHT);
        footerContainer.classList.remove(LIGHT);
        formInputName.classList.remove(LIGHT);
        formInputEmail.classList.remove(LIGHT);
        formInputPassword.classList.remove(LIGHT);
        themeIcon.classList.remove(LIGHT);
        changeThemeSun.classList.remove(LIGHT);

        themeDark.style.display = "none";
        themeLight.style.display = "block";

        localStorage.setItem('theme', DARK);
        console.log(localStorage);
    } else {
        body.classList.add(LIGHT);
        authModalContainer.classList.add(LIGHT);
        modal.classList.add(LIGHT);
        modalContainer.classList.add(LIGHT);
        footerContainer.classList.add(LIGHT);
        formInputName.classList.add(LIGHT);
        formInputEmail.classList.add(LIGHT);
        formInputPassword.classList.add(LIGHT);
        themeIcon.classList.add(LIGHT);
        changeThemeSun.classList.add(LIGHT);

        body.classList.remove(DARK);
        authModalContainer.classList.remove(DARK);
        modal.classList.remove(DARK);
        modalContainer.classList.remove(DARK);
        footerContainer.classList.remove(DARK);
        formInputName.classList.remove(DARK);
        formInputEmail.classList.remove(DARK);
        formInputPassword.classList.remove(DARK);
        themeIcon.classList.remove(DARK);
        changeThemeSun.classList.remove(DARK);

        themeDark.style.display = "block";
        themeLight.style.display = "none";

        localStorage.setItem('theme', LIGHT);
        console.log(localStorage);
    }

}

let theme = localStorage.getItem('theme');

if (theme === null) {
    theme = LIGHT;
    localStorage.setItem('theme', theme);
    themeDark.style.display = "block";
    themeLight.style.display = "none";
} else if (theme === LIGHT) {
    theme = LIGHT;
    themeDark.style.display = "block";
    themeLight.style.display = "none";
} else {
    theme = DARK;
    themeDark.style.display = "none";
    themeLight.style.display = "block";
}

body.classList.add(theme);
authModalContainer.classList.add(theme);
modal.classList.add(theme);
modalContainer.classList.add(theme);
footerContainer.classList.add(theme);
formInputName.classList.add(theme);
formInputEmail.classList.add(theme);
formInputPassword.classList.add(theme);
themeIcon.classList.add(theme);
changeThemeSun.classList.add(theme);