import { ref, onMounted } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '../firebase'

const user = ref(null)
const loading = ref(true)
let authInitialized = false

export function useAuth() {
  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }

  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return { user: result.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      user.value = null
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const initAuth = () => {
    if (authInitialized) return
    authInitialized = true
    
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  initAuth()

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    initAuth
  }
}