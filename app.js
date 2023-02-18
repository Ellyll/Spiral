document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    maximiseCanvas(context.canvas);

    draw(context, 0);
});

function maximiseCanvas(canvas) {
    const maxX = window.innerWidth - 5;
    const maxY = window.innerHeight - 5;
    canvas.width = maxX;
    canvas.height = maxY;
}

function draw(context, currentStartAngle, prevTime) {
    window.requestAnimationFrame( (time) => {
        if (!prevTime)
            prevTime = time;
        let deltaTime = time - prevTime; // milliseconds elapsed
        let deltaAngle = deltaTime * 100*((2*Math.PI)/360)/1000
        let nextAngle = currentStartAngle + deltaAngle;
        if (nextAngle > 2*Math.PI)
            nextAngle -= 2*Math.PI

        drawSpiral(context, nextAngle);        
        draw(context, nextAngle, time);
    });
}

function drawSpiral(context, startAngle) {
    let xc = canvas.width / 2;
    let yc = canvas.height / 2;
    let rmax = Math.sqrt((xc**2)+(yc**2));

    context.beginPath();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.translate(xc, yc);
    context.rotate(startAngle);
    context.moveTo(0,0);
    const a = 1;
    const b = 10;
    for (let angle = 0 ; ; angle += 1*(2*Math.PI)/360 )
    {
        let x = ((a + b*angle)*Math.cos(angle));
        let y = ((a + b*angle)*Math.sin(angle));
        context.lineTo(x,y);

        let r = Math.sqrt((x**2) + (y**2));
        if (r > rmax)
            break;
    }
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 20;
    context.stroke();
    // context.moveTo(0,0);
    // context.lineTo(xc,yc);
    // context.stroke();
    context.rotate(-startAngle);
    context.translate(-xc, -yc);
}