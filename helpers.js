const baseURL = 'http://localhost:3000'

function showRegister () {
    $("#register").show()
    $("#login").hide()
    $("#form_movie").hide()
    $("#main-page").hide()
}

function showLogin () {
    $("#login").show()
    $("#register").hide()
    $("#form_movie").hide()
    $("#main-page").hide()
}

function showForm () {
    $("#form_movie").show()
    $("#login").hide()
    $("#register").hide()
    $("#main-page").hide()
}

function showMainPage () {
    $("#main-page").show()
    $("#form_movie").hide()
    $("#login").hide()
    $("#register").hide()
}

function login () {
    const email = $("#email").val()
    const password = $("#password").val()
    // request server
    $.ajax({
        method: 'POST',
        url: `${baseURL}/login`,
        data: {
            email,
            password
        }
    })
    .done(respone => {
        localStorage.setItem("access_token", respone.access_token)
        showMainPage()
    })
    .fail(err => {
        console.log(err)
    })
}

function register () {
    const email = $("#email-reg").val()
    const password = $("#password-reg").val()
    // request server
    $.ajax({
        method: 'POST',
        url: `${baseURL}/register`,
        data: {
            email,
            password
        }
    })
    .done(respone => {
        showLogin()
    })
    .fail(err => {
        console.log(err)
    })
}

function logout () {
    localStorage.clear()
    showLogin()
}

function deleteTodo (id) {
    $.ajax(`${baseURL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(respone => {
        fetchTodos()
    })
    .fail(err => {
        console.log(err)
    })
}

function fetchTodos () {
    $.ajax(`${baseURL}/todos`, {
        method: 'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(respone => {
        $("#list-todo").empty()
        for (let i = 0; i < respone.length; i ++) {
            $("#list-todo").append(`<div class="card col-4">
                <div class="card-body">
                    <h5 class="card-title">${respone[i].title}</h5>
                    <p class="card-text">${respone[i].description}</p>
                    <p class="card-text">${respone[i].status}</p>
                    <p class="card-text">${respone[i].due_date}</p>
                    <button class="btn-warning" onclick="deleteTodo(${respone[i].id})">Delete</button>
                </div>
            </div>`)
        }
    })
    .fail(err => {
        console.log(err)
    })
}