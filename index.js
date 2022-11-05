/*=== === === === === === === === === === === ===
~~~~ JavaScript ax+b quadratic calculator ~~~~
=== === === === === === === === === === === === */

addEventListener("DOMContentLoaded", () => {
  /* 
    Declare input for ax+b value &
    the submit button for start the precesse of calculation
  */

  const form = document.getElementById("form");
  const bynCalc = document.querySelector("[data-calc]");
  const solution = document.getElementById("solution");
  const a = document.getElementById("a");
  const b = document.getElementById("b");

  /* 
    Append input Value in the DOM =====to==get===> ax+b
  */
  const prevVarA = document.getElementById("prev_a");
  const prevVarB = document.getElementById("prev_b");
  /* 
    functions For Validate The Input
    When the value is equal to zero
  */
  function unvalid(elems) {
    if (elems) {
      elems.style.border = "1px solid red";
      elems.style.outline = "1px solid red";
    }
  }
  function valid(elems) {
    elems.style.border = "1px solid #ECECEC";
    elems.style.outline = "none";
  }

  a.addEventListener("input", function (e) {
    // a value can't be zero
    if (parseFloat(e.target.value) === 0) {
      bynCalc.textContent = "a => value can't be 0";
      unvalid(a);
    } else {
      prevVarA.innerText = e.target.value;
      document.getElementById("prev_a_fx").innerText = e.target.value;
      bynCalc.textContent = "calc";
      valid(a);
    }
  });

  b.addEventListener("input", function (e) {
    // b value can be a zero
    prevVarB.innerText = e.target.value;
    document.getElementById("prev_b_fx").innerText = e.target.value;
  });

  /* 
    implement calculation and find the solution
    The calc will start after clicking the button 
    - ax + b = 0 
    ==> first thing is we take b to the other side and toggle the status "N to P" || "P to N"
    - ax = -b
  */
  bynCalc.addEventListener("click", (e) => {
    e.preventDefault();
    // some external validation
    /* 
      take b to the other side by checking the status first
    */
    /*  
      If b === 0 - Then the equation will be ax = 0
      Solution: x = 0
   */
    // b value can be a zero
    if (parseFloat(b.value) === 0) {
      solution.innerText = `${0}, because b = 0 ==> ax = 0 ==> x = 0`;
    }
    if (parseFloat(b.value) > 0 || parseFloat(b.value) < 0) {
      const new_b = -true * b.value; // ax = +-b
      const result = new_b / a.value;
      solution.innerText = `${result} 
      ax = +-b => x = +- b/a`;
      /*
        Function Start Drawing The Graphing Equation after Calculation
        - send the result to the function
        - convert from string to number
      */
      const values = [+a.value, +b.value, result];
      drawCanvas(values); //result);
    }
  });
  /* 
    Graphing Equation Using Canvas
  */
  function drawCanvas(solutionValue) {
    // declare the canvas
    const graph = document.getElementById("graph");
    // set the perspective to draw
    const context = graph.getContext("2d");

    // set styles:
    graph.style.border = "1px solid #cfcfcf";
    graph.style.padding = "1em";

    // set the width and height
    graph.width = 520;
    graph.height = 520;

    /* 
    get the midle height and middle width to center the a axis and b axis
    */
    let moyenHeith = graph.height / 2;
    let moyenWidth = graph.width / 2;

    let myCanvasWidth = graph.width;
    let myCanvasHeight = graph.height;

    /*
      start drawing the lines and rows
    */
    context.fillStyle = "#f8f8f8";
    context.fillRect(0, 0, myCanvasWidth, myCanvasHeight);
    context.strokeStyle = "#D4D4D4";
    context.lineWidth = 1;

    /* loop for creating the vertical line */
    for (let i = 0; i <= myCanvasWidth; i = i + 20) {
      context.moveTo(i, 0);
      context.lineTo(i, myCanvasWidth);
    }

    /* loop for creating the horizontal line */
    for (let i = 0; i <= myCanvasWidth; i = i + 20) {
      context.moveTo(0, i);
      context.lineTo(myCanvasHeight, i);
    }
    // show the H and V line
    context.stroke();

    /* Draw the a axis && b axis */
    // statrt a new path by beginPath()
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(moyenHeith, 0);
    context.lineTo(moyenHeith, graph.height);
    context.strokeStyle = "red";
    context.moveTo(0, moyenWidth);
    context.lineTo(graph.width, moyenWidth);
    context.stroke();

    /* destruction Array that has value */
    let [aVal, bVal, reslt] = solutionValue;

    let fp = 0;
    let sp = 1;

    const r1 = aVal * fp + bVal;
    const r2 = aVal * sp + bVal;
    console.log(r1);
    console.log(r2);

    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(r1 * 10, graph.width);
    context.lineTo(graph.width, r2 * 10);
    context.strokeStyle = "blue";

    context.stroke();
  }
});
