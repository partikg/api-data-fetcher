async function fetchdata() {
    try {
        const response = await fetch('/api/view');
        const result = await response.json();
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = '';
        result.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
            `;
            tbody.appendChild(row);
        });
    }
    catch (error) {
        console.error('error in fetching data', error);
    }
}