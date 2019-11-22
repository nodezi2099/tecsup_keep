let main__article__nota = document.getElementById("main__article__nota")
let main__article = document.getElementById("main__article")
let main__article__textbox = document.getElementById('main__article__textbox')
let main__article__textboxTitle = document.getElementById("main__article__textboxTitle")
let main__article__title = document.getElementById('main__article__title')
let icon__close = document.getElementById('icon__close')
let aux = []
let template = document.getElementById("template")
let input_search = document.getElementById("input_search")
let temp,temp2
let templateHTML = `
     <div>
         <h3>:titulo:</h3>
         <p>:nota:</p>
     </div>
`;


/*Funciones*/
let showElements = () => {
    main__article__title.classList.remove('hide')
    main__article__textboxTitle.setAttribute("contenteditable", "true")
    main__article.classList.add('editor') 
    main__article__nota.classList.remove('main__article--nota')
    main__article__nota.classList.add('nota')

    if(main__article__nota.classList.contains("nota") &&
    	main__article__textboxTitle.textContent ===" "){
    	main__article__title.style.visibility = 'visible' 
    }
    icon__close.classList.remove('hide')               
}


let hideElements = () => {
    main__article__title.classList.add('hide')
    main__article.classList.remove('editor') 
    main__article__nota.classList.add('main__article--nota')
    main__article__nota.classList.remove('nota')
    main__article__nota.style.visibility = 'visible'
    main__article__title.style.visibility = 'hidden'
    icon__close.classList.add('hide')   
}


let storeLocalStorage = (titulo,nota) => {
     let info = {titulo,nota}
    if(info.titulo!="" && info.nota != ""){
     if(localStorage.getItem("datos") != null){
        let aux = JSON.parse(localStorage.getItem("datos"))
        aux.push(info)
        localStorage.setItem('datos', JSON.stringify(aux))    
     }else{
     	 aux.push(info)
     	 localStorage.setItem('datos', JSON.stringify(aux))    
     }
   }
}

let showDataLocalStorage = (search = "") => {
	if(localStorage.getItem("datos") != null){
       if(localStorage.getItem("datos").length > 0){
        let dataKeep =  JSON.parse(localStorage.getItem("datos"))
        travelData(dataKeep,search)  
	   }
	}
}


let travelData = (data,search = "") => {
  if(search == ""){
     template.innerHTML = ""	
     data.map(item => {
     	temp = templateHTML.replace(':titulo:', item.titulo)
     	                        .replace(':nota:',item.nota)           
     	template.innerHTML +=  temp                        
     })
   }else{
   	  let filterData = data.filter(item => item.titulo.includes(search))
   	  filterData.map(item => {
     	temp2 = templateHTML.replace(':titulo:', item.titulo)
     	                        .replace(':nota:',item.nota)           
     	template.innerHTML =  temp2                        
     })
   }  
}


let searchNotes = (e) => {
	let search = e.target.value
	console.log(search)
	showDataLocalStorage(search)
}


//Funcion que se ejecutara cuando el navegador recargue
(function(){
   showDataLocalStorage()
})()







/*Eventos*/
main__article__textbox.addEventListener("focus", (e) => {
    showElements()
})


input_search.addEventListener("keyup",searchNotes)


icon__close.addEventListener('click',(e) => {
	let titulo = main__article__textboxTitle.textContent
    let nota = main__article__textbox.textContent
    storeLocalStorage(titulo,nota)
    location.reload()
    hideElements()
    main__article__textbox.innerHTML = " "
    main__article__textboxTitle.innerHTML = " "
})


main__article__textbox.addEventListener("keypress",(e) => {
     main__article__nota.style.visibility = 'hidden'	
})

main__article__textbox.addEventListener("blur",(e) => {
	 if(main__article__textbox.textContent === ""){
	 	main__article__nota.style.visibility = 'visible'	
	 }
})


main__article__textboxTitle.addEventListener("keypress", (e) => {
     main__article__title.style.visibility = 'hidden' 
})


main__article__textboxTitle.addEventListener("blur", (e) => {
	  if(main__article__textboxTitle.textContent === ""){
	  	  main__article__title.style.visibility = 'visible' 
	  }
})









