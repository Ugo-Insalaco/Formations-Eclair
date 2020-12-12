function faire_virement(e){
    $.ajax({
        method: 'GET',
        url: '/virement/1/2',
        headers: 
        {
            'X-csrf-token':localStorage.getItem('csrf')
        },
        success: function(res){
            console.log(res)
        },
        error: function(err){
            console.log("le virement n'a pas été effectué")
        }
    })
}

$("#virement").on("click", faire_virement)