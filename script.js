const numberBtn = document.getElementById("numberBtnHolder");
let pastNum = 0;
let curNum = 0;
let totalPrev = 0;
let displayPrev = 0;
let continued = false;
let finalNum = 0;
numberBtnGen();
//create Button automatically
function numberBtnGen()
{
    let numbersOfBtn = [];
    for(let i = 9 ; i > -1;i--)
    {
        numbersOfBtn[i] = document.createElement("button");
        numberBtn.appendChild(numbersOfBtn[i]);
        numbersOfBtn[i].className = "numberButtons";
        numbersOfBtn[i].value = i;
        numbersOfBtn[i].textContent = i;
        if(numbersOfBtn[i].value == 0)
        {
            numbersOfBtn[0].style.gridColumn = "span 2";
        }
        numbersOfBtn[i].dataset.key = i;
    }
    let dotBtn = document.createElement("button");
    numberBtn.appendChild(dotBtn);
    dotBtn.className = "numberButtons";
    dotBtn.value = ".";
    dotBtn.textContent = ".";
    dotBtn.dataset.key = ".";
}

window.addEventListener('keydown',(event)=>
{
    const key = document.querySelector(`button[data-key='${event.key}']`);
    // console.log(event.key);
    key.click();
});

const leftSideBtn = document.getElementById("numberBtnHolder");
const screenDisplay = document.getElementById("cur");
const prevNum = document.getElementById("prev");



leftSideBtn.addEventListener("click",(event) =>
{
    
    const isBtn = event.target.nodeName === 'BUTTON';
    if(!isBtn)
    {
        return;
    }
    switch(event.target.value)
    {
        case event.target.value: 
            if(screenDisplay.textContent.includes('.') && event.target.value == '.')
            {
                return;
            }

            if(screenDisplay.textContent == 0 && !isBtn)
            {
                screenDisplay.textContent = event.target.value;
            }
            
            else if(prevNum.textContent != "" && prevNum.textContent.includes("="))
            {
                prevNum.textContent = "";
                screenDisplay.textContent = event.target.value;
            }

            else if(screenDisplay.textContent == 0 && isBtn && event.target.value == ".")
            {
                screenDisplay.textContent += event.target.value;
            }
            else if(screenDisplay.textContent == 0 && isBtn && !screenDisplay.textContent.includes('.'))
            {
                screenDisplay.textContent = event.target.value;
            }
            else if(prevNum.textContent.includes("="))
            {
                continued = false;
            }
            else
            {
                screenDisplay.textContent += event.target.value;
            }
            continued = false;
            break;
        default:
            break;
    }
    
    // console.log("clicked");
});

const deleteAndClearBtn = document.getElementById("delete-clearBtn");
deleteAndClearBtn.addEventListener("click",(event)=>
{
    const isBtn = event.target.nodeName === 'BUTTON';
    if(!isBtn)
    {
        return;
    }
    switch(event.target.value)
    {
        case "clear":
            screenDisplay.textContent = 0;
            prevNum.textContent = "";
            pastNum = 0;
            curNum = 0;
            totalPrev = 0;
            displayPrev = 0;
            lastOp = "none";
            curOp = "none";
            finalNum = 0;
            break;
        case "deletes":
            if(screenDisplay.textContent == 0 && !screenDisplay.textContent.includes('.'))
            {
                return;
            }
            if(!screenDisplay.textContent.includes('.'))
            {
                screenDisplay.textContent = Math.floor(screenDisplay.textContent / 10);
            }
            else
            {
                screenDisplay.textContent = screenDisplay.textContent.slice(0,-1);
            }
            break;
        default:
            break;
    }
});


