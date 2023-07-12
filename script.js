const uploadbox = document.querySelector(".upload-box"),
previewimg = uploadbox.querySelector("img"),
fileinput = uploadbox.querySelector("input"),
widthinput=document.querySelector(".width input"),
heightinput=document.querySelector(".height input"),
ratioinput=document.querySelector(".ratios input"),
qualityinput=document.querySelector(".quality input"),
downloadbtn=document.querySelector(".download-btn");
let ogimgratio;
const loadfile=(e)=>{
    const file=e.target.files[0]
    previewimg.src=URL.createObjectURL(file);
    previewimg.addEventListener("load", ()=>{
        document.querySelector(".wrapper").classList.add("active");
        widthinput.value=previewimg.naturalWidth;
        ogimgratio=previewimg.naturalWidth/previewimg.naturalHeight
        heightinput.value=previewimg.naturalHeight;
    })
}
    // console.log(file);
widthinput.addEventListener("keyup", ()=>{
    const height=ratioinput.checked?widthinput.value / ogimgratio : heightinput.value;
    heightinput.value=Math.floor(height);
})
heightinput.addEventListener("keyup", ()=>{
    const width=ratioinput.checked?heightinput.value * ogimgratio : widthinput.value;
    widthinput.value=Math.floor(width);
})

const resizeanddownload=()=>{
    const canvas =document.createElement("canvas");
    const a=document.createElement("a");
    const ctx=canvas.getContext("2d");
    canvas.width=widthinput.value;
    canvas.height=heightinput.value;
    ctx.drawImage(previewimg , 0 , 0 , canvas.width , canvas.height);
    // document.body.appendChild(canvas);
    const imgquality=qualityinput.checked? 0.9:1.0;
    a.href=canvas.toDataURL("images/jpeg", imgquality);
    a.download=new Date().getTime();
    a.click();
}


downloadbtn.addEventListener("click", resizeanddownload);
fileinput.addEventListener("change", loadfile);
uploadbox.addEventListener("click" , ()=> fileinput.click());
