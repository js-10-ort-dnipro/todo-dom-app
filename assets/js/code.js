	
	let records = [];
	
	function muteEvent(){
		let recordId = +this.getAttribute('data-id');
		
		let record = records.find(item => item.id === recordId);

		record.muted = !record.muted;
		
		draw();
	}
	
	function deleteEvent(){
		
		if(!confirm('Are you sure?')) return;
	
		let recordId = +this.getAttribute('data-id');

		records = records.filter(item => item.id !== recordId);

		draw();
	}
	
	function draw(){

		let recordsPlace = document.querySelector('.records');
		
		recordsPlace.innerHTML = records.map(item => `
			<h4 class="my-3 p-2 ${item.muted ? 'text-muted' : ''}" data-id='${item.id}'>
				# ${item.text}
			</h4>
		`).join('');
		
		for(let tag of recordsPlace.querySelectorAll('h4')){
			tag.addEventListener('click', muteEvent);
			tag.addEventListener('dblclick', deleteEvent);
		};
		
		localStorage.setItem('records', JSON.stringify(records));
	}

	document.addEventListener('DOMContentLoaded', function(){
		
		let loadedRecords = localStorage.getItem('records');
			
		if(loadedRecords){

			records = JSON.parse(loadedRecords);

			draw();
			
		}
		
		document.getElementById('addButton').addEventListener('click', function(){
			
			if(!recordText.value.trim()) return;
			
			let nextId = records.length ? Math.max(...records.map(item => item.id)) + 1 : 1;

			let newRecord = {
				text: recordText.value.trim(),
				muted: false,
				id: nextId
			}

			records.unshift(newRecord);
			
			draw();
			
			recordText.value = '';	
			
		});			
	});