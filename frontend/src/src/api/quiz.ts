async function fetchQuestions(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/questions'); // Fetch questions from the backend
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const questions: Question[] = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        const questionsContainer = document.getElementById('questions') as HTMLElement;
        questionsContainer.innerHTML = '<p class="text-danger">Error loading questions. Please try again later.</p>';
    }
}

interface Question {
    id: number;
    content: string;
    options: string[];
}

function displayQuestions(questions: Question[]): void {
    const questionsContainer = document.getElementById('questions') as HTMLElement;
    questionsContainer.innerHTML = ''; // Clear previous questions

    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'border rounded p-3 mb-3 bg-light';

        const questionText = document.createElement('p');
        questionText.className = 'question text-black';
        questionText.innerText = `${question.id}. ${question.content}`;

        const choicesDiv = document.createElement('div');
        choicesDiv.className = 'choices d-flex flex-column mt-2';

        question.options.forEach(option => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice-style text-center rounded shadow-lg p-3 mb-2';
            choiceDiv.innerText = option;
            choicesDiv.appendChild(choiceDiv);
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(choicesDiv);
        questionsContainer.appendChild(questionDiv);
    });
}

// Fetch questions on page load
fetchQuestions();