// Donation form
// add back use effect from react when i get stripe code in  useEffect
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';


// NEED TO GET STRIPE CHECKOUT BEFORE FUNCTIONING TO ADD DONATION TO LIST.
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
 
        const { name, value } = event.target;

        if (name === 'fullname') {
            setFormState({ ...formState, [name]: value });
        }else if(name === 'email'){
            setFormState({ ...formState, [name]: value });
        }else if(name === 'amount'){
            setFormState({ ...formState, [name]: value });
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
                <span>$ </span><input
                    type="text"
                    name="amount"
                    id="currency-field"
                    data-type="currency"
                    placeholder="Amount"
                    autoComplete="off"
                    value={formState.amount}
                    onChange={handleChange}
                    minLength={1}
                    maxLength={3}
                    required
                />
            </div>
            <div className='donator'>
                <label>Would you like to be added to our 'Donators List'?</label>
                <p className='check-list'>check box:</p>
                <input
                    type="checkbox"
                    id="donate-list"
                    name="addToList"
                    value={true} />
                </div>
            <input type="submit" value="Submit" />
        </form>

    </section>
  );
}