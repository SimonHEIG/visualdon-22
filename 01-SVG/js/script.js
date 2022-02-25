let rect = document.getElementById("onClick");
console.log(rect);

rect.onclick = function(){
    console.log(rect.style.fill);
    if(rect.style.fill == 'blue'){
        rect.style.fill = 'red';
    }else{
        rect.style.fill = 'blue'
    }
}