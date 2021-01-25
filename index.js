console.log("This is my project 6");
//Utility functions to get the DOM elements from the strings
function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
let addedParamCounts=0;
let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display='none';
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display='none';
    document.getElementById('requestJsonBox').style.display='block';
})
let paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display='block';
    document.getElementById('requestJsonBox').style.display='none';
})
let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=` <div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCounts+2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCounts+2}" placeholder="Enter Parameter ${addedParamCounts+2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCounts+2}" placeholder="Enter Paramater ${addedParamCounts+2} Value">
    </div>
    <button class="btn-primary deleteParam">-</button>
</div>`;
let paramElement=getElementFromString(string);
params.appendChild(paramElement);
let deleteParam=document.getElementsByClassName('deleteParam');
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
}
addedParamCounts++;
})
let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML="Please wait! We are fetching the data.";
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;
   
    if(contentType=='params'){
        data={};
        for(i=0;i<addedParamCounts+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
                let key=document.getElementById('parameterKey'+(i+1)).value;
                let value=document.getElementById('parameterValue'+(i+1)).value;
                data[key]=value;
            }
            data=JSON.stringify(data);
        }
    }
    else{
        data=document.getElementById('requestJsonText').value;
    }
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);
    if(requestType=='GET'){
        fetch(url,{
            method:'GET'
        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then(response=>response.text()).then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    }
})