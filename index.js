const operacoes = document.getElementById("operacoes");
const primeiraTela = document.getElementById("primeiraTela");
const addLivroButton = document.getElementById("addLivroButton");
const addLivro = document.getElementById("addLivro");
const updateLivroButton = document.getElementById("updateLivroButton");
const updateLivro = document.getElementById("updateLivro");
const listaLivrosButton = document.getElementById("listaLivrosButton");
const listaLivros = document.getElementById("listaLivros");
const deleteLivroButton = document.getElementById("deleteLivroButton");
const deleteLivro = document.getElementById("deleteLivro");
const adicionarLivroEvent = document.getElementById("adicionarLivroEvent");
const atualizando = document.getElementById("atualizando");
const atualizarLivroEvent = document.getElementById("atualizarLivroEvent");
const larguraTela = window.innerWidth; 

class Livro {
    constructor(titulo, genero, autor, id) {
        this.titulo = titulo;
        this.genero = genero;
        this.autor = autor;
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    getGenero() {
        return this.genero;
    }

    getAutor() {
        return this.autor;
    }

    getId() {
        return this.id;
    }

    setTitulo(novoTitulo) {
        this.titulo = novoTitulo;
    }

    setGenero(novoGenero) {
        this.genero = novoGenero;
    }

    setAutor(novoAutor) {
        this.autor = novoAutor;
    }

    setId(novoId) {
        this.id = novoId;
    }
}

var VetorDeLivros = [];
var id = 0;

document.addEventListener("DOMContentLoaded", function () {
    updateLivro.remove();
    addLivro.remove();
    listaLivros.remove();
    deleteLivro.remove();
    atualizando.remove();
});

const check = (titulo,genero,autor) =>{
    if(titulo.length===0 || genero.length===0 || autor.length===0){
        alert("Preencha todos os campos!");
        return false;
    }

    for(let i=0;i<VetorDeLivros.length;i++){
        if(VetorDeLivros[i].getAutor() === autor && VetorDeLivros[i].getGenero() === genero && VetorDeLivros[i].getTitulo() === titulo){
            alert("Livro já existe na biblioteca!");
            return false;
        }
    }
    return true;
}

adicionarLivroEvent.addEventListener("click", function () {
    const inputNome = document.getElementById("nomeLivro");
    const inputGenero = document.getElementById("generoLivro");
    const inputAutor = document.getElementById("autorLivro");

    const nome=inputNome.value;
    const autor=inputAutor.value;
    const genero=inputGenero.value;
    if(check(nome,genero,autor)){
        id += 1;
        let elemento = new Livro(nome, genero, autor, id);
        VetorDeLivros.push(elemento);
        inputAutor.value="";
        inputGenero.value="";
        inputNome.value="";
    }
});

addLivroButton.addEventListener("click", function () {
    if (primeiraTela) primeiraTela.remove();
    if (listaLivros) listaLivros.remove();
    if (deleteLivro) deleteLivro.remove();
    if (updateLivro) updateLivro.remove();
    if (atualizando) atualizando.remove();
    operacoes.appendChild(addLivro);
})

updateLivroButton.addEventListener("click", function () {
    if (primeiraTela) primeiraTela.remove();
    if (listaLivros) listaLivros.remove();
    if (deleteLivro) deleteLivro.remove();
    if (addLivro) addLivro.remove();
    if (atualizando) atualizando.remove();

    operacoes.appendChild(updateLivro);
    updateLivro.innerHTML = '';
    updateLivro.className="containerLista";

    if(VetorDeLivros.length===0){
        const vazio = document.createElement("p");
        vazio.textContent="Nenhum livro cadastrado";
        vazio.style.alignSelf="center";
        vazio.style.justifySelf="center";
        if(larguraTela <= 768){
            vazio.style.marginLeft = "0%";
        }
        else{
            vazio.style.marginLeft = "35%";
        }
        vazio.style.fontSize="20px";
        vazio.style.color="white";
        updateLivro.appendChild(vazio);
    }

    VetorDeLivros.forEach(function (element) {
        const containerLivro = document.createElement("div");
        const title = document.createElement("p");
        const autor = document.createElement("p");
        const genero = document.createElement("p");
        const atualizar = document.createElement("button");
        atualizar.textContent = "Atualizar";
        atualizar.style.width="100%";
        atualizar.style.borderRadius="0";
        containerLivro.classList.add("listadorContainer");
        title.textContent = "Título: " + element.getTitulo();
        genero.textContent = "Gênero: " + element.getGenero();
        autor.textContent = "Autor: " + element.getAutor();
        containerLivro.appendChild(title);
        containerLivro.appendChild(genero);
        containerLivro.appendChild(autor);
        containerLivro.appendChild(atualizar);
        updateLivro.appendChild(containerLivro);

        atualizar.addEventListener("click",function(){
            updateLivro.remove();
            operacoes.appendChild(atualizando);
            atualizarLivroEvent.addEventListener("click",function(){
                const inputAtualizaNome = document.getElementById("nomeLivroAtualizar");
                const inputAtualizaGenero = document.getElementById("generoLivroAtualizar");
                const inputAtualizaAutor = document.getElementById("autorLivroAtualizar");

                const atualizaNome = inputAtualizaNome.value;
                const atualizaGenero = inputAtualizaGenero.value;
                const atualizaAutor = inputAtualizaAutor.value;

                if(check(atualizaNome,atualizaGenero,atualizaAutor)){
                    for(let i=0;i<VetorDeLivros.length;i++){
                        if(VetorDeLivros[i].getId()===element.getId()){
                            VetorDeLivros[i].setAutor(atualizaAutor);
                            VetorDeLivros[i].setTitulo(atualizaNome);
                            VetorDeLivros[i].setGenero(atualizaGenero);
                            inputAtualizaAutor.value="";
                            inputAtualizaGenero.value="";
                            inputAtualizaNome.value="";
                        }
                    }
                }
            })
        })
    })
})

listaLivrosButton.addEventListener("click", function () {
    if (primeiraTela) primeiraTela.remove();
    if (updateLivro) updateLivro.remove();
    if (deleteLivro) deleteLivro.remove();
    if (addLivro) addLivro.remove();
    if(atualizando) atualizando.remove();
    operacoes.appendChild(listaLivros);

    listaLivros.innerHTML = '';
    listaLivros.className = "containerLista";

    if(VetorDeLivros.length===0){
        const vazio = document.createElement("p");
        vazio.textContent="Nenhum livro cadastrado";
        vazio.style.alignSelf="center";
        vazio.style.justifySelf="center";
        if(larguraTela <= 768){
            vazio.style.marginLeft = "0%";
        }
        else{
            vazio.style.marginLeft = "35%";
        }
        vazio.style.fontSize="20px";
        vazio.style.color="white";
        listaLivros.appendChild(vazio);
    }

    VetorDeLivros.forEach(function (element) {
        const containerLivro = document.createElement("div");
        const icone = document.createElement("img");
        icone.src="img\\livro-de-capa-preta-fechado.png";
        icone.style.width="40%";
        const title = document.createElement("p");
        const autor = document.createElement("p");
        const genero = document.createElement("p");
        containerLivro.classList.add("listadorContainer");
        title.textContent = "Título: " + element.getTitulo();
        genero.textContent = "Gênero: " + element.getGenero();
        autor.textContent = "Autor: " + element.getAutor();
        containerLivro.appendChild(icone);
        containerLivro.appendChild(title);
        containerLivro.appendChild(genero);
        containerLivro.appendChild(autor);
        listaLivros.appendChild(containerLivro);
    })
})

deleteLivroButton.addEventListener("click", function () {
    if(primeiraTela) primeiraTela.remove();
    if(updateLivro) updateLivro.remove();
    if(listaLivros) listaLivros.remove();
    if(addLivro) addLivro.remove();
    if(atualizando) atualizando.remove();

    operacoes.appendChild(deleteLivro);
    deleteLivro.innerHTML = '';
    deleteLivro.className = "containerLista";

    if(VetorDeLivros.length===0){
        const vazio = document.createElement("p");
        vazio.textContent="Nenhum livro cadastrado";
        vazio.style.alignSelf="center";
        vazio.style.justifySelf="center";
        if(larguraTela <= 768){
            vazio.style.marginLeft = "0%";
        }
        else{
            vazio.style.marginLeft = "35%";
        }
        vazio.style.fontSize="20px";
        vazio.style.color="white";
        deleteLivro.appendChild(vazio);
    }

    VetorDeLivros.forEach(function (element) {
        const containerLivro = document.createElement("div");
        const title = document.createElement("p");
        const autor = document.createElement("p");
        const genero = document.createElement("p");
        const apaga = document.createElement("button");
        apaga.textContent = "Remover";
        apaga.style.borderRadius="0";
        apaga.style.backgroundColor="red";
        apaga.style.width="100%";
        containerLivro.classList.add("listadorContainer");
        title.textContent = "Título: " + element.getTitulo();
        genero.textContent = "Gênero: " + element.getGenero();
        autor.textContent = "Autor: " + element.getAutor();
        containerLivro.appendChild(title);
        containerLivro.appendChild(genero);
        containerLivro.appendChild(autor);
        containerLivro.appendChild(apaga);
        deleteLivro.appendChild(containerLivro);

        apaga.addEventListener("click",function(){
            for(let i=0;i<VetorDeLivros.length;i++){
                if(VetorDeLivros[i].getId()===element.getId()){
                    VetorDeLivros.splice(i,1);
                    containerLivro.remove();
                    if(VetorDeLivros.length===0){
                        const vazio = document.createElement("p");
                        vazio.textContent="Nenhum livro cadastrado";
                        vazio.style.alignSelf="center";
                        vazio.style.justifySelf="center";
                        if(larguraTela <= 768){
                            vazio.style.marginLeft = "0%";
                        }
                        else{
                            vazio.style.marginLeft = "35%";
                        }
                        vazio.style.fontSize="20px";
                        vazio.style.color="white";
                        deleteLivro.appendChild(vazio);
                    }
                }
            }
        })

    })
})