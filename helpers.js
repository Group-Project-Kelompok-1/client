const baseURL = 'http://localhost:3000'

function showRegister() {
	$("#register").show()
	$("#login").hide()
	$("#form_movie").hide()
	$("#main-page").hide()
}

function showLogin() {
	$("#login").show()
	$("#register").hide()
	$("#form_movie").hide()
	$("#main-page").hide()
}

function showForm() {
	$("#form_movie").show()
	$("#login").hide()
	$("#register").hide()
	$("#main-page").hide()
}

function showMainPage() {
	$("#main-page").show()
	$("#form_movie").hide()
	$("#login").hide()
	$("#register").hide()
}

function login() {
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

function register() {
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
		.done(() => {
			showLogin()
		})
		.fail(err => {
			console.log(err)
		})
}

function logout() {
	localStorage.clear()
	showLogin()
}

function fetchMovies() {
	$.ajax(`${baseURL}/movies`, {
		method: 'GET',
		headers: {
			access_token: localStorage.getItem('access_token')
		}
	})
		.done(respone => {
			$("#list-movie").empty()
			for (let i = 0; i < respone.length; i++) {
				$("#list-movie").append(`
				<div class="card col-lg-4 col-md-6 col-sm-12 mb-3 mx-4" style="width: 18rem;">
          <img class="card-img-top"
             src=${respone[i].imgUrl}
             alt="Card image cap">
          <div class="card-body">
             <h5 class="card-title">${respone[i].title} (${respone[i].rating})</h5>
            <p class="card-text">${respone[i].imdbid}</p>
            <p class="card-text">${respone[i].snack}</p>
            <p class="card-text">${respone[i].zomatoUrl}</p>
            <a href="#" class="btn btn-outline-danger" role="button">Delete</a>
          </div>
        </div>`)
			}
		})
		.fail(err => {
			console.log(err)
		})
}