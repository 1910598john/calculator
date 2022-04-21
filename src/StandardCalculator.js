import React, { useState } from "react";

function StandardCalculator(){
    const [num, setNum] = useState(0);
    const [operator, setOperator] = useState();
    const [num2, setNum2] = useState();
    const [beenErased, setBeenErased] = useState(false);
    const [beenCalculated, setBeenCalculated] = useState(false);

    //
    const handleSetNum = (n) => {
      let elem = document.getElementById("num");

      if (operator != null) {
        setNum2((r) =>  {
          var res;

          if (((r === num || r === 0) && (n !== ".")) && (beenErased !== true)) {
            res = n;
            if (beenErased !== true) {
              setBeenErased(true);
            }
          }


          else if (((r === num) && (n === ".")) && (beenErased !== true)) {
            res = "0" + n;
            if (beenErased !== true) {
              setBeenErased(true);
            }
          }
          

          else if (r === 0 && n === 0) {
            res = n;
          }

          else {
            res = r.toString() + n;
            if (res.charAt(0) === "0") {
              res = res.slice(1);
            }
          }

          return res;
          
        })
      }

      else {
        if (elem.style.fontSize === "15px") {
          elem.style.fontSize = "30px";
        }
        setNum((r) =>  {
          var res;
          if (beenCalculated !== false && n !== ".") {
            setBeenCalculated(false);
            return n;
          }

          
          else if (beenCalculated !== false && n === ".") {
            setBeenCalculated(false);
            return "0" + n;
          }
          
          

          else {
            

            if (r === 0 && n !== ".") {
              r = n;
              return r;
            }
            
            else if (r.length === 16) {
              res = r;
              return res;
            }
            else {
              res = r.toString() + n;
              return res;
            }
          }
        })
      }
    }
  
    //
    const handleSetOperator = (op) => {
      if (beenCalculated !== false) {
        setBeenCalculated(false);
      }
      setNum2(num);
      document.getElementById("num").style.fontSize = "15px";
      setOperator((o) => {
        let operator = o;
        switch (op) {
          case "add":
            operator = "+";
            break;
          case "subtr":
            operator = "-";
            break;
          case "multi":
            operator = "*";
            break;
          case "div":
            operator = "/";
            break;
          case "modulo":
            operator = "%";
            break;
          default:
            operator = "";
            break;
        }
        return operator;
      })
    }

    //
    const handleEraseFunction = () => {
      if (operator != null) {
        setNum2((r) => {
          var str = r.toString();
          if (str.length === 1) {
            return 0;
          }
          else {
            var erase = str.slice(0, -1);
            return erase;
          }
        })
      }
      else {
        setNum((r) => {
          var str = r.toString();
          if (str.length === 1 || beenCalculated === true) {
            return 0;
          }
          else {
            var erase = str.slice(0, -1);
            return erase;
          }
        })
      }
    }
    //
    const Cfunction = () => {
      setNum(0);
      setNum2();
      setOperator();
      setBeenErased(false);
      document.getElementById("num").style.fontSize = "30px";
    }
    //
    const CEfunction = () => {
      if (num != null && operator != null) {
        setNum2(0);
      }
      else {
        setNum(0);
        setNum2();
        setOperator();
        setBeenErased(false);
      }
    }
    //
    const handleCalculation = () => {
      document.getElementById("num").style.fontSize = "30px";
      document.getElementById("result").style.cursor = "pointer";
      setNum((r) => {

        if (num2 != null && operator != null) {
          var calc, n1, n2;
        
          n1 = r.toString();
          n2 = num2.toString();

          //first numbers to be calculated
          if (n1.includes(".")) {
            n1 = parseFloat(r);
          }
          else {
            n1 = parseInt(r);
          }
          

          //second numbers to be calculated
          if (n2.includes(".")) {
            n2 = parseFloat(num2);
          }
          else {
            n2 = parseInt(num2);
          }
          switch (operator) {
            case "+":
              calc = n1 + n2;
              break;
            case "-":
              calc = n1 - n2;
              break;
            case "*":
              calc = n1 * n2;
              break;
            case "/":
              calc = n1 / n2;
              break;
            case "%":
              calc = n1 % n2;
              break;
            default:
              calc = "";
              break;
          }
          if (n1 === 0 && n2 === 0) {
            document.getElementById("num").style.fontSize = "15px";
            return "Result is undefined";
          }
          let res = calc.toString();
          
          if (res.length > 16) {
            res = res.slice(0, 20);
          }
          setNum2();
          setOperator();
          setBeenCalculated(true);
          setBeenErased(false);

          return res;
          
        }
        else {
          return r;
        }

      })
      
    }
    //handle decimal point
    const handleDecimalPoint = () => {
      let str = num.toString();
      if (!str.includes(".")) {
        handleSetNum(".");
      }
    }

    //copy result to clipboard
    const copyClipboard = () => {
      let result = num.toString();
      navigator.clipboard.writeText(result)
      .then(() => {
        alert("RESULT COPIED : " +  result);
        document.getElementById("result").style.cursor = "auto";
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
      
    }
     
  
    return (
        <>
          <div className="standard-calculator standard" id="standard-calculator">
              <div className="result">
                <div className="res-wrapper result-container" id="result" onClick={copyClipboard}>
                  <div className="res num" id="num"><span>{num} {operator}</span></div>
                  <div className="num2" id="num2"><span>{num2}</span></div>
                </div>
              </div>
              <div className="buttons" id="buttons">
                <div className="buttons-wrapper">
                    <div className="button btn cell" onClick={CEfunction}>
                        <span id="CE">CE</span>
                    </div>
                    <div className="button btn cell" onClick={Cfunction}>
                        <span id="C">C</span>
                    </div>
                    <div className="button btn cell" onClick={handleEraseFunction}>
                        <span id="erase">Delete</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetOperator("div")}>
                        <span id="divide">/</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(7)}>
                        <span id="seven">7</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(8)}>
                        <span id="eight">8</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(9)}>
                        <span id="nine">9</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetOperator("multi")}>
                        <span id="multiply">*</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(4)}>
                        <span id="four">4</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(5)}>
                        <span id="five">5</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(6)}>
                        <span id="six">6</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetOperator("subtr")}>
                        <span id="subtract">-</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(1)}>
                        <span id="one">1</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(2)}>
                        <span id="two">2</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(3)}>
                        <span id="three">3</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetOperator("add")}>
                        <span id="addition">+</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetOperator("modulo")}>
                        <span id="percent">%</span>
                    </div>
                    <div className="button btn cell" onClick={() => handleSetNum(0)}>
                        <span id="zero">0</span>
                    </div>
                    <div className="button btn cell" onClick={handleDecimalPoint}>
                        <span id="point">.</span>
                    </div>
                    <div className="button btn cell" onClick={handleCalculation}>
                        <span id="equal">=</span>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default StandardCalculator;