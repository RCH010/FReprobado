/* eslint-disable no-useless-computed-key */
import { serverTimestamp } from '@firebase/firestore';
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
  let dataToUpdate = {
    email,
    totals: {
      approved: 0,
      failed: 0,
      featuresAvg: {
        acumulatedGrade: 0,
        lastSemesterGrade: 0,
      },
    },
  };
  if (name) dataToUpdate = { ...dataToUpdate, name };
  await userDocumentRef.set(dataToUpdate);
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
    createdAt: serverTimestamp(),
  };
  console.log('Nueva Evaluación', newDocument);
  return APIService.db().collection('evaluations').add(newDocument);
};

export const getCurrentUserDoc = (userId) => {
  return  APIService.db().collection(`users/${userId}`).get();
}
