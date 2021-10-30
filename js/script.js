// window.addEventListener('load', function () {
document.addEventListener("DOMContentLoaded", () => {
function _removeClasses(elem, elemClass) {
    if (elem) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove(elemClass);
        }
    }
}


 
const htmlBody =document.querySelector('html');
// код определяющий на каком устройстве открыта страница
let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


if (isMobile.any()) {
    htmlBody.classList.add('_touch');

} else {
    htmlBody.classList.add('_pc');
}


// Проверка поддержки webp
function testWebP(elem) {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = function () {
      webP.height === 2 ? elem.classList.add('_webp') : elem.classList.add('_no-webp');
    };
  }

  testWebP(htmlBody);

  // IE
function isInternetExplorer() {
    return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
// console.log(isInternetExplorer());
if (isInternetExplorer() === false) {
    // alert('Браузер не IE');
} else {
    alert('Ваш браузер не поддерживается, страница может отображаться некорректно!');
    htmlBody.classList.add('_ie');
}
// lock body
const documentBody = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
let timeout = 10;


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('._body-wrapper').offsetWidth + 'px';
  
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    documentBody.style.paddingRight = lockPaddingValue;
    documentBody.classList.add('_lock');
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  
  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      documentBody.style.paddingRight = '0px';
      documentBody.classList.remove('_lock');
    }, 0);
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
// nclude('./_spoller.js')
// задать хедер(по дефолту везде .header)
const headerElement = '.header';


actionBurgerMenu();
onMenuLinkClick(headerElement);
hideHeader(headerElement, 300);

/*-------------------------- */
function actionBurgerMenu(iconBurger = '.icon-menu', bodyMenu = '.menu__list') {
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);
    if (iconMenu && menuBody) {
        iconMenu.addEventListener("click", function (e) {
            if (iconMenu.classList.contains('_active')) {
                iconMenu.classList.remove("_active");
                menuBody.classList.remove("_active");
                iconMenu.ariaExpanded="false";
                bodyUnLock();
            } else {
                iconMenu.classList.add("_active");
                menuBody.classList.add("_active");
                iconMenu.ariaExpanded="true";
                bodyLock();
            }
        });
    }
}


/*-------------------------- */
function onMenuLinkClick(headerElement = '.header', links = 'a[data-goto]', iconBurger = '.icon-menu', bodyMenu = '.menu__body') {
    const menuLinks = document.querySelectorAll(links);
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);

    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", function (e) {
                const menuLink = e.target;
                if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);

                    // если шапка фиксированная
                    /* 
                    console.log(document.querySelector(headerElement).offsetHeight);
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(headerElement).offsetHeight;*/

                    // если шапка не фиксированная
                    /**/
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                    if (iconMenu.classList.contains('_active')) {
                        bodyUnLock();
                        iconMenu.classList.remove('_active');
                        menuBody.classList.remove('_active');
                    }

                    if (document.querySelectorAll('._hover')) {
                        _removeClasses(document.querySelectorAll('._hover'), "_hover");
                    }

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                    e.preventDefault();
                }
            });
        });
    }
}

/*-------------------------- */
function hideHeader(headerElement = '.header', topOfset = 200) {
    let lastScroll = 0;
    const header = document.querySelector(headerElement);
    const defaultOfset = topOfset;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('_hide');

    if (header) {
        window.addEventListener('scroll', () => {
            if (scrollPosition() > lastScroll && !containHide()) {
                //scroll down с нуля
                header.classList.add('_vis');
            }
            if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOfset) {
                //scroll down после определенной позиции
                header.classList.add('_hide');
            }
            if (scrollPosition() < lastScroll && containHide()) {
                //scroll up
                header.classList.remove('_hide');
            }
            if (scrollPosition() == 0) {
                header.classList.remove('_vis');
            }
            lastScroll = scrollPosition();
        });
    }
}
 // переключение фильтра
 function toggleFilter(targetElement, linkFilter, blockFilter, filterShowAll) {
   let targetEl = targetElement.closest(linkFilter);
   let filterTitles = document.querySelectorAll(linkFilter);
   let filterLink = targetEl.dataset.filterName;

   filterTitles.forEach(filterLink => {
     filterLink.classList.remove('_active');
   });
   targetEl.classList.add('_active');

   let filterBlocks = document.querySelectorAll(blockFilter);
   for (let i = 0; i < filterBlocks.length; i++) {
     let filterItem = filterBlocks[i];
     if (filterLink == filterShowAll) {
       filterItem.style.removeProperty('display');

     } else {
       filterItem.style.display = 'none';
       if (filterItem.dataset.filter == `${filterLink}`) {
         filterItem.style.removeProperty('display');
       }
     }
   }
 }

//переключение табов
 function toggleTabs(targetElement, linkTab, blockTab) {
   
  let targetEl = targetElement.closest(linkTab);
  let tabsTitles = document.querySelectorAll(linkTab);
  let tabsContents = document.querySelectorAll(blockTab);
  let id = targetEl.dataset.tab;
  let content = document.querySelector(`._tabs-block[data-tab="${id}"]`);


  tabsTitles.forEach(title => {
    title.classList.remove('_active');
  });
  targetEl.classList.add("_active");

  tabsContents.forEach(content => {
    content.classList.remove("_active");
  });
  content.classList.add("_active");
 
}
const popupLinks = document.querySelectorAll('.popup-link');


// величина такая же как в css
// const timeout = 800; задан в _body-lock.js

// находим все ссылки на попапы и убираем у них # и по клику на ссылку открываем попап с таким именем
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

// находим все объекты с классом .close-popup и вешаем на клик по нему функцию закрытия 
const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

// функция открытия попапа
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

// функция закрытия попапа
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}


document.addEventListener('keydown', function (e) {
  
  if (e.key === 'Escape') {
    let popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
 
});

(function(){
  // проверяем поддержку
  if(!Element.prototype.closest){
    // реализуем
    Element.prototype.closest = function(css){
      var node = this;
      while(node){
        if(node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function(){
  // проверяем поддержку
  if(!Element.prototype.matches){
    // поределяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector||
      Element.prototype.msMatchesSelector;
  }
})();
// nclude('./_form.js')
  // делегирование события клик
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetElement = e.target;


    // работа фильтра на странице
    if (targetElement.closest('.filter-news__item')) {
      e.preventDefault();
      toggleFilter(targetElement, '.filter-news__item', '.news__item', "all");
    }

 

    // можно добавлять события клика
  }


 
});