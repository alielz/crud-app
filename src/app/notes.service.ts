import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Note } from './notes.model';
import { Observable } from 'rxjs';
import { collection as colRef } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notesRef;

  constructor(private firestore: Firestore) {
    this.notesRef = collection(firestore, 'notes');
  }

  getNotes(): Observable<Note[]> {
    return collectionData(this.notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  addNote(note: Partial<Note>) {
    return addDoc(this.notesRef, note);
  }

  updateNote(note: Note) {
    const noteDoc = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDoc, { title: note.title, content: note.content });
  }

  deleteNote(id: string) {
    const noteDoc = doc(this.firestore, `notes/${id}`);
    return deleteDoc(noteDoc);
  }
}
