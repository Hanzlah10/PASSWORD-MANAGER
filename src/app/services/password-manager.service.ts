import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection,collectionData,deleteDoc,doc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore,private auth :Auth) { }
  //create
  addSite(data:object){
    const dataInstance = collection(this.firestore,'sites');
    return addDoc(dataInstance,data)
    
  }
  //read
  loadSites(){
    const collectionInstance = collection(this.firestore,'sites')
    return collectionData(collectionInstance, {idField :'id'})
  }
  //update
  updateSite(id:string,data:object){
    const dataInstance = doc(this.firestore,'sites',id);
    return updateDoc(dataInstance,data).then(()=>{
      console.log("Data Updated Succesfully")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  //delete
  deleteSite(id:string){
    const dataInstance = doc(this.firestore,'sites',id);
    return deleteDoc(dataInstance).then(()=>{
      console.log("Data Deleted Succesfully")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  //Password Queries
  //add
  addPassword(data:object,siteId:string){
    const dataInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return addDoc(dataInstance,data)
    
  } 

  loadPassword(siteId:string){
    const passInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return collectionData(passInstance,{idField :'id'})
    
  }
  editPassword(data:object,siteId:string,passwordId:string){
    const dataInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return updateDoc(dataInstance,data)
  }

  deletePassword(siteId:string,passwordId:string){
    const dataInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return deleteDoc(dataInstance)

  }

  login(email:string,pass:string){
    return signInWithEmailAndPassword(this.auth,email,pass)

  }


}
