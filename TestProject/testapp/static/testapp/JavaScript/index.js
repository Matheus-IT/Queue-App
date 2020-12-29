import * as handleQueue from './handleQueue.js';


document.addEventListener('DOMContentLoaded', function() {
	const roomName = document.getElementById('room-name').innerText;
	const socket = new WebSocket(`ws://${window.location.host}/ws/queue/${roomName}/`);
	const queueContainer = document.querySelector('#queueContainer');

	socket.onopen = function(event) {
		console.log('WebSocket is open now');
	};
	
	socket.onmessage = function(event) {
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
	};
	
	socket.onerror = function(event) {
		console.error(`WebSocket error observed: ${event}`);
	}
});