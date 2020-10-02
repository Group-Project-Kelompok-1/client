$(document).ready(function () {
    if (localStorage.getItem('access_token')) {
        fetchMovies()
        showMainPage()
    } else {
        showLogin()
    }


    $("#login").on("submit", function (event) {
        event.preventDefault()
        login()
    })
    
    $("#register").on("submit", function (event) {
        event.preventDefault()
        register()
    })
    
    $("#reg-form").on('click', () => {
        showRegister()
    })
    
    $("#login-form").on('click', () => {
        showLogin()
    })
    
    $("#to-form").on('click', () => {
        showForm()
    })
    
    $("#logout").on('click', () => {
        logout()
    })
    
    $("#recommend").on("click", () => {
        getRecommend()
    })
    
})

