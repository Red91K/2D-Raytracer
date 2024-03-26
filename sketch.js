class Line  {
  constructor(x1,y1,x2,y2)  {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  DrawLine()  {
    line(this.x1,this.y1,this.x2,this.y2);
  }
}

class Ray {
  constructor(x1,y1,x2,y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = 'white';
  }

  DrawRay() {
    push();
    stroke(this.color);
    strokeWeight(1);
    line(this.x1,this.y1,this.x2,this.y2);
    pop();
  }
}

function DrawLines()  {
  for (let i = 0; i < LineArray.length; i++) {
    push();
    stroke(255);
    strokeWeight(10);
    LineArray[i].DrawLine();
    pop();
  }
}

function DrawRays() {
  for(let i = 0; i < LineArray.length; i++) {
    let curline = LineArray[i];
    RayArray.push(new Ray(mouseX,mouseY,curline.x1,curline.y1));
    RayArray.push(new Ray(mouseX,mouseY,curline.x2,curline.y2));
    /*
    let theta1 = Math.atan((curline.y1-mouseY)/(curline.x1-mouseX));
    if(mouseX > curline.x1) {
      theta1+=PI;
    }
    RayArray.push(new Ray(mouseX,mouseY,theta1));
    let theta2 = Math.atan((curline.y2-mouseY)/(curline.x2-mouseX));
    if(mouseX > curline.x2) {
      theta2 += PI;
    }
    RayArray.push(new Ray(mouseX,mouseY,theta2));
    stroke(255);
    strokeWeight(10);
    line(mouseX,mouseY,curline.x,curline.y);
    */
  }
  Elim();
  /*
  for(let i = 0; i < RayArray.length; i++) {
    RayArray[i].DrawRay();
  }
  */
}

function Elim() {
  var i = 0;
  while (i < RayArray.length) {
    let cnt = 0;
    for(let j = 0; j < LineArray.length; j++) {
      if(FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x2,RayArray[i].y2,LineArray[j].x1,LineArray[j].y1,LineArray[j].x2,LineArray[j].y2) != null) {
        push();
        stroke('red');
        strokeWeight(10);
        let coords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x2,RayArray[i].y2,LineArray[j].x1,LineArray[j].y1,LineArray[j].x2,LineArray[j].y2)
        //point(mouseX+coords[0],mouseY-coords[1]);
        pop();
        cnt++;
        //console.log('i')
        //console.log(i)
        //console.log('j')
        //console.log(j)
      }
    }
    if(cnt > 1) {
      RayArray[i].color = 'red';
      RayArray.splice(i,1);
    }
    else  {
      i++;
    }
  }
}

