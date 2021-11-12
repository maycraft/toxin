import '@scss/main.scss';
import './room-details.scss';
import '@components/header/header';
import '@components/footer/footer';
import '@components/form-reserv/form-reserv';
import '@components/benefit-block/benefit-block';
import '@components/feedback-block/feedback-block';
import '@components/bullet-list/bullet-list';
import '@components/chart/chart';

// Получаем все изображения
const images = document.querySelectorAll('.js-detail__image');
const changeMain = ({ target }) => {
    // если у изображения есть такой класс, то игнорим
    if (target.classList.contains('detail__image-main')) {
        return;
    }
    // если нет, то пробегаемся по всем изображения удаляем данный класс
    images.forEach(img => img.classList.remove('detail__image-main'));
    // а выбранному устанавливаем
    target.classList.add('detail__image-main');
};
// Пробегаемся по всем изображениям и навешиваем событие на клик
images.forEach(image => {
    image.addEventListener('click', changeMain);
});
