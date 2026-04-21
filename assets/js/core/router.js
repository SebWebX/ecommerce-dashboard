
export function navigateTo(sectionId){
    const sections = document.querySelectorAll('.dashboard__section');
    sections.forEach(section => section.hidden = true);

    document.getElementById(sectionId).hidden = false;
    const links = document.querySelectorAll('.nav-list__link')
    links.forEach(link => link.removeAttribute('aria-current'))
    document.querySelector(`a[href="#${sectionId}"]`).setAttribute('aria-current', 'page');

    const heading = document.querySelector(`#${sectionId} .section-heading`);
    document.querySelector('.topbar__page-title').textContent = heading.textContent;
}


