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
		this.setAttribute('src', personWaitingSource);
	};
}

function createPersonWalking() {
	const personWalking = document.createElement('img');

	personWalking.setAttribute('src', personWalkingSource);
	personWalking.className = 'person';
	personWalking.classList.add('personArrivingWalking');
	return personWalking;
}

function createPerson() {
	const person = document.createElement('img');

	person.setAttribute('src', personWaitingSource);
	person.classList.add('person');
	return person;
}

export function handleDecreaseQueue(queueContainer) {
	const people = queueContainer.children;

	Array.from(people).forEach(person => {
		person.setAttribute('src', personWalkingSource);
	});

	const firstPerson = queueContainer.firstElementChild;
	firstPerson.classList.add('personWalkingAway');
	firstPerson.onanimationend = function() {
		firstPerson.remove();

		Array.from(people).forEach(person => {
			person.setAttribute('src', personWaitingSource);
		});
	};
}