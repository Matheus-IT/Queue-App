document.addEventListener('DOMContentLoaded', function() {
	const buttonIncrease = document.querySelector('#increase');
	buttonIncrease.onclick = function() {
		try {
			handleIncreaseQueueSize();
		} catch(err) {
			console.log(err);
		}
	}

	const buttonDecrease = document.querySelector('#decrease');
	buttonDecrease.onclick = function() {
		try {
			handleDecreaseQueueSize();
		} catch(err) {
			console.log(err);
		}
	}

	const socket = new WebSocket(`ws://${window.location.host}/ws/queue/`);
	const queueDomObject = document.querySelector('#displayQueueSize');
	let queueSize;
	
	socket.onmessage = function(event) {
		/* When it first connects to the websocket server it's going to
		receive and update the queue size */
		const data = JSON.parse(event.data);
		console.log(data);
		queueSize = data.queueSize;
		updateQueueSize(data.queueSize, queueDomObject);
	};

	// I ALSO NEED A WAY TO DELETE THE QUEUE

	function handleIncreaseQueueSize() {
		queueSize++;

		updateQueueSize(queueSize, queueDomObject);
		communicateToWebsocketServer(queueSize);
	}

	function handleDecreaseQueueSize() {
		if (queueSize > 0) {
			queueSize--;

			updateQueueSize(queueSize, queueDomObject);
			communicateToWebsocketServer(queueSize);
		}
	}

	function updateQueueSize(newQueueSize, queueDomObj) {
		queueDomObj.innerHTML = newQueueSize;
	}

	function communicateToWebsocketServer(newQueueSize) {
		socket.send(JSON.stringify({
			queue_size: newQueueSize,
		}));
	}
});
