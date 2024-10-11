import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit{

  constructor( 
    private fb: FormBuilder
  ){}


  ngOnInit(): void {
    this.myForm.reset( );
  }


  public isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
  }

  public getFieldError(field: string): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors =  this.myForm.controls[field].errors || {}

    for ( const key of Object.keys(errors) ) {

      switch( key ){

        case 'required':
          return 'Este campo es requerido';
        
        case 'minLength':
          return `Minimo ${ errors['minLength'].requiredLength } caracteres.`;

      }
    }

    return null;
  }


  // public myForm: FormGroup = new FormGroup({
  //   name:      new FormGroup(''),
  //   price:     new FormGroup(0),
  //   inStorage: new FormGroup(0),
  // });

  public myForm: FormGroup = this.fb.group({
    name:     ['', [Validators.required, Validators.minLength(3)] ],
    price:    [0, [Validators.required, Validators.min(0)] ],
    inStorage:[0, [Validators.required, Validators.min(0)] ],
  });


  
  public onSave(): void{

    //Validar formilario no sea invalido
    if( this.myForm.invalid ) {

      this.myForm.markAllAsTouched() //Marcar que todos los campos fueron tocados
    
      return;
    }

    console.log(this.myForm.value);

    // Resetear formulario
    // this.myForm.reset({ price: 0, inStorage: 0 }); //con valores
    this.myForm.reset();
  }

}
