import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../notes.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private notesService = inject(NotesService);
  notes$ = this.notesService.getNotes();
  newNote: Partial<Note> = { title: '', content: '' };
	isLoading = signal(false);

  ngOnInit(): void {
    this.notes$ = this.notesService.getNotes();
  }

  submitNote() {
    if (this.newNote.title && this.newNote.content) {
		this.isLoading.set(true);
      this.notesService.addNote(this.newNote).then(() => {
        this.newNote.title = '';
				this.newNote.content = '';
   			this.notes$ = this.notesService.getNotes();
				this.isLoading.set(false);
      });
    }
  }
	
}
