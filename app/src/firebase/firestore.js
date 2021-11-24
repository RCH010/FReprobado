import { APIService } from './firebase';

export const updateProfile = (
  userCredential,
  { displayName = userCredential.displayName ?? '' }
) => {
  return userCredential.updateProfile({
    displayName,
  });
};

export const updateDbProfile = async (userCredential, name) => {
  const { uid, email } = userCredential.user;
  const userDocumentRef = APIService.db().doc(`users/${uid}`);
  const userDocument = await userDocumentRef.get();
  if (userDocument.exists) return userCredential;
  console.log('User does not exists, creating document');
  await userDocumentRef.set(name ? { name, email } : { email });
  console.log('Document created successfully');
};

export const getCurrentUserData = async (userId) => {
  const doc = await APIService.db().doc(`users/${userId}`).get();
  const docData = doc.data();
  return docData;
};

export const addEvaluation = (userId, data) => {
  const newDocument = {
    status: 'created',
    data,
    userId,
  }
  console.log('Nueva Evaluación',newDocument);
  return APIService.db().collection('evaluations').add(newDocument)
}
