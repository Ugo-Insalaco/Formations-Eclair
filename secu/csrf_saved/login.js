const login = function(e){
    $.ajax({
        method:'GET',
        url: '/login',
        success: function(res){
            localStorage.setItem("csrf", res)
            $("#log_response").html("l'utilisateur est bien loggé")
        },
        error: function(err){
            $("#log_response").html("l'utilisateur n'a pas pu être loggé")
        }
    })
    
}

const logout = function(e){
    $.ajax({
        method: 'GET',
        url: '/logout',
        success: function(res){
            localStorage.removeItem("csrf")
            $("#log_response").html("vous avez bien été logout")
        },
        error: function(err){
            $("#log_response").html("vous n'avez pas pu être logout")
        }
    })
}
$("#login").on("click", login)
$("#logout").on("click", logout)