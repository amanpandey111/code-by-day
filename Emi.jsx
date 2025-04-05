import React, { useState } from 'react'
import './Emi.css'

const Emi = () => {
    let [loan_amount,set_loan] = useState(100000)
    let [roi,set_roi] = useState(6.5)
    let [loan_tenure,set_loan_tenure] = useState(5)
    // console.log(loan_amount);

    const handleChange = (e) =>{
        // console.log(typeof(e.target.value));
        let val = parseInt((e.target.value))
        if(val>=1 && val<=1000000000){
            set_loan(val)
        }
        else if(val>1000000000){
            set_loan(1000000000)
        }else{
            set_loan(0)
        }
        
    }

    const handleRoi = (e) => {
        console.log(e.target.value.length);
        let update_one = String(e.target.value).replace(/^0+/, '');
        console.log(update_one);
        let updated_one1 = ""
        for(let i=0; i<update_one.length; i++){
            if(update_one[i]=="."){
                updated_one1+=update_one[i]
                updated_one1+=update_one[i+1]
                // updated_one1+=update_one[i+2]
                break
            }else{
                updated_one1+=update_one[i]
            }
        }
        // console.log(update_one);
        // console.log(updated_one1);
        
        let roi_alue = Number(e.target.value);
        // console.log(roi_alue);
        if (roi_alue >= 1 && roi_alue <= 30) {
            set_roi(updated_one1);
        } else if (roi_alue > 30) {
            set_roi(30);
        } else {
            set_roi(0);
        }
        
    };
    

    const handleLoan = (e)=>{
        let updated_one = e.target.value.replace(/^0+/, '')
        // for(let i=0;i<e.target.value.length;i++){
        //     if(e.target.value[i] !== "0"){
        //         updated_one += e.target.value[i]
        //     }
        // }
        // console.log(updated_one);

        let new_updated = ""

        for(let i=0;i<updated_one.length;i++){
            if(updated_one[i+1] == "."){
                new_updated+=updated_one[i]
                new_updated+=updated_one[i+1]
                new_updated+=updated_one[i+2]
                // new_updated+=updated_one[i+3]
                break
            }else{
                new_updated+=updated_one[i]
            }
        }
        // console.log(new_updated);

        let loan_tenure1 = Number(e.target.value)
        // console.log(loan_tenure1);
        
        if(loan_tenure1>=1 && loan_tenure1<=30){
            set_loan_tenure(new_updated)
        }else if(loan_tenure1>30){
            set_loan_tenure(30)
        }
        else{
            set_loan_tenure(0)
        }
    }

    // let r = Number(roi)/(12*100)
    // let n = Number(loan_tenure) * 12
    // let emi;
    // if (r === 0) {
    //     emi = loan_amount / n;
    // } else {
    //     emi = loan_amount * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
    // }
    // let total_payment = emi * n
    // let total_interst = total_payment - loan_amount

    let r = Number(roi) / (12 * 100);
    let n = Number(loan_tenure) * 12;

    let emi = 0;
    let total_payment = 0;
    let total_interst = 0;

    if (n === 0) {
        emi = 0;
        total_payment = 0;
        total_interst = 0;
    } else if (r === 0) {
        emi = loan_amount / n;
        total_payment = emi * n;
        total_interst = total_payment - loan_amount;
    } else {
        emi = loan_amount * (r * ((1 + r) ** n)) / (((1 + r) ** n) - 1);
        total_payment = emi * n;
        total_interst = total_payment - loan_amount;
    }

    const radius = 60; 
    const circumference = 2 * Math.PI * radius; // Formula for circumference: 2πr
    const strokeOffset = isNaN(roi) || isNaN(loan_tenure)
    ? 0
    : circumference - ((Number(roi) + Number(loan_tenure)) / 100) * circumference;

    
  return (
    <div id='parent_form'>
        <div>
            <div className='common_mt'>
                <div className='common_flex'>
                    <label className='common_label'>Loan Amount</label>
                    <input className='numbered_input' type="number" name='loan_amount' min={100000} max={100000000} value={loan_amount} onChange={handleChange}/> 
                </div>
                <br />
                <input type="range" name="loan_amount" min={100000} max={100000000} value={loan_amount}
                onChange={handleChange} className='common_range'
                id="" />
                
            </div>
            <div className='common_mt'>
                <div className='common_flex'>
                    <label className='common_label'>Rate Of Interest</label>
                    <input className='numbered_input' type="number" name='roi' min={1} max={30} value={roi} onChange={handleRoi}   /> 
                </div>
                <br />
                <input type="range" name="roi" min={1} max={30} value={roi}
                onChange={handleRoi} className='common_range'
                id="" />
            </div>
            <div className='common_mt'>
                <div className='common_flex'>
                    <label className='common_label'>Loan Tenure</label>
                    <input className='numbered_input' type="number" name='loan_tenure' min={1} max={30} value={loan_tenure} onChange={handleLoan}   /> 
                </div>
                <br />
                <input type="range" name="loan_tenure" min={1} max={30} value={loan_tenure}
                onChange={handleLoan} className='common_range'
                id="" />
            </div>
            <div className='common_mt' id='common_flex2_parent'>
                <div className='common_flex2'>
                    <p className='common_para_text'>Monthly EMI</p>
                    <p className='common_para_num'>₹{Math.trunc(emi)}</p>
                </div>
                <div className='common_flex2'>
                    <p className='common_para_text'>Principal amount</p>
                    <p className='common_para_num'>₹{loan_amount}</p>
                </div>
                <div className='common_flex2'>
                    <p className='common_para_text'>Total interest</p>
                    <p className='common_para_num'>₹{Math.trunc(total_interst)}</p>
                </div>
                <div className='common_flex2'>
                    <p className='common_para_text'>Total amount</p>
                    <p className='common_para_num'>₹{Math.trunc(total_payment)}</p>
                </div>
            </div>
        </div>
        <div>  
            <div className='common_flex_span'>
                <div>
                    <span className='span1'></span> <span className='common_span_text'>Principle amount</span>
                </div>
                <div>
                    <span className='span2'></span> <span className='common_span_text'>Interest amount</span>
                </div>
            </div>
            <svg width="250" height="250">
                {/* Background Circle */}
                <circle
                cx="150"
                cy="130"
                r={radius}
                stroke="#ddd"
                strokeWidth="20"
                fill="none"
                />
                {/* Progress Circle */}
                <circle
                cx="150"
                cy="130"
                r={radius}
                stroke="blue"
                strokeWidth="20"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                //   strokeLinecap="round"
                transform="rotate(-90 150 130)" // Rotate to start from top
                    />
            </svg>
        </div>
    </div>
    
  )
}

export default Emi