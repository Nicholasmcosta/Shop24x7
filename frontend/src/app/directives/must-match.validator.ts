import { FormGroup } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup)=>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        //return null if controls haven't initialized yet
        if (!control || !matchingControl){
            return null;
        }

        //return null if another validators has already found an error on matchingControl
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            return null;
        }

        //set error on matchingControl of validation fails
        if (control.value!= matchingControl.value){
            matchingControl.setErrors({mustMatch: true});
        } else{
            matchingControl.setErrors(null);
        }

    }
}