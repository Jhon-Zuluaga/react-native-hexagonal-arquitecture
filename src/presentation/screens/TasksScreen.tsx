
  import { useAuthStore } from "../stores/authStore";
  import { useTaskStore } from "../stores/taskStore";
  import * as Print from 'expo-print';
  import * as Sharing from 'expo-sharing';
  import {
    ActivityIndicator, Alert, FlatList, Text,
    TextInput, TouchableOpacity, View   
  } from "react-native";
  import { taskStyle } from "../../../styles/taskStyle";
  import { useEffect, useState } from "react";
  import { generateTasksPDFTemplate } from "../templates/TasksPdfTemplate";


  export const TasksScreen = () => {
    const { user, logout } = useAuthStore();
    const { tasks, isLoading, loadTasks, createTask, toggleTask, deletedTask, editTask } = useTaskStore();
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
      if (user) loadTasks(user.id);
    }, [user]);

    const handleCreate = async () => {
      if (!user || !newTitle.trim()) return;
      await createTask(user.id, newTitle);
      setNewTitle('');
    };

    const handleToggle = (taskId: string) => {
      if (user) toggleTask(user.id, taskId);
    };

    const handleDelete = (taskId: string) => {
      Alert.alert(
        'Eliminar tarea',
        '¿Estás seguro que quieres eliminar esta tarea?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: () => deletedTask(taskId) },
        ]
      );
    };

    const handleStartEdit = (taskId: string, currentTitle: string) => {
      setEditingId(taskId);
      setEditingText(currentTitle);
    };

    const handleSaveEdit = async () => {
      if (!editingId || !editingText.trim()) return;
      await editTask(editingId, editingText);
      setEditingId(null);
      setEditingText('');
    };

    const handleCancelEdit = () => {
      setEditingId(null);
      setEditingText('');
    };

    const handleExportPDF = async () => {
    try {
      
      const html = generateTasksPDFTemplate({
        userName: user?.name ?? 'Usuario',
        tasks,
      });

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartir tareas',
        UTI: 'com.adobe.pdf',
      });
      } catch (error) {
      Alert.alert('Error', 'No se pudo generar el PDF');
      }
    };

    return (
      <View style={taskStyle.container}>

        <View style={taskStyle.header}>
          <View>
            <Text style={taskStyle.title}>Mis tareas</Text>
            <Text style={taskStyle.subtitle}>Hola, {user?.name} 🙌</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity onPress={handleExportPDF} style={taskStyle.pdfBtn}>
                <Text style={taskStyle.pdfBtnText}>📄 PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={taskStyle.logoutBtn}>
                <Text style={taskStyle.logoutText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={taskStyle.inputRow}>
          <TextInput
            style={taskStyle.input}
            placeholder="Nueva tarea..."
            placeholderTextColor="#999"
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TouchableOpacity style={taskStyle.addBtn} onPress={handleCreate}>
            <Text style={taskStyle.addBtnText}>Agregar</Text>
          </TouchableOpacity>
        
        </View>

        {isLoading ? (
          <ActivityIndicator color="#534AB7" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            
              <View style={taskStyle.taskItem}>

                
                <TouchableOpacity
                  style={[taskStyle.checkbox, item.completed && taskStyle.checkboxDone]}
                  onPress={() => handleToggle(item.id)}
                >
                  {item.completed && <Text style={taskStyle.checkmark}>✓</Text>}
                </TouchableOpacity>

              
                {editingId === item.id ? (
                  <TextInput
                    style={taskStyle.editInput}
                    value={editingText}
                    onChangeText={setEditingText}
                    autoFocus
                    placeholderTextColor="#999"
                  />
                ) : (
                  <Text style={[taskStyle.taskTitle, item.completed && taskStyle.taskTitleDone]}>
                    {item.title}
                  </Text>
                )}

                
                <View style={taskStyle.actions}>
                  {editingId === item.id ? (
                    // Modo edición: guardar y cancelar
                    <>
                      <TouchableOpacity style={taskStyle.saveBtn} onPress={handleSaveEdit}>
                        <Text style={taskStyle.saveBtnText}>Guardar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={taskStyle.cancelBtn} onPress={handleCancelEdit}>
                        <Text style={taskStyle.cancelBtnText}>Cancelar</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    // Modo normal: editar y eliminar
                    <>
                      <TouchableOpacity
                        style={taskStyle.editBtn}
                        onPress={() => handleStartEdit(item.id, item.title)}
                      >
                        <Text style={taskStyle.editBtnText}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={taskStyle.deleteBtn}
                        onPress={() => handleDelete(item.id)}
                      >
                        <Text style={taskStyle.deleteBtnText}>🗑️</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>

              </View>
            )}
            ListEmptyComponent={
              <Text style={taskStyle.empty}>No hay tareas aún. ¡Agrega una!</Text>
            }
          />
        )}

      </View>
    );
  };