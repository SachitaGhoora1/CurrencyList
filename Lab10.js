// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the button
    document.getElementById("loadData").addEventListener("click", fetchDataUsingXHR);
});

// Function to fetch data using XMLHttpRequest
function fetchDataUsingXHR() {
    console.log("Fetching data using XMLHttpRequest...");

    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: GET-request for the API URL
    xhr.open("GET", "https://api.coinbase.com/v2/currencies", true);

    // Set up event listener for when request is completed
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log("Response received:", xhr.responseText);
            let data = JSON.parse(xhr.responseText);
            displayData(data);
        } else {
            console.error("Request failed. Status:", xhr.status);
            alert("Failed to load data. Please try again.");
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        console.error("Network error occurred.");
        alert("Network error. Check your internet connection.");
    };

    // Send the request
    xhr.send();
}

// Function to display fetched data in the table
function displayData(data) {
    const table = document.getElementById("outputTable");
    table.innerHTML = ""; // Clear existing data

    data.data.forEach(currency => {
        const row = `<tr>
                        <td>${currency.id}</td>
                        <td>${currency.name}</td>
                     </tr>`;
        table.innerHTML += row;
    });
}

