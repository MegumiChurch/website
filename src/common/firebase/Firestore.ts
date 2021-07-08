import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import './auth'

export async function add(collectionName: string, data: any) {
  try {
    const { id } = await addDoc(
      collection(getFirestore(), collectionName),
      data
    )
    return {
      id,
      result: `success`
    }
  } catch (e) {
    return {
      id: null,
      result: `fail`
    }
  }
}

export async function read(collectionName: string) {
  return getDocs(collection(getFirestore(), collectionName))
}
