function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        executeCommand();
    }
}

function executeCommand() {
    var userInput = document.getElementById("user_input").value;

    var existingOutputContainer = document.getElementById("output_container");

    if (existingOutputContainer) {
        existingOutputContainer.parentNode.removeChild(existingOutputContainer);
    }

    if (userInput.trim().toLowerCase() === "whoami" || userInput.trim().toLowerCase() === "aboutme") {
        var message = "I am a self-taught developer from Istanbul/Turkey, currently pursuing my high school education. My passion lies in various realms of Cyber Security and electronics. Admittedly, I am quite enthusiastic about my interests and would consider myself a bit of a nerd. Continual learning is something I deeply enjoy, and I am always striving to enhance my skills. Whether it's crafting tools, engaging in CTF challenges, delving into documentation, or exploring both Blue Team and Red Team concepts, I find joy in every aspect of my journey.";

        var newOutputContainer = document.createElement("div");
        newOutputContainer.className = "output";
        newOutputContainer.id = "output_container";
        for (var i = 0; i < message.length; i++) {
            (function (index) {
                setTimeout(function () {
                    var charSpan = document.createElement("span");
                    charSpan.textContent = message[index];
                    newOutputContainer.appendChild(charSpan);

                    newOutputContainer.scrollTop = newOutputContainer.scrollHeight;
                }, i * 50);
            })(i);
        }

        document.body.appendChild(newOutputContainer);
    }
    else if (userInput.trim().toLowerCase() === "help" || userInput.trim().toLowerCase() === "--help") {
        var commands = [
            "help/--help : Display Help message.",
            "whoami/aboutme : Display Resume/Personal statement message.",
            "projects/./projects.sh : Displays Projects.",
            "contacts/service apache2 start : Display Contacts."
        ];

        var newOutputContainer = document.createElement("div");
        newOutputContainer.className = "output";
        newOutputContainer.id = "output_container";

        var index = 0;

        function displayCommand() {
            if (index < commands.length) {
                var commandLine = document.createElement("div");
                commandLine.textContent = commands[index];
                newOutputContainer.appendChild(commandLine);

                newOutputContainer.scrollTop = newOutputContainer.scrollHeight;
                index++;

                setTimeout(displayCommand, 1000);
            }
        }

        displayCommand();

        document.body.appendChild(newOutputContainer);
    }
    else if (userInput.trim().toLowerCase() === "contacts" || userInput.trim().toLowerCase() === "service apache2 start") {
        var commands = [
            "<a class='linkedin-link' href='https://www.linkedin.com/in/o%C4%9Fuzhan-bayarslan-0b307b279/' target='_blank'>LinkedIn</a>",
            "<a class='discord-link' href='https://discord.com/users/752599585918025848' target='_blank'>Discord</a>",
            "<a class='instagram-link' href='mailto:oguzhanbayarslan@gmail.com' target='_blank'>E-mail</a>",
            "<a class='github-link' href='https://github.com/0giv' target='_blank'>GitHub</a>",
            "<a class='tryhackme-link' href='https://tryhackme.com/p/0giv' target='_blank'>TryHackMe</a>"
        ];

        var newOutputContainer = document.createElement("div");
        newOutputContainer.className = "output";
        newOutputContainer.id = "output_container";

        var index = 0;

        function displayCommand() {
            if (index < commands.length) {
                var commandLine = document.createElement("div");
                commandLine.innerHTML = commands[index];
                newOutputContainer.appendChild(commandLine);

                newOutputContainer.scrollTop = newOutputContainer.scrollHeight;
                index++;

                setTimeout(displayCommand, 1000);
            }
        }

        displayCommand();

        document.body.appendChild(newOutputContainer);
    }



    else if (userInput.trim().toLowerCase() === "projects" || userInput.trim().toLowerCase() === "./projects.sh") {
        const username = '0giv';

        async function getTopProjects() {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
            const data = await response.json();
            return data;
        }
        var newOutputContainer = document.createElement("div");
        newOutputContainer.className = "output";
        newOutputContainer.id = "output_container";

        async function showTopProjects() {
            try {
                const topProjects = await getTopProjects();
                const topProjectsList = document.createElement('ul');
                topProjectsList.id = 'projects';

                topProjects.forEach((project, index) => {
                    setTimeout(() => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = project.html_url;
                        a.textContent = project.name;

                        
                        a.style.textDecoration = 'none'; 
                        a.style.color = 'purple'; 

                        const details = document.createElement('div');
                        details.classList.add('project-details');

                        const starIcon = document.createElement('span');
                        starIcon.classList.add('star-icon');
                        starIcon.textContent = project.stargazers_count + ' ★ ';

                        const forkIcon = document.createElement('span');
                        forkIcon.classList.add('fork-icon');
                        forkIcon.textContent = ' Fork: ' + project.forks_count;

                        details.appendChild(starIcon);
                        details.appendChild(forkIcon);

                        li.appendChild(a);
                        li.appendChild(details);

                        
                        li.style.marginBottom = '10px';

                        topProjectsList.appendChild(li);

                        
                        newOutputContainer.scrollTop = newOutputContainer.scrollHeight;
                    }, index * 1000); 
                });

                newOutputContainer.appendChild(topProjectsList);

                document.body.appendChild(newOutputContainer);
            } catch (error) {
                console.error("Error fetching and displaying top projects:", error);
            }
        }

        showTopProjects();
    }

    else {
        var command = document.getElementById("user_input").value
        var message = "Wrong Command (" + command + ") 'help' for Command List.";

        var newOutputContainer = document.createElement("div");
        newOutputContainer.className = "output";
        newOutputContainer.id = "output_container";
        for (var i = 0; i < message.length; i++) {
            (function (index) {
                setTimeout(function () {
                    var charSpan = document.createElement("span");
                    charSpan.textContent = message[index];
                    newOutputContainer.appendChild(charSpan);

                    newOutputContainer.scrollTop = newOutputContainer.scrollHeight;
                }, i * 50);
            })(i);
        }

        document.body.appendChild(newOutputContainer);
    }


    document.getElementById("user_input").value = "";
}
