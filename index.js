const root=document.getElementById("root")
const set=document.querySelector('#set')
const play=document.querySelector('#play')
const size=document.getElementById('size')
const speedElement=document.getElementById('speed')
const texts=document.querySelectorAll('h3')
const success=document.querySelector('.success')

let sizeOfGrid=5
let speed=500

texts[0].textContent=`Current Size of grid is : ${sizeOfGrid}`
texts[1].textContent=`Current Speed in milliseconds is : ${speed}`

const windowWidth = (document.documentElement.clientWidth || window.innerWidth) -150;
const windowHeight = (document.documentElement.clientHeight || window.innerHeight) -150;

const clearDiv=()=>{
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

const makeGrid=(sizeOfGrid)=>{
    let siz=Math.min(windowWidth,windowHeight)/sizeOfGrid
    for(let i=1;i<=sizeOfGrid;i++)
    {
        const rowDiv=document.createElement('div')
        rowDiv.style.display='flex'
        rowDiv.style.alignItems='center'
        rowDiv.className='rowDiv'
        for(let j=1;j<=sizeOfGrid;j++)
        {
            const colDiv=document.createElement('div')
            colDiv.style.margin='2px'
            colDiv.style.display='flex'
            const id=String(i) + String(j)
            colDiv.style.justifyContent='center'
            const img=document.createElement('img')
            img.src='./assets/grass.jpg'
            img.alt='Grass image'
            img.width = siz
            img.height = siz
            img.id=id
            colDiv.appendChild(img)
            rowDiv.appendChild(colDiv)
        }
        root.appendChild(rowDiv)
    }
}

makeGrid(sizeOfGrid)

set.addEventListener('click',()=>{
    if(play.textContent==="Pause") alert("First Pause then Set")
    else
    {
        let sizeVal=size.value
        let speedVal=speedElement.value
        if(sizeVal) sizeOfGrid=sizeVal
        if(speedVal) speed=speedVal
        if(!sizeOfGrid) sizeOfGrid=5
        if(!speed) speed=500
        if(sizeOfGrid<3 || sizeOfGrid>20) alert('Grid Size Not supported , Enter value between 3 and 20')
        else if(speed<100 || speed>2000) alert('Speed not supported , Enter value between 100 and 2000')
        else
        {
            clearDiv()
            makeGrid(sizeOfGrid)
            texts[0].textContent=`Current Size of grid is : ${sizeOfGrid}`
            texts[1].textContent=`Current Speed in milliseconds is : ${speed}`
        }
        size.value=''
        speedElement.value=''
    }
})

let start;
let row,col;
let prevId;

play.addEventListener('click',()=>{
    success.style.display='none'
    texts[0].style.display='block'
    texts[1].style.display='block'
    if(play.textContent==="Play")
    {
        if(start)
        {
            clearInterval(start)
            play.textContent="Play"
            start=null;
        }
        else
        {
            start=setInterval(()=>{
                if(prevId)
                {
                    const prevImg=document.getElementById(prevId);
                    prevImg.src='./assets/grass.jpg'
                }
                row=Math.floor(Math.random()*sizeOfGrid)+1
                col=Math.floor(Math.random()*sizeOfGrid)+1
                const generated_id=String(row)+String(col)
                const img=document.getElementById(generated_id);
                img.src='./assets/beaver2.jpeg'
                prevId=generated_id
            },speed)
            play.textContent="Pause"
        }   
    }
    else
    {
        clearInterval(start);
        start=null;
        play.textContent="Play"
        if(prevId)
        {
            const prevImg=document.getElementById(prevId);
            prevImg.src='./assets/grass.jpg'
            prevId=null
        }
    }
})

root.addEventListener('click',(e)=>{
    if(start)
    {
        const clicked_id=String(e.target.id);
        const generated_id=String(row)+String(col)
        console.log(generated_id,clicked_id);
        if(clicked_id===generated_id)
        {
            console.log(("YES"));
            clearInterval(start)
            start=null
            if(prevId)
            {
                const prevImg=document.getElementById(prevId);
                prevImg.src='./assets/grass.jpg'
                prevId=null
                play.textContent="Play"
            }
            success.style.display='block'
            texts[0].style.display='none'
            texts[1].style.display='none'
        }
    }
})