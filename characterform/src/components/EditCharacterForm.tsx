export default function EditCharacterForm() {
  return (
    <div>
      <div>
        <input
          type="text"
          name="FirstName"
          value={editPerson.FirstName}
          onChange={handleEditChange}
        />
        <input
          type="text"
          name="LastName"
          value={editPerson.LastName}
          onChange={handleEditChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setEditMode(null)}>Cancel</button>
      </div>
    </div>
  );
}
