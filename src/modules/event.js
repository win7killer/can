let ctx = null;
let can = null;

function init(paramCtx) {
    ctx = paramCtx;
    can = ctx.canvas;
    // console.log(mousePos());
    can.addEventListener('click', function() {

    });
    can.addEventListener('mouseover', function() {

    });
    can.addEventListener('mouseoout', function() {

    });
    can.addEventListener('mouseover', function() {

    });
}


function mousePos() {
    let canPos = can.getBoundingClientRect();
    return canPos;
}


export default init;
