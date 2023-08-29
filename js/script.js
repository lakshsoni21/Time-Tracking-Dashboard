
const gridContainer = document.querySelector('.grid');
const gridItems = document.querySelectorAll(".grid .grid-item");

function fetchData(eventId){
    fetch('/data.json')
    .then((response) => {
        return response.json();
    }).then((data) => {
    
        gridItems.forEach((item, i) => {
    
            var title = document.querySelector(`#${item.id} .header`);
            var content = document.querySelector(`#${item.id} .text`);

            const currentHours = data[i].timeframes[eventId].current;
            const previousHours = data[i].timeframes[eventId].previous;
    
            title.innerHTML = `<h3>${data[i].title}</h3> 
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>`;

            var mainCardBottom;
            if(eventId == 'weekly'){
                mainCardBottom = 'Week'
            } else if(eventId == 'monthly'){
                mainCardBottom = 'Month'
            } else{
                mainCardBottom = 'Day';
            }
            content.innerHTML = `<h1>${currentHours}hrs</h1>
            <p>Last ${mainCardBottom} ${previousHours}hrs</p>`;
          });
    
    
    }).catch(error => console.error("Error fetching JSON data:", error));
}

// When the page reload click on the link daily
document.addEventListener('DOMContentLoaded', function() {
    const link = document.getElementById('daily');
    link.click(); // Trigger the click event
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event){

        // This will prevent us to not to navigate to the link that is mentioned in href of anchor tag
        var eventId = link.id; // Get the ID from the clicked link
        if(eventId != ''){
            event.preventDefault();
            fetchData(eventId);
        }

    });
});

