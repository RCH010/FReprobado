const functions = require("firebase-functions")
const admin = require('firebase-admin')
const tf = require('@tensorflow/tfjs')
const tfConverter = require('@tensorflow/tfjs-converter')
const fs = require('fs');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});


exports.runModel = functions.firestore
    .document('evaluations/{docId}')
    .onCreate((async (snapshot, context) => {
        const docRef = admin.firestore().doc('evaluations/' + context.params.docId)
        await docRef.update({status: 'processing'})
        let model;
        model = await tf.loadLayersModel(
            'https://firebasestorage.googleapis.com/v0/b/freprobado-dev.appspot.com/o/model.json?alt=media&token=97ac7774-3000-49af-bc67-2db909c7fabb',
            {
                weightPathPrefix: 'https://firebasestorage.googleapis.com/v0/b/freprobado-dev.appspot.com/o/'
            }
        )
        const {
            accumulatedGrade,
            classDepartment,
            classHours,
            classPeriod,
            classUnits,
            currentSemester,
            enrrolledUnits,
            labHours,
            lastSemesterGrade,
            paa
        } = snapshot.data().data

        const columns = ['paa', 'lastSemesterGrade', 'accumulatedGrade', 'enrolledUnits', 'classHours',
            'labHours', 'classUnits', '_', ['Cuarto Semestre', 'Faltan Datos', 'Pendiente de Calcular', 'Primer Semestre',
                'Quinto Semestre', 'Segundo Semestre', 'Tercer Semestre'],
            ['EAAD', 'ECSG', 'EHE', 'EIC', 'EMCS', 'EN', 'Programa no clasificado', 'VI'],
            '_', '_', ['1', '1-2', '1-3', '2', '2-3', '3', 'S/D', 'Bloque', 'Materia Semana Tec', 'BP', 'RE']]

        const dataValues = {
            accumulatedGrade,
            classDepartment,
            classHours,
            classPeriod,
            classUnits,
            currentSemester,
            enrrolledUnits,
            labHours,
            lastSemesterGrade,
            paa
        }

        const evalToProcess = Array(37).fill(0)
        for (let value in dataValues) {
            const index = columns.findIndex((value1 => value1 == value))
            console.log(value, index, columns[2])
            if (index === -1) {
                evalToProcess[index] = dataValues[value]
            } else {
                switch (value) {
                    case 'currentSemester':
                        evalToProcess[columns[8].find(value) + 8] = currentSemester
                        break
                    case 'classDepartment':
                        evalToProcess[columns[9].find(value) + 16] = classDepartment
                        break
                    case 'classPeriod':
                        evalToProcess[columns[12].find(value) + 26] = classDepartment
                        break
                    default:
                        await docRef.update({status: 'error', errorMessage: 'column ' + value + ' not found'})
                        console.log('CRITICAL ERROR: COLUMN NOT FOUND')
                }
            }
        }
        const result = model.predict(evalToProcess)
        await docRef.update({status: 'success', data: {prediction: result[0]}})
        const userSnapshot = await admin.firestore().doc('users/' + snapshot.data().userId).get()
        const user = userSnapshot.data()

        const total = (user.approved ?? 0) + (user.failed ?? 0)
        const x = (user.featuresAvg ? (user.featuresAvg.accumulatedGrade ?? 0) : 0)
        const newAccumGrade = (x + accumulatedGrade) / (total + 1)
        await userSnapshot.ref.update({
            approved: result[0] >= 70 ? user.approved + 1 : user.approved,
            failed: result[0] < 70 ? user.failed + 1 : user.failed,
            featuresAvg: {
                newAccumGrade,
            }
        })
    }))
