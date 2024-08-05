import CustomInput from "../../../components/CustomInput";
import React from "react";

const Form: React.FC = () => {
    return(
        <CustomInput
            key={"krotszy_bok"}
            type={"number"}
            placeholder={"wartość"}
            label={"Krótszy bok"}
            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("krotszy_bok", parseFloat(e.target.value))}
        />
    );
}

export default Form;