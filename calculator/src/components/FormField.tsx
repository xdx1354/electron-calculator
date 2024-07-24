import React, { useState } from 'react';

function FormField() {
    // State variables for each form field
    const [firstName, setFirstName] = useState('');

    // Handler for form submission
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Prevent the default form submission
        const formData = { firstName };
        // Handle form submission logic here
        console.log(formData);
        alert(JSON.stringify(formData, null, 2));
    };

    // Handlers for input changes
    const handleFirstNameChange = (event:any) => {
        setFirstName(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <br/>
                <input
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="A"
                />

            </form>
        </div>
    );
}

export default FormField;
