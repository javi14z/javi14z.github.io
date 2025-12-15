const tabs = Array.from(document.querySelectorAll('.tab'));
const panels = Array.from(document.querySelectorAll('.panel'));
const indicator = document.querySelector('.tab-indicator');

function setActiveTab(targetId) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.target === targetId;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === targetId);
  });

  moveIndicator();
}

function moveIndicator() {
  const activeTab = document.querySelector('.tab.is-active');
  if (!activeTab || !indicator) return;

  const { offsetLeft, offsetWidth } = activeTab;
  indicator.style.width = `${offsetWidth - 8}px`;
  indicator.style.transform = `translateX(${offsetLeft - 4}px)`;
}

function handleTabClick(event) {
  const button = event.currentTarget;
  const targetId = button.dataset.target;
  if (!targetId) return;
  setActiveTab(targetId);
}

function handleKeyNavigation(event) {
  const { key } = event;
  const currentIndex = tabs.findIndex((tab) => tab.classList.contains('is-active'));
  if (currentIndex === -1) return;

  if (key === 'ArrowRight' || key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = (currentIndex + 1) % tabs.length;
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    event.preventDefault();
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    tabs[prevIndex].focus();
    tabs[prevIndex].click();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', handleTabClick);
  tab.addEventListener('keydown', handleKeyNavigation);
});

window.addEventListener('resize', moveIndicator);
window.addEventListener('DOMContentLoaded', moveIndicator);
