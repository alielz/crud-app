import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotesComponent } from './notes/notes';

export const routes: Routes = [
{
	path: '',
	component: Home
},
{
	path: 'notes',
	component: NotesComponent
}
];
