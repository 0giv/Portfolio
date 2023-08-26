var Socialclickcount = 0;
var aboutmeclickcount = 0;
var projectsclickcount = 0;
var darkmodeclickcount = 0;
function submit() {
  var title = document.getElementById('title');
  title.innerHTML = '0giv - Social Media';
  var background = document.getElementById('SocialMedia');
  background.style.transition = '0.5s';
  background.style.opacity = '10';
  background.style.marginTop = '1rem';

  Socialclickcount++;

  if (Socialclickcount % 2 == 1) {
    background.style.transition = '0.5s';
    background.style.opacity = '10';
    background.style.marginTop = '1rem';
  }
  else {
    title.innerHTML = '0giv - HomePage';
    background.style.opacity = '0';
    background.style.marginTop = '0.1rem';
  }

}
function submit1() {
  var title = document.getElementById('title');
  title.innerHTML = '0giv - About Me';
  var aboutme = document.getElementById('aboutme');

  aboutme.style.transition = '0.5s';
  aboutme.style.opacity = '10';
  aboutme.style.marginTop = '1rem';

  aboutmeclickcount++;

  if (aboutmeclickcount % 2 == 1) {
    aboutme.style.transition = '0.5s';
    aboutme.style.opacity = '10';
    aboutme.style.marginTop = '1rem';
  }
  else {
    title.innerHTML = '0giv - HomePage';
    aboutme.style.opacity = '0'
    aboutme.style.marginTop = '0.1rem';
  }
}
function submit2() {
  var title = document.getElementById('title');
  title.innerHTML = '0giv - Projects';
  var githubprojects = document.getElementById('githubprojects');

  projectsclickcount++;

  if (projectsclickcount % 2 == 1) {
    githubprojects.style.transition = '0.5s';
    githubprojects.style.opacity = '10';
    githubprojects.style.marginTop = '1rem';
  }
  else {
    title.innerHTML = '0giv - HomePage';
    githubprojects.style.opacity = '0';
    githubprojects.style.marginTop = '0.1rem';
  }
}
function darkmode() {
  var nick = document.getElementById('nick');
  var button = document.getElementById('darkmode');
  var body = document.getElementById('body');
  var social = document.getElementById('SocialMedia');
  var aboutme = document.getElementById('aboutme');
  var projects = document.getElementById('githubprojects');
  darkmodeclickcount++;

  if (darkmodeclickcount % 2 == 1) {
    nick.style.color = 'white';
    button.style.backgroundColor = 'white'
    body.style.transition = '0.5s';
    body.style.backgroundColor = 'black';
    social.style.transition = '0.5s';
    social.style.backgroundColor = 'grey';
    aboutme.style.transition = '0.5s';
    aboutme.style.backgroundColor = 'grey';
    projects.style.transition = '0.5s';
    projects.style.backgroundColor = 'grey';
  }
  else {
    nick.style.color = 'black';
    button.style.backgroundColor = 'grey'
    body.style.transition = '0.5s';
    body.style.backgroundColor = 'white';
    social.style.transition = '0.5s';
    social.style.backgroundColor = '#f2f2f2';
    aboutme.style.transition = '0.5s';
    aboutme.style.backgroundColor = '#f2f2f2';
    projects.style.transition = '0.5s';
    projects.style.backgroundColor = '#f2f2f2';
  }
}
const username = '0giv';

async function getTopProjects() {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
  const data = await response.json();
  return data;
}

async function showTopProjects() {
  const topProjects = await getTopProjects();
  const topProjectsList = document.getElementById('projects');

  topProjects.forEach(async (project) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = project.html_url;
    a.textContent = project.name;

    const details = document.createElement('div');
    details.classList.add('project-details');

    const starIcon = document.createElement('span');
    starIcon.classList.add('star-icon');
    starIcon.textContent = project.stargazers_count + ' ★ ';

    const forkIcon = document.createElement('span');
    forkIcon.classList.add('fork-icon');
    forkIcon.textContent = ' Fork: ' + project.forks_count;

    const languages = document.createElement('div');
    languages.classList.add('languages');

    const languagesResponse = await fetch(project.languages_url);
    const languagesData = await languagesResponse.json();
    const languageKeys = Object.keys(languagesData);

    languageKeys.forEach((languageKey) => {
      const language = document.createElement('span');
      language.classList.add('language');
      language.textContent = languageKey;
      languages.appendChild(language);
    });

    details.appendChild(starIcon);
    details.appendChild(forkIcon);
    details.appendChild(languages);

    li.appendChild(a);
    li.appendChild(details);
    topProjectsList.appendChild(li);
  });
}

window.addEventListener('load', () => {
  showTopProjects();
});