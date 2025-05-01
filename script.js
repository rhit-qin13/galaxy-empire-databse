function learnMore() {
    alert("Welcome to the Galactic Empire Database! Soon you can explore empires, species, and planets.");
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "password") {
        alert("Login successful! Welcome, " + username);
        window.location.href = "index.html";
    } else {
        alert("Incorrect username or password. Try again.");
    }
}

//attach backend data to frontend

if (window.location.pathname.includes("empires.html")) {
    fetch('http://localhost:3001/api/empires') 
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('empireList');
            list.innerHTML = ''; 
            if (data.length === 0) {
                const emptyItem = document.createElement('li');
                emptyItem.textContent = 'No empires found.';
                list.appendChild(emptyItem);
            }

            data.forEach(empire => {
                const item = document.createElement('div');
                item.className = 'empire-card';
                item.innerHTML = `
                    <h3>${empire.Name}</h3>
                    <p><strong>ID:</strong> ${empire.EmpireID}</p>
                    <p><strong>Founded Year:</strong> ${empire.FoundedYear}</p>
                    <p><strong>Government ID:</strong> ${empire.GovernmentID}</p>
                `;
                document.getElementById('empireList').appendChild(item);
            });
            const message = document.createElement('p');
            message.className = 'data-hint';
            message.textContent = 'Use the search bar at the top for more information.';
            list.appendChild(message);
        })
        .catch(error => {
            console.error('Error fetching empires:', error);
        });
}

if (window.location.pathname.includes("planets.html")) {
    fetch('http://localhost:3001/api/planets')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('planetList');
            list.innerHTML = '';

            data.forEach(planet => {
                const item = document.createElement('div');
                item.className = 'planet-card';
                item.innerHTML = `
                    <h3>${planet.Name}</h3>
                    <p><strong>ID:</strong> ${planet.PlanetID}</p>
                    <p><strong>Climate:</strong> ${planet.ClimateType}</p>
                    <p><strong>Population:</strong> ${planet.Population}</p>
                `;
                list.appendChild(item);
            });

            const message = document.createElement('p');
            message.className = 'data-hint';
            message.textContent = 'Use the search bar at the top for more information.';
            list.appendChild(message);
        })
        .catch(error => {
            console.error('Error fetching planets:', error);
        });
}


if (window.location.pathname.includes("species.html")) {
    fetch('http://localhost:3001/api/species')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('speciesList');
            list.innerHTML = '';

            data.forEach(species => {
                const item = document.createElement('div');
                item.className = 'species-card';
                item.innerHTML = `
                    <h3>${species.Name}</h3>
                    <p><strong>ID:</strong> ${species.SpeciesID}</p>
                    <p><strong>Description:</strong> ${species.Description}</p>
                `;
                list.appendChild(item);
            });
            const message = document.createElement('p');
            message.className = 'data-hint';
            message.textContent = 'Use the search bar at the top for more information.';
            list.appendChild(message);
        })
        .catch(error => {
            console.error('Error fetching species:', error);
        });
}

if (window.location.pathname.includes("technology.html")) {
    fetch('http://localhost:3001/api/technology')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('technologyList');
            list.innerHTML = '';

            data.forEach(tech => {
                const item = document.createElement('div');
                item.className = 'technology-card';
                item.innerHTML = `
                    <h3>${tech.Name}</h3>
                    <p><strong>ID:</strong> ${tech.TechnologyID}</p>
                    <p><strong>Description:</strong> ${tech.Description}</p>
                    <p><strong>Type:</strong> ${tech.Type}</p>   
                `;
                list.appendChild(item);
            });
            const message = document.createElement('p');
            message.className = 'data-hint';
            message.textContent = 'Use the search bar at the top for more information.';
            list.appendChild(message);
        })
        
        .catch(error => {
            console.error('Error fetching technology:', error);
        });
}

// add/updat/delete empire

function addEmpire() {
    const name = document.getElementById('empireName').value;
    const year = document.getElementById('empireYear').value;
    const govId = document.getElementById('empireGov').value;
  
    fetch('http://localhost:3001/api/admin/insertEmpire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, year, govId })
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }
  
  function deleteEmpire() {
    const id = document.getElementById('deleteEmpireId').value;
  
    fetch(`http://localhost:3001/api/admin/deleteEmpire/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }
  
  function updateEmpire() {
    const id = document.getElementById('updateEmpireId').value;
    const name = document.getElementById('updateEmpireName').value;
    const year = document.getElementById('updateEmpireYear').value;
    const govId = document.getElementById('updateEmpireGov').value;
  
    fetch('http://localhost:3001/api/admin/updateEmpire', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, year, govId })
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }

// add/updat/delete Technology

function addTechnology() {
    const name = document.getElementById('techName').value;
    const description = document.getElementById('techDesc').value;
    const type = document.getElementById('techType').value;
  
    fetch('http://localhost:3001/api/admin/insertTechnology', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, type })
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }
  
  function deleteTechnology() {
    const id = document.getElementById('deleteTechId').value;
  
    fetch(`http://localhost:3001/api/admin/deleteTechnology/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }
  
  function updateTechnology() {
    const id = document.getElementById('updateTechId').value;
    const name = document.getElementById('updateTechName').value;
    const description = document.getElementById('updateTechDesc').value;
    const type = document.getElementById('updateTechType').value;
  
    fetch('http://localhost:3001/api/admin/updateTechnology', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, description, type })
    })
    .then(res => res.text())
    .then(alert)
    .catch(err => console.error(err));
  }
  
  //search AKA filtering:

  function filterTechnology() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".technology-card");
  
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(input)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function filterSpecies() {
    const input = document.getElementById("speciesSearchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".species-card");
  
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(input)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function filterPlanet() {
    const input = document.getElementById("planetSearchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".planet-card");
  
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(input)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function filterEmpire() {
    const input = document.getElementById("empireSearchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".empire-card");
  
    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(input)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  