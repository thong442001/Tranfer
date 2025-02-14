// import { createAsyncThunk } from '@reduxjs/toolkit'
// // firebase
// import firestore from '@react-native-firebase/firestore';

// export interface DataSend {
//     name: string;
//     phone: string;
//     email: string;
//     result: boolean[],
// }
// export const PostInforUser = createAsyncThunk<void, DataSend>(
//     "Anlene/PostInforUser",
//     async (data, { rejectWithValue }) => {
//         console.log('123123!');
//         // firebase
//         const fb = firestore().collection('Alene-users');
//         // thêm vào firebase 
//         fb.add({
//             name: data.name,
//             phone: data?.phone,
//             email: data?.email,
//             arrResult: data?.result,
//         }).then(() => {
//             console.log('added!');
//         }).catch((error) => {
//             console.log('error!');
//             return rejectWithValue(error.message);
//         });
//     });

