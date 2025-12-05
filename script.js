 
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString(); // Months are 0-indexed
    const day = today.getDate().toString();

    const filename = `events.json`;
    const container = document.getElementById('this-day-in-history');

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
            if (data.length > 0) {
                const ul = document.createElement('ul');
                data.forEach(event => {
                    const li = document.createElement('li');
                    // You might want to link the name to a profile page using event.gramps_id or a direct handle if your site supports it
                    li.textContent = event.description;
                    ul.appendChild(li);
                });
                container.innerHTML = `<h2>On ${today.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})} in Family History:</h2>`;
                container.appendChild(ul);
            } else {
                container.innerHTML = `<h2>On ${today.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})} in Family History:</h2><p>... nothing happened for deceased family members!</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching daily events:', error);
            container.innerHTML = `<h2>On ${today.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})} in Family History:</h2><p>No events found for deceased family members today.</p>`;
        });
});