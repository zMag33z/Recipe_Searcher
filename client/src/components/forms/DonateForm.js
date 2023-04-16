//  code example given by GeeksforGeeks https://www.geeksforgeeks.org/how-to-integrate-stripe-payment-gateway-in-node-js/
//  here i will create a form to show and hide modal style for the donation made by the user

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

//RENAME THIS IMPORT TO MATCH FOR QUERY TO ADD DONATION
import { ADD_DONATION } from '../../utils/mutations';


export default function DonateForm() {
    const [formState, setFormState] = useState({
        fullname: '',
        email: '',
        amount: ''
    });
    
    const [addDonation] = useMutation(ADD_DONATION);
    
    const handleFormSubmit = async (event) => {
        console.log(formState);
        event.preventDefault();
    
        try {
            await addDonation({
                variables: { donation: { ...formState } }
            })
    
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleChange = (event) => {
        // CHANGE IF'S TO SWITCH FOR THREE CASES
        const { name, value } = event.target;
console.log(name)
        switch(name){
            case 'fullname':{
                return setFormState({ ...formState, [name]: value });
            }
            case 'email':{
                return setFormState({ ...formState, [name]: value });
            }
            case 'amount':{
                return setFormState({ ...formState, [name]: value });
            }
        }

    };

  return (
    <section className='box-share donate-now'>
        <h3>Donate Now</h3>
        <form
            className='box-share donate-form'
            onSubmit={handleFormSubmit}
        >
            <div className='donator'>
                <label>First and Last Names</label>
                <input
                    type="text"
                    id="name"
                    name="fullname"
                    placeholder='Enter full name'
                    value={formState.fullname}
                    onChange={handleChange}
                />
            </div>
            <div className='donator'>
                <label>Email to receive Receipt</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter valid email address'
                    autoComplete="on"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='donator'>
                <label>Enter Amount to Donate</label>
                <input
                    type="text"
                    name="amount"
                    id="currency-field"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    data-type="currency"
                    placeholder="Enter donation amount"
                    value={formState.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='donator'>
                <label>Would you like to be added to our 'Donators List'?</label>
                <p className='check-list'>check box:</p>
                <input
                    type="checkbox"
                    id="donate-list"
                    name="vehicle1"
                    value={true} />
                </div>
            <input type="submit" value="Submit" />
        </form>
    </section>
  );
}