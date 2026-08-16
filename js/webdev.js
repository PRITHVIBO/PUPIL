const modules = {
    html: false,
    css: false,
    javascript: false
};


/* Load saved progress */

const savedProgress =
    localStorage.getItem("pupilWebDevelopmentProgress");

if (savedProgress) {

    Object.assign(
        modules,
        JSON.parse(savedProgress)
    );

}


/* Start Course */

function startCourse() {

    document
        .getElementById("html")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* JavaScript Demo */

function runDemo() {

    const text =
        document.getElementById("demoText");

    text.textContent =
        "🎉 JavaScript is working! You just changed the webpage.";

}


/* Complete Modules */

const completeButtons =
    document.querySelectorAll(".complete-btn");


completeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const moduleName =
            button.dataset.module;

        modules[moduleName] =
            !modules[moduleName];


        localStorage.setItem(
            "pupilWebDevelopmentProgress",
            JSON.stringify(modules)
        );


        updateProgress();

    });

});


/* Update Progress */

function updateProgress() {

    const completed =
        Object.values(modules)
            .filter(Boolean)
            .length;


    const total =
        Object.keys(modules).length;


    const percentage =
        Math.round(
            (completed / total) * 100
        );


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "progressText"
    ).textContent =
        percentage + "% Completed";


    completeButtons.forEach(function (button) {

        const moduleName =
            button.dataset.module;


        if (modules[moduleName]) {

            button.textContent =
                "✓ Completed";

            button.classList.add(
                "completed"
            );

        } else {

            button.textContent =
                "Mark " +
                moduleName.toUpperCase() +
                " Complete";

            button.classList.remove(
                "completed"
            );

        }

    });

}


/* Final Project */

function startProject() {

    alert(
        "🚀 Your final project has started! Build a website using HTML, CSS and JavaScript."
    );

}


/* Initialize */

updateProgress();