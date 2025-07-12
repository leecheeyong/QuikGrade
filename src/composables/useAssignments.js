import { ref, computed } from 'vue'
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore'
import { db } from '../firebase'

export function useAssignments(userId) {
  const assignments = ref([])
  const loading = ref(false)

  const assignmentsCollection = collection(db, 'assignments')

  const fetchAssignments = async () => {
    // Ensure only the string user ID is used in the query
    const uid = userId.value && typeof userId.value === 'object' && 'uid' in userId.value
      ? userId.value.uid
      : userId.value
    if (!uid) {
      console.warn('No UID provided to fetchAssignments. Make sure userId is set to the authenticated user UID.')
      return
    }
    console.log('Fetching assignments for UID:', uid)
    loading.value = true
    try {
      const q = query(
        assignmentsCollection,
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      assignments.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('Fetched assignments:', assignments.value)
    } catch (error) {
      console.error('Error fetching assignments:', error)
    } finally {
      loading.value = false
    }
  }

  const addAssignment = async (assignmentData) => {
    try {
      // Ensure only the string user ID is stored
      const uid = userId.value && typeof userId.value === 'object' && 'uid' in userId.value
        ? userId.value.uid
        : userId.value
      console.log('Adding assignment for UID:', uid)
      const docRef = await addDoc(assignmentsCollection, {
        ...assignmentData,
        userId: uid,
        createdAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding assignment:', error)
      throw error
    }
  }

  const updateAssignment = async (id, updates) => {
    try {
      const docRef = doc(db, 'assignments', id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating assignment:', error)
      throw error
    }
  }

  const deleteAssignment = async (id) => {
    try {
      await deleteDoc(doc(db, 'assignments', id))
      assignments.value = assignments.value.filter(a => a.id !== id)
    } catch (error) {
      console.error('Error deleting assignment:', error)
      throw error
    }
  }

  const getAssignmentById = (id) => {
    return computed(() => assignments.value.find(a => a.id === id))
  }

  return {
    assignments,
    loading,
    fetchAssignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignmentById
  }
}