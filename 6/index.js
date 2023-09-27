// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((e) => {
//         console.log(e);
//     })


// function createPost({ title, body }) {

//     fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         body: JSON.stringify({
//             title,
//             body,
//         }),
//         headers: {
//             'Content-Type': "application/json",
//             token: "Abc123",
//         },
//     })
//         .then((res) => res.json())
//         .then((data) => console.log(data));
// }

// createPost({ title: "Post one", body: "This is post one" });

// -----> Todos


// const url = "https://jsonplaceholder.typicode.com/todos";

// const getTodo = () => {
//     fetch(url + "?_limit=5")
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return res.json();
//         })
//         .then((data) => {
//             data.forEach((todo) => {
//                 AddToDom(todo);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching todos:", error);
//         });
// };

// const AddToDom = (todo) => {
//     const div = document.createElement("div");
//     div.appendChild(document.createTextNode(todo.title));
//     div.setAttribute('data-id', todo.id);

//     if (todo.completed) {
//         div.classList.add("done");
//     }
//     document.querySelector("#todo-list").appendChild(div);
// };

// const createTodo = (e) => {
//     e.preventDefault();

//     const newTodo = {
//         title: e.target.firstElementChild.value,
//         completed: false,
//     };

//     fetch(url, {
//         method: "POST",
//         body: JSON.stringify(newTodo),
//         headers: {
//             "Content-Type": "application/json",
//             "token": "abc123",
//         },
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return res.json();
//         })
//         .then((data) => {
//             AddToDom(data);
//             e.target.firstElementChild.value = "";
//         })
//         .catch((error) => {
//             console.error("Error creating todo:", error);
//         });
// };

// const init = () => {
//     document.addEventListener("DOMContentLoaded", getTodo);
//     document.querySelector("#todo-form").addEventListener("submit", createTodo);
// };

// init();

const url = "https://jsonplaceholder.typicode.com/todos";

// Read
const getTodo = () => {

    fetch(url + "?_limit=5")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((todo) => {
                AddToDom(todo)
            })
        })
}

const AddToDom = (todo) => {

    const div = document.createElement("div");
    div.appendChild(document.createTextNode(todo.title));
    div.classList.add("todo");
    div.setAttribute('data-id', todo.id);

    if (todo.completed) {
        div.classList.add("done");
    }

    document.querySelector("#todo-list").appendChild(div);
}

// Add
const createTodo = (e) => {

    e.preventDefault();

    if (e.target.firstElementChild.value == "") {
        alert("Add item in todo");
        return;
    }

    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false,
    };


    fetch(url, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            "Content-Type": "application/json",
            "token": "abc123",
        }
    })
        .then((res) => res.json())
        .then((data) => {
            AddToDom(data);
            e.target.firstElementChild.value = "";
        })
}

const ToggleCompleted = (e) => {

    if (e.target.classList.contains("todo")) {
        e.target.classList.toggle("done");
    }

    UpdateTodo(e.target.dataset.id, e.target.classList.contains("done"));
}

// Update
const UpdateTodo = (id, completed) => {
    fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
        headers: {
            "Content-Type": "application/json",
            "token": "Update123",
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

// Delete
const DeleteTodo = (e) => {
    if (e.target.classList.contains("todo")) {
        const id = e.target.dataset.id;
        fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "token": "Delete123"
            }
        })
            .then(() => e.target.remove())
            .catch(error => console.error("Error deleting todo:", error));
    }
}


const init = () => {

    document.addEventListener("DOMContentLoaded", getTodo);
    document.querySelector("#todo-form").addEventListener("submit", createTodo);
    document.querySelector("#todo-list").addEventListener("click", ToggleCompleted);
    document.querySelector("#todo-list").addEventListener("dblclick", DeleteTodo);
}

init();