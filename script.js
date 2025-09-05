const Api1 = () => {
    let Url_1 = "https://openapi.programming-hero.com/api/levels/all"
    fetch(Url_1)
        .then(res => res.json())
        .then(data => display(data.data))

}

Api1()


loadingdatabylevels = (id) => {
    setspinner(true)
    let Url_2 = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(Url_2)
        .then(res => res.json())
        .then(data => wordLoad(data.data))
    const lessonBtns = document.querySelectorAll(".lesson-btns")
    removeActive( lessonBtns)
    const lessonBtn = document.getElementById(`lesson-btn-${id}`)
    lessonBtn.classList.add("active")

}

const removeActive = (lessons) => {
    lessons.forEach(el=>{
        el.classList.remove("active")
    })

}

const wordLoad = (words) => {
    const wordContainer = document.getElementById("word_section")
    wordContainer.innerHTML = ""
    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full text-center bg-yellow-50 p-10 rounded-xl">
                <img src="./assets/alert-error.png" class="mx-auto mb-3" alt="">
                <p class="text-sm text-[#79716B] mb-4 font-bangla ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla font-bold text-3xl text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `
        setspinner(false)
        return
    }
    words.forEach(word => {
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="card_container bg-white rounded-lg shadow-sm md:py-5 px-3 md:w-xm w-full text-center  ">
                <h2 class="font-bold md:text-3xl text-xl mb-3 pt-10">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-medium md:text-xl text-lg mb-3">Meaning/Pronounciation</p>
                <P class="font-semibold text-[#18181B] font-bangla md:text-3xl text-xl">${word.meaning ? word.meaning : "শব্দের অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "শব্দের উচ্চারণ পাওয়া যায়নি"}</P>
                <div class="icons_container flex justify-between items-center md:mt-15 mt-8 mb-4 mx-4">
                    <button class="cursor-pointer bg-[#1a90ff56] hover:bg-[#1a90ff73] rounded-xl p-2"   onclick="wordDtails(${word.id})" ><i class="fa-solid fa-circle-info"></i></button>
                    <button class="cursor-pointer bg-[#1a90ff56] hover:bg-[#1a90ff73] rounded-xl p-2"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `
        wordContainer.appendChild(div)
    })

    setspinner(false)


}
const display = (lessons) => {
    const levels = document.getElementById("lavel_container")
    levels.innerHTML = ""
    lessons.forEach(element => {
        let div = document.createElement("div")
        div.innerHTML = `
    <button id="lesson-btn-${element.level_no}" class="btn btn-outline btn-primary mx-3 my-3 lesson-btns "  onclick="loadingdatabylevels(${element.level_no})" ><i class="fa-brands fa-readme"></i>Lesson ${element.level_no}</button>
    `
        levels.appendChild(div)
    });


}

const wordDtails = async (id) => {
    const Url_3 = `https://openapi.programming-hero.com/api/word/${id}`
    //   console.log(Url_3)
    const res = await (fetch(Url_3))
    const data = await res.json()
    getDetailes(data.data)

}

const getDetailes = (data) => {
    console.log(data)
    const dynamic = document.getElementById("dynamic")
    dynamic.innerHTML = ""
    let div = document.createElement("div")
    div.innerHTML = `
    <div id="dynamic">
        <h2 class="font-semibold text-3xl mb-10 ">${data.word} ( <i class="fa-solid fa-microphone"></i>:${data.pronunciation})</h2>
        <h3 class="font-semibold text-xl mb-3">Meaning</h3>
        <p class="font-bangla text-xl font-medium mb-6">${data.meaning}</p>
        <h4 class="font-semibold text-2xl mb-3">Example</h4>
        <p class=" text-gray-500 text-lg mb-5">${data.sentence}</p>
        <h5 class="font-bangla font-medium text-2xl mb-3 ">সমার্থক শব্দ গুলো</h5>
        <ul class="flex mb-6">
           ${createElements(data.synonyms)}
        </ul>
    </div>
    
    `
    dynamic.appendChild(div)
    document.getElementById("my_modal_5").showModal()
}

const createElements = (arr) => {
  const htmlElements = arr.map((el) => ` <li class=" text-lg font-light mx-3 bg-[#D7E4EF] p-3 rounded-lg border border-[#a1d0f7] ">${el}</li>`);
  return(htmlElements.join(" "));
};

const setspinner = (status) => {
    if (status) {
        document.getElementById("spiner").classList.remove("hidden")
        document.getElementById("word_section").classList.add("hidden")
    }
    else {
        document.getElementById("spiner").classList.add("hidden")
        document.getElementById("word_section").classList.remove("hidden")
    }
}