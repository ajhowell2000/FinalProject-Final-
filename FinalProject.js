Promise.all([
    d3.csv("Correlation.csv"),
    d3.csv("FinalData.csv"),
    d3.csv("Correlation2.csv"),
]).then(function(files) { console.log(files)
    // files[0] will contain file1.csv
    // files[1] will contain file2.csv
drawgraph(files[0])
drawgraph2(files[2])
initPlot(files[1])
}).catch(function(err) {
    console.log("Something went wrong", err)
    // handle error here
})


//1300
//1600
var width="400";
var height="300";

var svg= d3.select("svg")
        .attr("width", width)
        .attr("height",height)
        .attr("id", "graph")

var width2="800"
var height2="700"

var svg2= d3.select("#plot2")
        .attr("width", width2)
        .attr("height", height2)
        .attr("id", "graph2")

var width3="800"
var height3="700"

var svg3= d3.select("#plot3")
        .attr("width", width2)
        .attr("height", height2)
        .attr("id", "graph3")

var drawgraph= function(teams){

var screen={width:1800, height:1000}

var margins={top:800, bottom:500, left:200, right:500,}
var graph={width:screen.width-margins.left-margins.right}


var Scales= d3.scaleBand()
    .domain(["Championships", "Value","wins" ,"Attendance"])
    .range([0,graph.width-900])

var xPos= function(team){
   return Scales(team.Name1-500)
}
var yPos= function(team){
    return Scales(team.Name2-500)
}
var rect= svg.selectAll("rect")
    .data(teams)
    .enter()
    .append("rect")
    
    .attr("id", function(rect, index){
        return "rect"+index
    })
    .attr("class", "rect1")
    .attr("x",xPos)
    .attr("y", yPos)
    .attr("width","50")
    .attr("height","50")
    .attr("fill", "red")
    
svg.selectAll("text")
    .data(teams)
    .enter()
    .append("text")
    .attr("class", "Text")    
    .attr("transform","translate(200,"+(300)+")")
    .text(function(team){return team.Cor})
    

   
  
createaxes(Scales)
}

var createaxes= function(Scales){
    var xAxis=d3.axisTop(Scales)
    var yAxis=d3.axisLeft(Scales)
    
   //creating x-axis
    svg.append("g")
        .attr("class", "axis1")
.attr("transform","translate(100,"+(100)+")")
        .call(xAxis)
    //y-axis
   
    svg.append("g")
    .attr("class", "axis2")
    .attr("transform","translate(100,"+(100)+")")
    .call(yAxis)
}
    

var drawgraph2= function(team){
   
    var screen={width:1800, height:1000}

var margins={top:800, bottom:500, left:200, right:500,}
var graph={width:screen.width-margins.left-margins.right}
    
    var Scales= d3.scaleBand()
    .domain(["championships", "value","wins" ,"attendance"])
    .range([0,graph.width-500])

    //function(team)
    //Scales(team.Name2)

    var xPos2= function(team){
        return Scales(team.Name1)}
var yPos2= function(team){
    return Scales(team.Name2)
}

var rect2= svg2.selectAll("rect")
    .data(team)
    .enter()
    .append("rect")
    .attr("id", (function(rect, index){
        return ("rect"+index*20)}))
    .attr("x", xPos2)
    .attr("y", yPos2)
    .attr("width", Scales.bandwidth())
    .attr("height",Scales.bandwidth())
    .attr("transform","translate(100,"+(75)+")")
    .attr("fill", "red")
createaxes2(Scales)
    console.log(Scales.bandwidth())
    
}

var createaxes2= function(Scales){
    var xAxis=d3.axisTop(Scales)
    var yAxis=d3.axisLeft(Scales)
    
   //creating x-axis
    svg2.append("g")
        .attr("class", "axis3")
.attr("transform","translate(100,"+(75)+")")
        .call(xAxis)
    //y-axis
   
    svg2.append("g")
    .attr("class", "axis4")
    .attr("transform","translate(100,"+(75)+")")
    .call(yAxis)
}

var initPlot= function(team, Scales, xval, yval){
    
var screen={width:1800, height:1000}

var margins={top:800, bottom:500, left:200, right:500,}
var graph={width:screen.width-margins.left-margins.right}
    
  var Scales= d3.scaleBand()
    .domain(["championships", "value","wins" ,"attendance"])
    .range([0,graph.width-500])

    
 var xScale= d3.scaleLinear()
            .domain([0,d3.max(team, function(club){ return Number.parseInt(club.Championships)})])
            .range([0, Scales.bandwidth()-30])

 var yScale= d3.scaleLinear()
                    .domain([0,d3.max(team, function(club){return Number.parseInt(club.Championships)})])
            .range([Scales.bandwidth()-30,0])
 
 //function(club){ return xScale(club.Championships/10)})
   
 //function(club){ return yScale(club.Championships/10)})

 svg2.selectAll("circle")
    .data(team)
    .enter()
    .append("g")
    .attr("class","circles")
    .append("circle")
    .attr("cx",function(xval){ return xScale(xval.Championships)})
    .attr("cy",function(yval){ return yScale(yval.Championships)})
    .attr("r", 4)
    .attr("fill", "black")
    .attr("transform","translate(123,"+(80)+")")
    createaxes3(xScale,yScale)
}

var changeScatter= function(teams, Scales, xval, yval, target){
    
    //join
    d3.select(target)
        .select(".circles")
        .selectAll("circle")
        .data(teams)
    
    //enter
    .enter()
    .append("circle")
    
    //exit
    .exit
    .remove()
    
    //Update
      d3.select(target)
        .select(".circles")
        .selectAll("circle")
        .transition
        .duration(200)
        .attr("cx",function(team){
          return xScale(team([xval]))
      })
        .attr("cx",function(team){
          return yScale(team([yval]))
      })
    .attr("r",4)  
}

var createaxes3= function(xScale,yScale){
     var yAxis=d3.axisLeft(yScale)
    var xAxis=d3.axisBottom(xScale)
   
    
   //creating x-axis
    svg2.append("g")
        .attr("class", "axis5")
.attr("transform","translate(123,"+(200)+")")
        .call(xAxis)
    //y-axis
   
    svg2.append("g")
    .attr("class", "axis6")
    .attr("transform","translate(123,"+(80)+")")
    .call(yAxis)}


//var initgraph= function(){}


//var changegraph= function(){}

//var initLabels= function(xScale,yScale){}