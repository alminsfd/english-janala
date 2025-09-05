const Api1=()=>{
    let Url_1="https://openapi.programming-hero.com/api/levels/all"
fetch(Url_1)
.then(res=> res.json())
.then(data=>display(data.data))

}

loadingdatabylevels=(id)=>{
let Url_2=`https://openapi.programming-hero.com/api/level/${id}`
fetch(Url_2)
.then(res=>res.json())
.then(data=> wordLoad(data.data))
}

const wordLoad=(words)=>{
    const wordContainer=document.getElementById("word_section")
    wordContainer.innerHTML=""
    words.forEach(word=>{
        console.log(word)
        const div=document.createElement("div")
        // div.innerHTML=``
        
    })

}
const display=(lessons)=>{
    const levels=document.getElementById("lavel_container")
    levels.innerHTML=""
    lessons.forEach(element => {
    let div=document.createElement("div")
    div.innerHTML=`
    <button class="btn btn-outline btn-primary mx-3 my-3"  onclick="loadingdatabylevels(${element.level_no})" ><i class="fa-brands fa-readme"></i>Lesson ${element.level_no}</button>
    `
    levels.appendChild(div)
    });

}


Api1()