'use strict';

// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar');
// const navbarHeight = navbar.getBoundingClientRect().height;
const navbarHeight = navbar.scrollHeight;
document.addEventListener('scroll', ()=> {
  // console.log(window.scrollY);
  // console.dir(`height: ${navbar}`);
  // console.dir(navbar);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//Handle scrolling when tapping on the navbar menu
const navbarmenu = document.querySelector('.navbar__menu');
navbarmenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link) {
    // console.log(event.target.dataset.link);
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({ behavior: 'smooth'});
    scrollIntoView(link);
    navbarmenu.classList.remove('open');
  }
    return;
});

//Navbar toggle button for samll screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarmenu.classList.toggle('open');
});

//Handle click me on "contact me" button on home
const homecontactBtn = document.querySelector('.home__contact')
homecontactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.scrollHeight;
document.addEventListener('scroll', () => {
  let opacityRate = 1 - window.scrollY/homeHeight;
  if (opacityRate >= 0) {
    home.style.opacity = opacityRate;
    // console.log(opacityRate); 
  }
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  }
  else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null) {
    return;
  }

// Remove previous seleciton and select new one
  const activeBtn = document.querySelector('.category__btn.selected');
  activeBtn.classList.remove('selected');
  // e.target.node이름이 버튼이면 e.target 그대로 쓰고,
  // 그렇지 않으면(즉 동그라미 누르면. span) 그 부모요소인 e.target.parentNode를 써라.
  const target = e.target.nodeName === 'BUTTON' ? e.target :
                e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('animationOut');
  // if ( filter != '*' && filter != project.dataset.type) {
    //   project.classList.add('invisible');
    // } else {
      //   project.classList.remove('invisible');
      // }
      
      setTimeout(() => {
        projects.forEach((project) => {
          if (filter === '*' || filter === project.dataset.type) {
            project.classList.remove('invisible');
          } else {
            project.classList.add('invisible');
          }
        });
          projectContainer.classList.remove('animationOut');
        }, 300);
    });


function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth'});
}

// 1. 모든 섹션 요소들과 메뉴아이템을 가지고 온다.
// 2. IntersecitonObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
  '#home', 
  '#about', 
  '#skill', 
  '#work', 
  '#testimonial', 
  '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
// console.log(sections);
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
window.onload = selectedNavItem.classList.add('active');
function selecteNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    // #아이디 요소가 화면밖으로 나갈 때 (!entry.isIntersecting), 
    // 몇 번째 아이디인지.indexOf 를 이용하여 받아온다.
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      console.log(index, entry.target.id);
      if(entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
       
      }else {
        selectedNavIndex = index - 1;
      }
      // const homey = sections[0].getBoundingClientRect();
      // console.log(homey);
      selecteNavItem(navItems[selectedNavIndex]);
    }
  });
}
const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));

