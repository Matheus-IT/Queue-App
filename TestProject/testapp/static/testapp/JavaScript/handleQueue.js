export function handleDisplayQueue(queueSize, queueContainer) {
	for (let i = 0; i < queueSize; i++) {
		const person = createPerson();
		queueContainer.append(person);
	}
}

export function handleIncreaseQueue(queueContainer) {
	const person = createPerson();
	queueContainer.append(person);
}

function createPerson() {
	const person = document.createElement('img');

	person.setAttribute('src', personImgSource);
	person.classList.add('person');
	return person;
}

export function handleDecreaseQueue(queueContainer) {
	const firstPerson = queueContainer.firstElementChild;
	firstPerson.remove();
}