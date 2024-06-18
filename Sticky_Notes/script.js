const mainContainer = document.querySelector(".main_container");
const addNoteButton = document.querySelector("#addNoteButton");
const notesContainer = document.querySelector(".notes_container");

addNoteButton.addEventListener("click", () => {
    const noteEditor = document.createElement("div");
    noteEditor.className = "note_editor";
    noteEditor.innerHTML = `
        <textarea class="note_text" cols="30" rows="8"></textarea>
        <label for="note_color">Background color</label><input type="color" class="note_color">
        <label for="text_color">Font color</label>
        <input type="color" class="text_color">
        <div class="editor_buttons">
            <button class="save_note">Save</button>
            <button class="close_editor">Close</button>
        </div>
    `;
    mainContainer.appendChild(noteEditor);

    const noteText = noteEditor.querySelector(".note_text");
    const textColor = noteEditor.querySelector(".text_color");
    const noteColor = noteEditor.querySelector(".note_color");
    const saveButton = noteEditor.querySelector(".save_note");
    const closeButton = noteEditor.querySelector(".close_editor");

    saveButton.addEventListener("click", () => {
        if (noteText.value == "") {
            alert("Notes can't be empty");
            return;
        }
        const note = {
            id: new Date().getTime(),
            content: noteText.value,
            bgColor: noteColor.value,
            textColor: textColor.value
        };
        saveNoteToLocalStorage(note);
        mainContainer.removeChild(noteEditor);
        renderNotes();
    });

    closeButton.addEventListener("click", () => {
        mainContainer.removeChild(noteEditor);
    });
});

function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNoteFromLocalStorage(noteId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    notesContainer.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.style.backgroundColor = note.bgColor;
        noteElement.style.color = note.textColor;
        noteElement.innerHTML = `
            <p class="note_content">${note.content}</p>
            <button class="delete_note">X</button>
        `;
        notesContainer.appendChild(noteElement);

        const deleteButton = noteElement.querySelector(".delete_note");
        deleteButton.addEventListener("click", () => {
            deleteNoteFromLocalStorage(note.id);
            renderNotes();
        });

        makeNoteDraggable(noteElement);
    });
}

function makeNoteDraggable(noteElement) {
    noteElement.draggable = true;
    noteElement.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", noteElement.innerHTML);
        e.dataTransfer.effectAllowed = "move";
    });

    noteElement.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    noteElement.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedNoteHtml = e.dataTransfer.getData("text/plain");
        noteElement.innerHTML = draggedNoteHtml;
    });
}

window.addEventListener("load", renderNotes);
