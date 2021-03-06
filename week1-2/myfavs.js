let pokemon = [];

window.addEventListener('load',function(){
    listado();
})

const busqueda = (buscar) => {
    const divs = document.getElementsByClassName('alldiv'); 
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.add('novisible')
        let e = divs[i].id.slice(3)
        if(pokemon[e].name.substr(0,buscar.length) == buscar){
            divs[i].classList.remove('novisible')
        }
    }
}

const listado = () => {
    document.getElementById("pokemonsdiv").innerHTML=""
    for(let contador=1;contador<=150;contador++){
        if(localStorage.getItem(contador) == "g"){
            fetch("https://pokeapi.co/api/v2/pokemon/"+contador)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                let namepok = myJson.name;
                let typepok = myJson.types[0].type.name;
                let typepok2 = ''
                if (myJson.types[1]) typepok2 = ", "+myJson.types[1].type.name
                pokemon[contador] = {
                    id: contador,
                    image: myJson.sprites.front_default,
                    name: namepok,
                    type: typepok+typepok2
                };
                let xhtml = "" ;
                xhtml+="<div class='alldiv' id='pok"+contador+"'><img class='imgpokedex' src="+myJson.sprites.front_default+">"
                xhtml+="<h3 id='h3name' class='h3name'>"+namepok.charAt(0).toUpperCase()+namepok.slice(1)+"</h3>"
                xhtml+="<h3 class='h3type'>Type: "+typepok+typepok2+"</h3>"
                xhtml+="<button id='btnfav"+contador+"' onclick='fav("+contador+")' class='addfav'>"
                if(localStorage.getItem(contador) == "g"){
                    xhtml += "Remove"
                }
                
                xhtml+="</button></div>"
                document.getElementById("pokemonsdiv").innerHTML+=xhtml
            })
        }
    }
};

const fav = (pokid) => {
    if(localStorage.getItem(pokid) == "g"){
        localStorage.removeItem(pokid)
        document.getElementById("btnfav"+pokid).innerHTML = "Add to favs"
    }
    else{
        localStorage.setItem(pokid, "g")
        document.getElementById("btnfav"+pokid).innerHTML = "Remove"
    }
};

