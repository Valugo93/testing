document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/Valugo93/Portfolio/main/projects.json')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de proyectos cargados:', data);

            const projectCards = document.getElementById('project-cards');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const projects = data.projects;

            const displayProjects = (startIndex) => {
                projectCards.innerHTML = '';
                for (let i = 0; i < 3; i++) {
                    const projectIndex = (startIndex + i) % projects.length;
                    const project = projects[projectIndex];

                    const card = document.createElement('div');
                    card.className = 'card';

                    const img = document.createElement('img');
                    img.className = 'card-img-top';
                    img.src = project.image;
                    img.alt = project.title;

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';

                    const title = document.createElement('h5');
                    title.className = 'card-title';
                    title.textContent = project.title;

                    const description = document.createElement('p');
                    description.className = 'card-text';
                    description.textContent = project.description;

                    const languageContainer = document.createElement('div');
                    languageContainer.className = 'language-container';
                    project.languages.forEach(lang => {
                        const langDiv = document.createElement('div');
                        langDiv.className = 'language';

                        const langImg = document.createElement('img');
                        langImg.src = `images/${project.logo[lang]}`;
                        langImg.alt = lang;
                        langImg.className = 'language-logo';

                        const langSpan = document.createElement('span');
                        langSpan.textContent = lang;

                        langDiv.appendChild(langImg);
                        langDiv.appendChild(langSpan);
                        languageContainer.appendChild(langDiv);
                    });

                    const link = document.createElement('a');
                    link.href = project.repository;
                    link.textContent = 'Ver Repositorio';
                    link.className = 'btn btn-primary';
                    link.target = '_blank';

                    cardBody.appendChild(title);
                    cardBody.appendChild(description);
                    cardBody.appendChild(languageContainer);
                    cardBody.appendChild(link);
                    card.appendChild(img);
                    card.appendChild(cardBody);
                    projectCards.appendChild(card);
                }
            };

            let startIndex = 0;
            displayProjects(startIndex);

            prevBtn.addEventListener('click', () => {
                startIndex = (startIndex - 1 + projects.length) % projects.length;
                displayProjects(startIndex);
            });

            nextBtn.addEventListener('click', () => {
                startIndex = (startIndex + 1) % projects.length;
                displayProjects(startIndex);
            });
        })
        .catch(error => console.error('Error al cargar los proyectos:', error));
});

function copyToClipboard() {
    const emailInput = document.querySelector('.email-container input[type="text"]');
    emailInput.select();
    document.execCommand('copy');
    alert('Email copiado al portapapeles');
}

function openCV() {
    window.open('Alejandro_cv.pdf', '_blank');
}

function redirectToOtherWebsite() {
    window.location.href = 'https://www.tusitioweb.com';
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:alesaba@telefonica.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0A%0ADe: ${encodeURIComponent(name)}`;
    window.location.href = mailtoLink;
});
