import FileIcons from 'file-icons-js';
import domLoaded from 'dom-loaded';
import select from 'select-dom';

let colorsDisabled = false;

const FILE_NAME_SELECTOR = 'div.js-navigation-item > div[role="rowheader"] > span';
const FILE_ICON_SELECTOR = 'div.js-navigation-item > div[role="gridcell"]:first-child';
const FILE_LIST_WRAPPER = '.repository-content .Box.mb-3';

const update = () => {

  const filenameDoms = select.all(FILE_NAME_SELECTOR);
  const iconDoms = select.all(FILE_ICON_SELECTOR);

  for (let i = 0; i < filenameDoms.length; i += 1) {
    const filename = filenameDoms[i].innerText.trim();

    const iconDom = iconDoms[i].querySelector('.octicon')

    const isDirectory = iconDom.classList.contains('octicon-file-directory')

    const className = colorsDisabled
      ? FileIcons.getClass(filename)
      : FileIcons.getClassWithColor(filename);

    if (className && !isDirectory) {
      const icon = document.createElement('span');
      icon.className = `icon octicon ${className}`;
      iconDom.parentNode.replaceChild(icon, iconDom);
    }
  }
};

const observer = new MutationObserver(update);
const observeFragment = () => {
  const ajaxFiles = select(FILE_LIST_WRAPPER);
  if (ajaxFiles) {
    observer.observe(ajaxFiles, {
      childList: true,
    });
  }
};

const init = async () => {
  observeFragment();
  await domLoaded;
  update();

  document.addEventListener('pjax:end', update);
  document.addEventListener('pjax:end', observeFragment);
};

init();
