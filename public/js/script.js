let  cadetList = [];

function getAllCadets(){
    console.log("Fetch API Call");
    let promise = fetch('http://localhost:3000/cadets');
    console.log(promise);
    promise.then((response)=>{
        return response.json();
    })
    .then((cadets)=>{
        let htmlRecord = '';
        cadetList = cadets;
        console.log(cadets); 
        cadets.forEach(cadet=>{
            htmlRecord+=`<tr>
            <td>${cadet.id}</td>
            <td>${cadet.name}</td>
            <td>${cadet.email}</td>
            <td><button onclick=getCadetById(${cadet.id})>Get CadetBy Id</button></td>
            </tr>`
        })
        document.getElementById("cadetList").innerHTML = `<table>${htmlRecord}</table>`
    })
    .catch(error=>console.log(error))
    return promise;
}
function getCadetById(id){
    console.log(id);
    if(id<100){
        return Promise.reject("Cadet  id is not found");
    }
    let promise = fetch(`http://localhost:3000/cadets/${id}`);
    promise.then((response)=>{return response.json()})
    .then(input=>console.log(input))
    .catch(error=>console.log(error))
}

function addCadet(){
    let cadet = {
           "name": "Mario",
            "email": "Mario@gmail.com"
    }
    return fetch('http://localhost:3000/cadets',{
        method:'POST',
        headers :  {
            'Content-Type' :  'application/json'
        },
        body: JSON.stringify(cadet)
    
    })
    .then((response)=>{
        console.log("test");
       // console.log("response "+response);
        if(response.status==201)
        return response.json();
        else
        return Promise.reject("Cadet  List is not added");
    })
    .then((data)=>{
        console.log(data);
        cadetList.push(data);
        cadetList.forEach(cadet=>{
            htmlRecord+=`<tr>
            <td>${cadet.id}</td>
            <td>${cadet.name}</td>
            <td>${cadet.email}</td>
            <td><button onclick=getCadetById(${cadet.id})>Get CadetBy Id</button></td>
            </tr>`
        })
        document.getElementById("cadetList").innerHTML = `<table>${htmlRecord}</table>`

    })
    .catch(error=>console.log(error));
}


























