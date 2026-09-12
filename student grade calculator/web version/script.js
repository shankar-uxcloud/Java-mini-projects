const subjectCountInput =
    document.getElementById("subjectCount");

const createSubjectsButton =
    document.getElementById("createSubjects");

const marksSection =
    document.getElementById("marksSection");

const marksContainer =
    document.getElementById("marksContainer");

const calculateButton =
    document.getElementById("calculateButton");

const resultSection =
    document.getElementById("resultSection");

const totalMarksDisplay =
    document.getElementById("totalMarks");

const averageDisplay =
    document.getElementById("average");

const gradeDisplay =
    document.getElementById("grade");

const gradeBadge =
    document.getElementById("gradeBadge");

const resetButton =
    document.getElementById("resetButton");

const message =
    document.getElementById("message");

const subjectCounter =
    document.getElementById("subjectCounter");

const performanceContainer =
    document.getElementById("performanceContainer");

const resultMessage =
    document.getElementById("resultMessage");


// ========================================
// CREATE SUBJECTS
// ========================================

function createSubjects() {

    const numberOfSubjects =
        Number(subjectCountInput.value);


    // Validate number of subjects

    if (
        !Number.isInteger(numberOfSubjects) ||
        numberOfSubjects < 1 ||
        numberOfSubjects > 20
    ) {

        message.textContent =
            "⚠️ Please enter between 1 and 20 subjects.";

        subjectCountInput.focus();

        return;
    }


    // Clear old inputs

    marksContainer.innerHTML = "";


    // Create subject inputs

    for (
        let i = 1;
        i <= numberOfSubjects;
        i++
    ) {

        const subjectBox =
            document.createElement("div");

        subjectBox.className =
            "subject-box";


        const subjectTop =
            document.createElement("div");

        subjectTop.className =
            "subject-top";


        const label =
            document.createElement("label");

        label.className =
            "subject-label";

        label.textContent =
            `Subject ${i}`;


        const number =
            document.createElement("span");

        number.className =
            "subject-number";

        number.textContent =
            `#${String(i).padStart(2, "0")}`;


        subjectTop.appendChild(label);

        subjectTop.appendChild(number);


        const input =
            document.createElement("input");

        input.type = "number";

        input.className =
            "mark-input";

        input.min = "0";

        input.max = "100";

        input.placeholder =
            "Enter marks";

        input.setAttribute(
            "aria-label",
            `Marks for Subject ${i}`
        );


        // Remove invalid style when typing

        input.addEventListener(
            "input",
            () => {

                input.classList.remove(
                    "invalid"
                );

                message.textContent = "";

            }
        );


        subjectBox.appendChild(subjectTop);

        subjectBox.appendChild(input);

        marksContainer.appendChild(subjectBox);

    }


    subjectCounter.textContent =
        `${numberOfSubjects} ${
            numberOfSubjects === 1
                ? "Subject"
                : "Subjects"
        }`;


    marksSection.classList.remove(
        "hidden"
    );

    resultSection.classList.add(
        "hidden"
    );


    message.textContent =
        "Enter marks between 0 and 100.";


    // Focus first mark input

    const firstInput =
        marksContainer.querySelector("input");

    if (firstInput) {

        firstInput.focus();
    }


    // Scroll smoothly

    marksSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ========================================
// CALCULATE RESULT
// ========================================

function calculateResult() {

    const markInputs =
        marksContainer.querySelectorAll(
            ".mark-input"
        );


    if (markInputs.length === 0) {

        message.textContent =
            "⚠️ Please create your subjects first.";

        return;
    }


    let total = 0;

    let hasError = false;


    // Validate marks

    markInputs.forEach((input) => {

        const mark =
            Number(input.value);


        if (
            input.value === "" ||
            !Number.isFinite(mark) ||
            mark < 0 ||
            mark > 100
        ) {

            input.classList.add(
                "invalid"
            );

            hasError = true;

        }
        else {

            input.classList.remove(
                "invalid"
            );

            total += mark;

        }

    });


    if (hasError) {

        message.textContent =
            "⚠️ Please enter valid marks between 0 and 100.";

        return;
    }


    // Calculate average

    const average =
        total / markInputs.length;


    // Determine grade

    let grade;

    if (average >= 90) {

        grade = "A";

    }
    else if (average >= 75) {

        grade = "B";

    }
    else if (average >= 50) {

        grade = "C";

    }
    else {

        grade = "Fail";

    }


    // Display main result

    totalMarksDisplay.textContent =
        `${total}`;

    averageDisplay.textContent =
        `${average.toFixed(2)}%`;

    gradeDisplay.textContent =
        grade;

    gradeBadge.textContent =
        grade;


    // Grade badge styling

    gradeBadge.style.background =
        getGradeBackground(grade);


    // Create performance bars

    createPerformanceBars(
        markInputs
    );


    // Result message

    resultMessage.textContent =
        getResultMessage(
            grade,
            average
        );


    // Show result

    resultSection.classList.remove(
        "hidden"
    );

    message.textContent = "";


    // Scroll to result

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


// ========================================
// PERFORMANCE BARS
// ========================================

function createPerformanceBars(
    markInputs
) {

    performanceContainer.innerHTML = "";


    markInputs.forEach(
        (input, index) => {

            const mark =
                Number(input.value);


            const row =
                document.createElement("div");

            row.className =
                "performance-row";


            const info =
                document.createElement("div");

            info.className =
                "performance-info";


            const subject =
                document.createElement("span");

            subject.textContent =
                `Subject ${index + 1}`;


            const value =
                document.createElement("span");

            value.textContent =
                `${mark}/100`;


            info.appendChild(subject);

            info.appendChild(value);


            const track =
                document.createElement("div");

            track.className =
                "progress-track";


            const bar =
                document.createElement("div");

            bar.className =
                "progress-bar";

            bar.style.width =
                `${mark}%`;


            track.appendChild(bar);

            row.appendChild(info);

            row.appendChild(track);

            performanceContainer.appendChild(
                row
            );

        }
    );

}


// ========================================
// GRADE BACKGROUND
// ========================================

function getGradeBackground(
    grade
) {

    if (grade === "A") {

        return "linear-gradient(135deg, #f59e0b, #d97706)";

    }

    if (grade === "B") {

        return "linear-gradient(135deg, #10b981, #059669)";

    }

    if (grade === "C") {

        return "linear-gradient(135deg, #3b82f6, #2563eb)";

    }

    return "linear-gradient(135deg, #ef4444, #dc2626)";
}


// ========================================
// RESULT MESSAGE
// ========================================

function getResultMessage(
    grade,
    average
) {

    if (grade === "A") {

        return `🏆 Excellent performance! You scored ${average.toFixed(2)}%. Keep up the outstanding work!`;

    }

    if (grade === "B") {

        return `👏 Great job! You scored ${average.toFixed(2)}%. You're doing really well!`;

    }

    if (grade === "C") {

        return `👍 Good effort! You scored ${average.toFixed(2)}%. Keep practicing to improve further.`;

    }

    return `📚 You scored ${average.toFixed(2)}%. Keep working hard and you can improve your result!`;
}


// ========================================
// RESET
// ========================================

function resetCalculator() {

    subjectCountInput.value = "";

    marksContainer.innerHTML = "";

    marksSection.classList.add(
        "hidden"
    );

    resultSection.classList.add(
        "hidden"
    );

    totalMarksDisplay.textContent =
        "0";

    averageDisplay.textContent =
        "0%";

    gradeDisplay.textContent =
        "-";

    gradeBadge.textContent =
        "A";

    performanceContainer.innerHTML =
        "";

    resultMessage.textContent =
        "";

    message.textContent =
        "";

    subjectCounter.textContent =
        "0 Subjects";


    subjectCountInput.focus();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// BUTTON EVENTS
// ========================================

createSubjectsButton.addEventListener(
    "click",
    createSubjects
);


calculateButton.addEventListener(
    "click",
    calculateResult
);


resetButton.addEventListener(
    "click",
    resetCalculator
);


// ========================================
// ENTER KEY SUPPORT
// ========================================

subjectCountInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            createSubjects();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            document.activeElement.classList.contains(
                "mark-input"
            )
        ) {

            calculateResult();

        }

    }
);