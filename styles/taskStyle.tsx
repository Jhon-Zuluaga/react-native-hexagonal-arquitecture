import { StyleSheet } from "react-native"

export const taskStyle = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f8fb',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1a1a2e' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  logoutBtn: {
    backgroundColor: '#f0eeff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: { color: '#534AB7', fontWeight: '600' },

  // Input nueva tarea
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#1a1a2e',
  },
  addBtn: {
    backgroundColor: '#534AB7',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,      // ← agregado para que tenga altura
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: { 
    color: '#fff', 
    fontSize: 16,             // ← bajado de 26
    fontWeight: '600',        // ← cambiado de 300
  },

  // Tarea
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  checkbox: {
    width: 26,                // ← era 24
    height: 26,               // ← era 24
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#534AB7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#534AB7' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  taskTitle: { fontSize: 15, color: '#1a1a2e', flex: 1 },
  taskTitleDone: { textDecorationLine: 'line-through', color: '#aaa' },

  // Edición inline
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#534AB7',
    borderRadius: 8,
    padding: 8,               // ← era 6
    fontSize: 15,
    color: '#1a1a2e',
    backgroundColor: '#f0eeff',
  },

  // Botones de acción
  actions: { 
    flexDirection: 'row', 
    gap: 6,
  },
  editBtn: {
    padding: 10,              // ← era 4
    minWidth: 36,             // ← agregado
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: { fontSize: 18 },   // ← era 16
  deleteBtn: {
    padding: 10,              // ← era 4
    minWidth: 36,             // ← agregado
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: { fontSize: 18 }, // ← era 16
  saveBtn: {
    backgroundColor: '#1D9E75',
    borderRadius: 6,
    paddingHorizontal: 12,    // ← era solo padding: 6
    paddingVertical: 8,       // ← era solo padding: 6
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cancelBtn: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingHorizontal: 12,    // ← era solo padding: 6
    paddingVertical: 8,       // ← era solo padding: 6
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 60,
    fontSize: 15,
  },

})