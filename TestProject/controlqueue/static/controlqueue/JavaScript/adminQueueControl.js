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

	const queueDomObject = document.querySelector('#displayQueueSize');
	let queueSize;

	let socket;
	socketClose();

	function socketOpen(event) {
		console.log('WebSocket connection open!');
	}

	function socketMessage(event) {
		/**
		 * When it first connects to the websocket server it's going to
		 * receive and update the queue size
		 */
		const data = JSON.parse(event.data);
		console.log(data);
		queueSize = data.queueSize;
		updateQueueSize(data.queueSize, queueDomObject);
	}

	function socketClose(event) {
		/**
		 * Connects to the server, such that when the connection is lost it tries
		 * to reconnect to the websocket server
		 */
		const WEBSOCKET_QUEUE_URL = `ws://${window.location.host}/ws/queue/`;
		socket = new WebSocket(WEBSOCKET_QUEUE_URL);

		socket.onopen = socketOpen;
		socket.onmessage = socketMessage;
		socket.onclose = socketClose;
		socket.onerror = socketError;
	}

	function socketError(event) {
		console.log("WebSocket Error: " + JSON.stringify(event));
	}

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
