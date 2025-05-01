// API URL'leri
const API_URL = "https://api.example.com"; // Gerçek API URL'nizi buraya yazın

// Film ve Yönetmen Listelerini Getir
async function fetchData(endpoint, elementId) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        const data = await response.json();
        const listElement = document.getElementById(elementId);
        listElement.innerHTML = ""; // Temizle
        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = endpoint === "movies" ? `${item.title} - ${item.director}` : item.name;
            listElement.appendChild(li);
        });
    } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
    }
}

// Film Ekle
async function addMovie(event) {
    event.preventDefault();
    const title = document.getElementById("movie-title").value;
    const director = document.getElementById("movie-director").value;

    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, director }),
        });
        if (response.ok) {
            alert("Film başarıyla eklendi!");
            fetchData("movies", "movie-list");
        }
    } catch (error) {
        console.error("Film eklenirken hata oluştu:", error);
    }
}

// Yönetmen Ekle
async function addDirector(event) {
    event.preventDefault();
    const name = document.getElementById("director-name").value;

    try {
        const response = await fetch(`${API_URL}/directors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (response.ok) {
            alert("Yönetmen başarıyla eklendi!");
            fetchData("directors", "director-list");
        }
    } catch (error) {
        console.error("Yönetmen eklenirken hata oluştu:", error);
    }
}

// Sayfa Yüklendiğinde Veri Getir
document.addEventListener("DOMContentLoaded", () => {
    fetchData("movies", "movie-list");
    fetchData("directors", "director-list");

    document.getElementById("add-movie-form").addEventListener("submit", addMovie);
    document.getElementById("add-director-form").addEventListener("submit", addDirector);
});
