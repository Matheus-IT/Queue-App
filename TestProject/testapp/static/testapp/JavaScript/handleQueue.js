export function handleDisplayQueue(queueSize, queueContainer) {
	for (let i = 0; i < queueSize; i++) {
		const person = createPerson();
		queueContainer.append(person);
	}
}

export function handleIncreaseQueue(queueContainer) {
	const person = createPersonWalking();
	queueContainer.append(person);

	person.onanimationend = function() {
		this.setAttribute('src', personImgSource);
	}
}

function createPersonWalking() {
	const personWalking = document.createElement('img');

	personWalking.setAttribute('src', personWalkingSource);
	personWalking.classList.add('personWalking');
	return personWalking;
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