function DrawTempRays() {
  //left
  for(let i = 0; i < LineArray.length; i++) {
    let curx = RayArray[i].x2 - RayArray[i].x1;
    let cury = RayArray[i].y1 - RayArray[i].y2;
    let curdeg = Math.atan2(cury,curx); 
    let leftcoords = [2600*Math.cos(curdeg-0.000001),2600*Math.sin(curdeg-0.000001)];
    let leftcntar = [];
    for(let j = 0; j < LineArray.length;j++) {
      if(FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+leftcoords[0],RayArray[i].y1-leftcoords[1],LineArray[j].x1,LineArray[j].y1,LineArray[j].x2,LineArray[j].y2) != null) {
        leftcntar.push(j);
      }
    }
    
    if(leftcntar.length == 1)  {
      let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+leftcoords[0],RayArray[i].y1-leftcoords[1],LineArray[leftcntar[0]].x1,LineArray[leftcntar[0]].y1,LineArray[leftcntar[0]].x2,LineArray[leftcntar[0]].y2);
      let x = intersectcoords[0] + RayArray[i].x1;
      let y =  RayArray[i].y1 - intersectcoords[1];
      RayArray.push(new Ray(mouseX,mouseY,x,y));
    }
    else if(leftcntar.length == 0) {
    }
    else  {
      let min = 99999999,pos = 0;
      for(let k = 0; k < leftcntar.length;k++)  {
        let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+leftcoords[0],RayArray[i].y1-leftcoords[1],LineArray[leftcntar[k]].x1,LineArray[leftcntar[k]].y1,LineArray[leftcntar[k]].x2,LineArray[leftcntar[k]].y2);
        /*
        if(Math.sqrt((intersectcoords[0] - RayArray[i].x1) * (intersectcoords[0] - RayArray[i].x1) + (RayArray[i].y1 - intersectcoords[1]) * (RayArray[i].y1 - intersectcoords[1])) < min) {
          min = Math.sqrt((intersectcoords[0] - RayArray[i].x1) * (intersectcoords[0] - RayArray[i].x1) + (RayArray[i].y1 - intersectcoords[1]) * (RayArray[i].y1 - intersectcoords[1]));
          pos = k;
        }
        */
        if(Math.sqrt((intersectcoords[0]) * (intersectcoords[0]) + (RayArray[i].y1) * (RayArray[i].y1)) < min) {
          min = Math.sqrt((intersectcoords[0]) * (intersectcoords[0]) + (RayArray[i].y1) * (RayArray[i].y1));
          pos = k;
        }
      }
      let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+leftcoords[0],RayArray[i].y1-leftcoords[1],LineArray[leftcntar[pos]].x1,LineArray[leftcntar[pos]].y1,LineArray[leftcntar[pos]].x2,LineArray[leftcntar[pos]].y2);
      intersectcoords[0] += RayArray[i].x1;
      intersectcoords[1] = RayArray[i].y1 - intersectcoords[1];
      RayArray.push(new Ray(RayArray[i].x1,RayArray[i].y1,intersectcoords[0],intersectcoords[1]));
    }
    //right
    for(let i = 0; i < LineArray.length; i++) {
      let curx = RayArray[i].x2 - RayArray[i].x1;
      let cury = RayArray[i].y1 - RayArray[i].y2;
      let curdeg = Math.atan2(cury,curx); 
      let rightcoords = [2600*Math.cos(curdeg+0.000001),2600*Math.sin(curdeg+0.000001)];
      let rightcntar = [];
      for(let j = 0; j < LineArray.length;j++) {
        if(FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+rightcoords[0],RayArray[i].y1-rightcoords[1],LineArray[j].x1,LineArray[j].y1,LineArray[j].x2,LineArray[j].y2) != null) {
          rightcntar.push(j);
        }
      }
      
      if(rightcntar.length == 1)  {
        let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+rightcoords[0],RayArray[i].y1-rightcoords[1],LineArray[rightcntar[0]].x1,LineArray[rightcntar[0]].y1,LineArray[rightcntar[0]].x2,LineArray[rightcntar[0]].y2);
        let x = intersectcoords[0] + RayArray[i].x1;
        let y =  RayArray[i].y1 - intersectcoords[1];
        RayArray.push(new Ray(mouseX,mouseY,x,y));
      }
      else if(rightcntar.length == 0) {
      }
      else  {
        let min = 99999999,pos = 0;
        for(let k = 0; k < rightcntar.length;k++)  {
          let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+rightcoords[0],RayArray[i].y1-rightcoords[1],LineArray[rightcntar[k]].x1,LineArray[rightcntar[k]].y1,LineArray[rightcntar[k]].x2,LineArray[rightcntar[k]].y2);
          /*
          if(Math.sqrt((intersectcoords[0] - RayArray[i].x1) * (intersectcoords[0] - RayArray[i].x1) + (RayArray[i].y1 - intersectcoords[1]) * (RayArray[i].y1 - intersectcoords[1])) < min) {
            min = Math.sqrt((intersectcoords[0] - RayArray[i].x1) * (intersectcoords[0] - RayArray[i].x1) + (RayArray[i].y1 - intersectcoords[1]) * (RayArray[i].y1 - intersectcoords[1]));
            pos = k;
          }
          */
          if(Math.sqrt((intersectcoords[0]) * (intersectcoords[0]) + (RayArray[i].y1) * (RayArray[i].y1)) < min) {
            min = Math.sqrt((intersectcoords[0]) * (intersectcoords[0]) + (RayArray[i].y1) * (RayArray[i].y1));
            pos = k;
          }
        }
        let intersectcoords = FindInterSection(RayArray[i].x1,RayArray[i].y1,RayArray[i].x1+rightcoords[0],RayArray[i].y1-rightcoords[1],LineArray[rightcntar[pos]].x1,LineArray[rightcntar[pos]].y1,LineArray[rightcntar[pos]].x2,LineArray[rightcntar[pos]].y2);
        intersectcoords[0] += RayArray[i].x1;
        intersectcoords[1] = RayArray[i].y1 - intersectcoords[1];
        RayArray.push(new Ray(RayArray[i].x1,RayArray[i].y1,intersectcoords[0],intersectcoords[1]));
      }
    }
  }
}

