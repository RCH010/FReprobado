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
        model = await tf.loadLayersModel('https://raw.githubusercontent.com/RCH010/FReprobado/develop/app/src/model/model.json')
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

        const evalToProcess = Array(36).fill(0)
        for (let value in dataValues) {
            const index = columns.findIndex((value1 => value1 === value))
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
                        console.log('CRITICAL ERROR: COLUMN ' + value + ' NOT FOUND')
                        break
                }
            }
        }

        try {
            const result = await model.predict([tf.tensor([evalToProcess])]).data()
            console.log('result', await result)
            await docRef.update({status: 'success', result: {prediction: result[0]}, error: '', errorMessage: ''})
            const userSnapshot = await admin.firestore().doc('users/' + snapshot.data().userId).get()
            const user = userSnapshot.data()
            const total = (user.totals.approved ?? 0) + (user.totals.failed ?? 0)
            const x = (user.totals.featuresAvg ? (user.totals.featuresAvg.accumulatedGrade ?? 0) : 0)
            const newAccumGrade = (x + accumulatedGrade) / (total + 1)
            await userSnapshot.ref.update({
                totals: {
                    approved: result[0] >= 70 ? user.totals.approved + 1 : user.totals.approved,
                    failed: result[0] < 70 ? user.totals.failed + 1 : user.totals.failed,
                    featuresAvg: {
                        newAccumGrade,
                    }
                }
            })
        } catch (e) {
            console.log(e)
            await docRef.update({error: 'unknown error'})
        }

    }))
