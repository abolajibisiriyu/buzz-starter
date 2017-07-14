$(function() {

    var socket = io.connect('http://localhost:9999');

    socket.on('message', function(message) {
        postBuzz(message);
    });

});

function postBuzz(buzzObj) {

    if (buzzObj === null) return;
    // console.log(buzzObj);
    if (buzzObj.constructor === Array) {
        buzzObj.forEach(function(buzz) {
            generateBuzz(buzz);
        });
    } else {
        generateBuzz(buzzObj);
    }
}

function generateBuzz(buzz) {
    var buzzMarkup = `
     <div class="col-md-offset-2 col-md-8">

                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="media">
                            <span class="pull-left">
                                <span class="fa fa-user fa-4x"></span>
                            </span>
                            <div class="media-body">
                                <h4 class="media-heading">${buzz.name}</h4>
                                <p>
                                    ${buzz.buzz}
                                </p>
                                <p class="pull-right"><b>${new Date().toDateString()} @ ${new Date().toTimeString()}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    var _buzz = $(buzzMarkup);
    $('#buzz-container').prepend(_buzz);

}