import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../notes.service';
import { Note } from '../notes.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
	selector: 'notes',
	imports: [CommonModule, FormsModule],
	templateUrl: './notes.html',
	styleUrl: './notes.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {

	private notesService = inject(NotesService);
	notes$!: Observable<Note[]>;

	editingNote: Note | null = null;
	editedTitle: string = '';
	editedContent: string = '';
	isLoading = signal(false);

	ngOnInit() {
		this.refreshNotes();
	}

	refreshNotes() {
		this.notes$ = this.notesService.getNotes();
	}

	startEdit(note: Note) {
		this.editingNote = { ...note };           // make a shallow copy
		this.editedTitle = note.title ?? '';      // ensure string
		this.editedContent = note.content ?? '';  // ensure string
	}

	saveEdit() {
		if (this.editingNote) {
			this.isLoading.set(true);
			const updated: Note = {
				...this.editingNote,
				title: this.editedTitle,
				content: this.editedContent
			};
			this.notesService.updateNote(updated).then(() => {
				this.isLoading.set(false);
				this.editingNote = null;
				this.refreshNotes();
			});
		}
	}

	cancelEdit() {
		this.editingNote = null;
	}

	deleteNote(id: string) {
		this.notesService.deleteNote(id).then(() => {
			this.refreshNotes();
		});
	}

}
