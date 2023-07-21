var fonts = ["Futura", "Didot","Verdana","Baskerville", "Avenir", "Gill Sans", "Source Code Pro", "Cooper", "Helvetica", "Rockwell", "Didot"];

let size=800;

var index;
let offscreen,mask;
let stringInput;
let rowsSlider;
let colsSlider;
let gridShown;
let backgroundColor;
let textColor;
let fontGrid;
let h;
1
function setup() {
  createCanvas(windowWidth, windowHeight);
  offscreen=createGraphics(windowWidth, windowHeight);
  mask=createGraphics(windowWidth, windowHeight);
  offscreen.textAlign(CENTER, CENTER);
 
  stringInput = createInput('LEEFONT');
  stringInput.position(10,40);
  stringInput.input(scramble);
  rowsSlider = createSlider(1, 10, 4, 1);
  rowsSlider.position(10,70);
  rowsSlider.input(scramble);
  colsSlider = createSlider(1, 30, 10, 1);
  colsSlider.position(10,100);
  colsSlider.input(scramble);
  gridShown = createCheckbox('', true);
  gridShown.position(120, 135);
  gridShown.changed(drawGraphic);
  backgroundColor = createColorPicker('#000000');
  backgroundColor.position(10, 160); backgroundColor.style('width', '75px');
  backgroundColor.input(drawGraphic);
  textColor = createColorPicker('#ffffff');
  textColor.position(100, 160); textColor.style('width', '75px');
  textColor.input(drawGraphic);
  scramble();
 
}

function scramble()
{
  fontGrid = new Array();
  var rows=rowsSlider.value();
  var cols=colsSlider.value();
  for(var j = 0; j <= rows; j++)
  {
      fontGrid[j] = new Array();
      for(var i = 0; i<cols; i++)
          fontGrid[j].push(fonts[floor(random(0, fonts.length))]);
  }
  getHeight();
  drawGraphic();
}

function getHeight()
{
  var x=0;
  for(var i=0;i<fonts.length;i++)
    {
      offscreen.textFont(fonts[i]);
      offscreen.textSize(windowWidth);

      offscreen.textSize(windowWidth*windowWidth/offscreen.textWidth(stringInput.value()));
      x=Math.max(x,offscreen.textAscent());
    }
  h=x;
}

function mouseClicked() {
  var rows=rowsSlider.value();
  var cols=colsSlider.value();
  var col=floor(mouseX/(windowWidth/cols));
  var row=floor( (mouseY-(windowHeight/2-h/2))/(h/rows));
  var font=fontGrid[row][col];
  while(fontGrid[row][col]==font)
    fontGrid[row][col]=fonts[floor(random(0, fonts.length))];
  drawGraphic();
}


function getSector(row,col)
{
  var rows=rowsSlider.value();
  var cols=colsSlider.value();
  var out =createGraphics(floor(windowWidth/cols), floor(h/rows));
  out.fill(color(textColor.value()));
  out.textFont(fontGrid[row][col]);
  out.textSize(windowWidth);
 out.textAlign(CENTER, CENTER);
  out.textSize(windowWidth*windowWidth/out.textWidth(stringInput.value()));
  out.text(stringInput.value(), windowWidth/2-col*windowWidth/cols, h/2-row*h/rows);
  return out.get();
}
function keyTyped() {
  // png is much higher quality than jpg
  if(keyCode == 83){
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
  save(timeStamp + 'png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scramble();
}

function drawGraphic() {
  clear();
  background(color(backgroundColor.value()));  
  fill(color(textColor.value()));
  text('GOOD DESIGN IS LEEFONT', rowsSlider.x-127 + rowsSlider.width, rowsSlider.y-40);
  text('网格X添加', rowsSlider.x * 2 + rowsSlider.width, rowsSlider.y+15);
  text('网格Y增加', colsSlider.x * 2 + colsSlider.width, colsSlider.y+15);
  text('显示网格', colsSlider.x * 2 + colsSlider.width, colsSlider.y+48);
  // text('PRESS S TO SAVE // CLICK CELL TO CHANGE FONT', 10,210);
    var rows=rowsSlider.value();
  var cols=colsSlider.value();
  for(var row=0;row<rows;row++)
    for(var col=0;col<cols;col++)
      {
     
        if(gridShown.checked())
        {
          fill(color(backgroundColor.value()));
          stroke(textColor.value());
          rect(col*windowWidth/cols,windowHeight/2-h/2+row*h/rows, windowWidth/cols,h/rows);
        }
        image(getSector(row,col),col*windowWidth/cols,windowHeight/2-h/2+row*h/rows, windowWidth/cols,h/rows);
      }
}