let lastOp = "none";
let curOp = "none";
const calcFormulaBtn = document.getElementById("formulaBtnHolder");
calcFormulaBtn.addEventListener("click",(event)=>
{

    const isBtn = event.target.nodeName === 'BUTTON';
    if(!isBtn)
    {
        return;
    }
    
    switch(event.target.value)
    {
        case "plus":
            continued = true;
            displayPrev = totalPrev;
            lastOp = curOp;
            curOp = "+";
            pastNum = screenDisplay.textContent;
            if(lastOp != "none")
            {
                lastActionOp(lastOp,event);
            }
            else
            {
                prevNum.textContent = screenDisplay.textContent + " " + "+";
                totalPrev = Number(screenDisplay.textContent);
                prevNum.textContent = totalPrev + " " + event.target.textContent;
                screenDisplay.textContent = 0;
            }

            break;
        case "subtract":
            continued = true;
            displayPrev = totalPrev;
            lastOp = curOp;
            curOp = "-";
            pastNum = screenDisplay.textContent;
            if(lastOp != "none")
            {
                lastActionOp(lastOp,event);
            }
            else
            {
                prevNum.textContent = screenDisplay.textContent + " " + "-";
                totalPrev = Number(screenDisplay.textContent);
                prevNum.textContent = totalPrev + " " + event.target.textContent;
                screenDisplay.textContent = 0;
            
            }
            break;
        case "multiply":
            continued = true;
            displayPrev = totalPrev;
            lastOp = curOp;
            curOp = "*";
            pastNum = screenDisplay.textContent;
            if(lastOp != "none")
            {
                lastActionOp(lastOp,event);
            }
            else
            {
                prevNum.textContent = screenDisplay.textContent + " " + "*";
                totalPrev = Number(screenDisplay.textContent);
                prevNum.textContent = totalPrev + " " + event.target.textContent;
                screenDisplay.textContent = 0;
            }
            break;
        case "divide":
            continued = true;
            displayPrev = totalPrev;
            lastOp = curOp;
            curOp = "/";
            pastNum = screenDisplay.textContent;
            if(lastOp != "none")
            {
                lastActionOp(lastOp,event);
            }
            else
            {
                prevNum.textContent = pastNum + " " + "/";
                totalPrev = Number(screenDisplay.textContent);
                prevNum.textContent = totalPrev + " " + event.target.textContent;
                screenDisplay.textContent = 0;
            }
            break;
        case "equal":
            curNum = screenDisplay.textContent;
            if(curOp != "none")
            {
                lastActionOpEqual(curOp);
            }
            
            break;    
        default:
            break;
    }
});

function lastActionOp(lastOperation,event)
{
    if(screenDisplay.textContent == 0 && prevNum.textContent.includes("/") )
    {
        alert("no 0 division");
        screenDisplay.textContent = 0;
        prevNum.textContent = "";
        pastNum = 0;
        curNum = 0;
        totalPrev = 0;
        displayPrev = 0;
        lastOp = "none";
        curOp = "none";
    }
    else
    {
        if(lastOperation == "+")
        {
            totalPrev += Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent = finalNum + " " + event.target.textContent;
            screenDisplay.textContent = 0;
        }
        else if(lastOperation == "-")
        {
            totalPrev -= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent = finalNum + " " + event.target.textContent;
            screenDisplay.textContent = 0;
        }    
        else if(lastOperation == "*")
        {
            totalPrev *= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent = finalNum + " " + event.target.textContent;
            screenDisplay.textContent = 0;
        }
       else if(lastOperation == "/")
        {
            totalPrev /= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent = finalNum + " " + event.target.textContent;
            screenDisplay.textContent = 0;
        }
    }

}

function lastActionOpEqual(currentOperations)
{

    if(screenDisplay.textContent == 0 && prevNum.textContent.includes("/"))
    {
        alert("no 0 division");
        screenDisplay.textContent = 0;
        prevNum.textContent = "";
        pastNum = 0;
        curNum = 0;
        totalPrev = 0;
        displayPrev = 0;
        lastOp = "none";
        curOp = "none";
        finalNum = 0;
    }
    else
    {
        if(currentOperations == "+" )
        {
            pastNum = curNum;
            curNum = Number(screenDisplay.textContent);
            totalPrev += Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent += " " + screenDisplay.textContent + " " + "=";
            screenDisplay.textContent = finalNum;
            // totalPrev = 0;
        }
        else if(currentOperations == "-" )
        {
            pastNum = curNum;
            curNum = Number(screenDisplay.textContent);
            totalPrev -= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent += " " + screenDisplay.textContent + " " + "=";
            screenDisplay.textContent = finalNum;
            // totalPrev = 0;
        }    
        else if(currentOperations == "*")
        {
            pastNum = curNum;
            curNum = Number(screenDisplay.textContent);
            totalPrev *= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent += " " + screenDisplay.textContent + " " + "=";
            screenDisplay.textContent = finalNum;
            // totalPrev = 0;
        }
        else if(currentOperations == "/" )
        {
            pastNum = curNum;
            curNum = Number(screenDisplay.textContent);
            totalPrev /= Number(screenDisplay.textContent);
            finalNum = Math.floor(totalPrev);
            prevNum.textContent += " " + screenDisplay.textContent + " " + "=";
            screenDisplay.textContent = finalNum;
            // totalPrev = 0;
        }
    }
    lastOp = "none";
    curOp = "none";
}
//Figure out ways to add keyboard support into the calculator