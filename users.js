//  https://api.jquery.com/Jquery.ajax/

$(() => {

    
    const URL_TAREAS = "./JSON/tareas.json";

    $(".api").prepend('<button id="get" class="btn-task btn-light m-2">Mostrar las 10 tareas mas realizadas en el 2021</button>');
    $("#get").click((e) => {
        e.preventDefault();
        $(".tareasMasRealizadas").empty()
        $(".tareasMasRealizadas").toggle()
       

        $.ajax({
            method: "GET",
            url: URL_TAREAS,
            success: function (res) {
                for (const { id, title} of res) {
                    $(".tareasMasRealizadas").append(`
                    <div class="task">
                                <div class="cointainer-fluid">
                                    <div class="card">
                                        <h3 style="color:white">${id}</h3>
                                        <p style="color:black"><span>Descripción</span>: ${title} </p>
                                    </div>
                                </div>
                    </div>`);
                }
            }
        });
    });
})


