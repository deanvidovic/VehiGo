"use script";

const deleteBtns = document.querySelectorAll("ion-icon");
const filterDeleteBtns = Array.from(deleteBtns);


filterDeleteBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const endpoint = `/reservation/${btn.dataset.doc}`;
        const id = btn.dataset.doc;
        console.log(id);

        fetch(endpoint, {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch(err => console.log(err));
    })
});