function DrawTriangles()  {
  RayArray.sort(CompareAngle);
  RayArray.push(RayArray[0])
  for(let i = 0; i < RayArray.length-1; i++) {
    beginShape();
    fill('yellow');
    vertex(RayArray[i].x1, RayArray[i].y1);
    vertex(RayArray[i].x2,RayArray[i].y2);
    vertex(RayArray[i+1].x2,RayArray[i+1].y2);
    endShape();
  }
}

function CompareAngle(a,b)  {
  let AngleA = Math.atan2((a.y1 - a.y2),(a.x2 - a.x1))
  // Math.atan2 returns a value between 0 and Pi or 0 and -Pi
  // because we want to compare the angles, we convert the negative angles to their co-terminal positive equivelant
  if(AngleA < 0)  {
    AngleA = 2*Math.PI + AngleA;
  }
  let AngleB = Math.atan2((b.y1 - b.y2),(b.x2 - b.x1))
  if(AngleB < 0)  {
    AngleB = 2*Math.PI + AngleB;
  }
  //compare the two angles
  if(AngleA > AngleB) {
    return 1;
  }
  else if (AngleA < AngleB) {
    return -1
  }
  else  {
    return 0;
  }
}

function FindInterSection(x1,y1,x2,y2,x3,y3,x4,y4) {
  x1 = x1-mouseX;
  x2 = x2-mouseX;
  x3 = x3-mouseX;
  x4 = x4-mouseX;
  y1 = mouseY-y1;
  y2 = mouseY-y2;
  y3 = mouseY-y3;
  y4 = mouseY-y4;
  let denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
  if(denominator == 0)  {
    return null;
  }
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))/denominator;
  let u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2))/denominator;

  if(t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return [x1+t*(x2-x1),y1+t*(y2-y1)];
  }
  else  {
    return null;
  }
}

function setup() {
  createCanvas(2000, 1000);
  background(0);
  stroke(255);
  //Left up corner square
  LineArray.push(new Line(100,100,250,100));
  LineArray.push(new Line(100,200,250,200));
  LineArray.push(new Line(100,100.001,100,199.99));
  LineArray.push(new Line(250,100.001,250,199.99));

  //left up middle square
  LineArray.push(new Line(300,300,450,300));
  LineArray.push(new Line(300,400,450,400));
  LineArray.push(new Line(300,300.001,300,399.99));
  LineArray.push(new Line(450,300.001,450,399.99));

  //left down corner
  LineArray.push(new Line(300,700,450,700));
  LineArray.push(new Line(300,800,450,800));
  LineArray.push(new Line(300,700.001,300,799.99));
  LineArray.push(new Line(450,700.001,450,799.99));

  //middle middle middle
  LineArray.push(new Line(600,400,750,400));
  LineArray.push(new Line(600,500,750,500));
  LineArray.push(new Line(600,400.001,600,499.99));
  LineArray.push(new Line(750,400.001,750,499.99));

  LineArray.push(new Line(1000,400,1150,400));
  LineArray.push(new Line(1000,500,1150,500));
  LineArray.push(new Line(1000,400.001,1000,499.99));
  LineArray.push(new Line(1150,400.001,1150,499.99));

  LineArray.push(new Line(700,100,700,200));

  //Walls
  LineArray.push(new Line(10,10,1600,10));
  LineArray.push(new Line(11,900,1599,900));
  LineArray.push(new Line(10,11,10,900));
  LineArray.push(new Line(1600,11,1600,900)); 


  

}

var LineArray = [];
var RayArray = [];
var TempRayArray = [];

function draw() {

  RayArray = [];
  background(0);
  push();
  stroke(255);
  strokeWeight(10);
  point(mouseX, mouseY);
  pop();

  DrawLines();
  DrawRays();
  DrawTempRays();

  DrawTriangles();
  
  /*
  for(let i = 0; i < RayArray.length; i++) {
    RayArray[i].DrawRay();
  }
  /*
  beginShape();
  vertex(mouseX, mouseY);
  vertex(95,100);
  vertex(955,100);
  endShape();
  */
  //line(mouseX, mouseY,100,100);
  //line(mouseX, mouseY,950,100);
}

