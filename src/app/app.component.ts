import { Component, OnInit } from '@angular/core';
import { Actor } from './Entidades/Actor';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Perfiles } from './Perfiles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Form';

  userForm: FormGroup;

  AllPerfiles = [
    new Perfiles('dev', 'Developer'),
    new Perfiles('man', 'Manager'),
    new Perfiles('dir', 'Director')
  ]

  AllSubPerfiles = [];




  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Nombre: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      Apellido: new FormControl('', [Validators.required, Validators.maxLength(55)]),
      Edad: new FormControl(20, Validators.required),
      Pais: new FormControl({ value: 'Argentina', disabled: true }),
      Perfil: new FormControl(null, [Validators.required]),
      SubPerfil: new FormControl(null, [Validators.required])
    });
  }

  get perfil() {
    return this.userForm.get('Perfil');
  }

  get subperfil() {
    return this.userForm.get('SubPerfil');
  }

  onPerfilChange() {
    let profile: Perfiles = this.perfil.value;
    console.log('Cambio en Control: ' + profile.prName);
    console.log('Cambio en Control: ' + profile.prId);

    if (profile.prId === 'dev') {
      this.AllSubPerfiles = [
        new Perfiles('dev', 'Developer2'),
        new Perfiles('man', 'Manager2')
      ]
    }
    if (profile.prId === 'man') {
      this.AllSubPerfiles = [
        new Perfiles('man1', 'man 1'),
        new Perfiles('man2', 'man 2')
      ]
    }

    if (profile.prId === 'dir') {
      this.AllSubPerfiles = [
        new Perfiles('dir1', 'dir 1'),
        new Perfiles('dir2', 'dir 2')
      ]
    }

    this.userForm.patchValue({ SubPerfil: this.AllSubPerfiles[0] });
  }

  onSubPerfilChange() {
    let profile: Perfiles = this.subperfil.value;
    console.log('Cambio en Control: ' + profile.prName);
    console.log('Cambio en Control: ' + profile.prId);

  }



  setAllValue() {
    this.userForm.setValue({ Nombre: 'Jose ', Apellido: 'Perez', Edad: '23', Pais: 'Australia', Perfil: this.AllPerfiles[1], SubPerfil: null });
  }

  setOneValue() {
    this.userForm.patchValue({ Nombre: 'Diego Sebastian ' });
  }

  resetForm() {
    this.userForm.reset({ Nombre: '', Apellido: '', Edad: '', Pais: '' });
  }

  onFormSubmit() {
    console.log(this.userForm);
    console.log('Nombre:' + this.userForm.get('Nombre').value);
    console.log('Apellido:' + this.userForm.get('Apellido').value);
  }

}
