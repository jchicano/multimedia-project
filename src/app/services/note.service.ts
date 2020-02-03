import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  myCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }

  readNote(): Observable<firebase.firestore.QuerySnapshot> {
    return this.myCollection.get();
  }

  addNote(myNote: note): Promise<firebase.firestore.DocumentReference> {
    return this.myCollection.add(myNote);
  }

  readNoteByID(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.myCollection.doc(id).get();
  }

  // Se podria haber hecho mejor creando un campo id opcional en el tipo note
  updateNote(id: string, data: note): Promise<void> {
    return this.myCollection.doc(id).set(data);
  }

  deleteNote(id: string): Promise<void> {
    return this.myCollection.doc(id).delete();
  }

  // Creando un observable
  readNote2(timer: number = 10000): Observable<note[]> {
    return new Observable((observer) => {
      // observer.next // Devolver valor
      // observer.error() // Devolver error
      // observer.complete() // Cortar ejecucion
      let subscription: Subscription;
      let tempo = setTimeout(() => {
        subscription.unsubscribe();
        observer.error("Timeout"); // Lo que le pasamos al catch
      }, timer);
      subscription = this.readNote().subscribe((lista) => {
        clearTimeout(tempo);
        let listado = [];
        lista.docs.forEach((nota) => {
          listado.push({ id: nota.id, ...nota.data() }); // Uso del spread operator - junta 2 objetos
        });
        observer.next(listado);
        observer.complete();
      });
    });
  }
}
