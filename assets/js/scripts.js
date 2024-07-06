function onClickGetWebsite() {
    if(document.getElementById('website1').checked){
        const image = document.getElementById('image').src = 'assets/imgs/Website1.jpg';
        document.getElementById('link').href = 'planner.html'
    } else if(document.getElementById('website2').checked){
        const image = document.getElementById('image').src = 'assets/imgs/Website2.jpg';
        document.getElementById('link').href = 'planner2.html'
    } else if(document.getElementById('website3').checked){
        const image = document.getElementById('image').src = 'assets/imgs/Website3.jpg';
        document.getElementById('link').href = 'planner3.html'
    } else if(document.getElementById('website4').checked){
        const image = document.getElementById('image').src = 'assets/imgs/Website12.jpg';
        document.getElementById('link').href = 'planner.html'
    } else if(document.getElementById('website5').checked){
        const image = document.getElementById('image').src = 'assets/imgs/Website12.jpg';
        document.getElementById('link').href = 'planner.html'
    }
}

function addTask(element, list){
    var ul = list;
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(element.value))
    ul.appendChild(li)
    console.log(element.value)
}

function reset(){
    location.reload();
}

function print(){
    var option = document.querySelector('select').value;
    if(option === 'Print Table'){
        window.print();
    }
}