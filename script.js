 
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString(); // Months are 0-indexed
    const day = today.getDate().toString();

    const filename = `events.json`;
    const container = document.getElementById('this-day-in-history');
	const date = document.getElementById("tdih-date")
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No events found for today.');
                }
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
		.then(data => data[month][day])
        .then(data => {
			date.innerHTML = today.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})
			// debugger;
            if (data.length > 0) {
                const ul = document.createElement('ul');
                data.forEach(event => {
                    const li = document.createElement('li');
                    // You might want to link the name to a profile page using event.gramps_id or a direct handle if your site supports it
                    li.textContent = event.description;
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            } else {
				const p = document.createElement("p")
				p.appendChild(document.createTextNode("... nothing happened for family members!"))
                container.appendChild(p)
            }
        })
        .catch(error => {
            console.error('Error fetching daily events:', error);
			date.innerHTML = today.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})
			const p = document.createElement("p")
			p.appendChild(document.createTextNode("No events found for family members today."))
			container.appendChild(p)
        });
});