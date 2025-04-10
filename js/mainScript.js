import { setupBurgerMenu } from './burger.js';
import { setScrollbarWidth} from './scrollUtils.js';
import { setupSmoothScrollWithOffset } from './smoothScroll.js';
import { initCursorEffects } from './magicCursor.js';


initCursorEffects();
setupSmoothScrollWithOffset(80); // или 100, если хедер выше

// Вызываем при загрузке
document.addEventListener('DOMContentLoaded', () => {
  setScrollbarWidth();
});

setupBurgerMenu(); // вызываем!




