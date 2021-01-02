import * as handleQueue from './handleQueue.js';


document.addEventListener('DOMContentLoaded', function() {
	const roomName = document.getElementById('room-name').innerText;
	const queueContainer = document.querySelector('#queueContainer');
	
	let socket;
	handleSocketClose();

	function handleSocketClose(event) {
		/**
		 * Connects to the websocket server, tries to reconnect if the connection is lost
		 */
		socket = new WebSocket(`ws://${window.location.host}/ws/queue/${roomName}/`);

		socket.onopen = handleSocketOpen;
		socket.onmessage = handleSocketMessage;
		socket.onerror = handleSocketError;
		socket.onclose = handleSocketClose;
	}

	function handleSocketOpen(event) {
		console.log('WebSocket is open now');
	}

	function handleSocketMessage(event) {
		const data = JSON.parse(event.data);

		console.log(data);

		/* When fist establish the connection with the websocket server
		it's gonna receive the queue size */
		if (data.queueSize) {
			handleQueue.handleDisplayQueue(data.queueSize, queueContainer);
		} else {
			/* During the connection, the superuser controlling the queue size
			may have increased or decreased the queue */
			if (data.hasTheQueueIncreased)
				handleQueue.handleIncreaseQueue(queueContainer);
			else
				handleQueue.handleDecreaseQueue(queueContainer);
		}
	}

	function handleSocketError(event) {
		console.error(`WebSocket error observed: ${event}`);
	}
});