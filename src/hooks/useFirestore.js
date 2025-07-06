import { useReducer, useEffect, useState } from "react";
import { projectFirestore, Timestamp } from '../firebase/config';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };
        case 'ADDED_DOCUMENT':
            return { ...state, isPending: false, document: action.payload, success: true, error: null };
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null };
        default:
            return state;
    }
};

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    const colRef = collection(projectFirestore, collectionName);

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    };

    const addDocument = async (docData) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = Timestamp.fromDate(new Date());
            const addedDocument = await addDoc(colRef, { ...docData, createdAt });

            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
            console.log('Document added successfully:', addedDocument.id);
        } catch (err) {
            console.error("Firestore add error:", err.message);
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    };

    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            await deleteDoc(doc(projectFirestore, collectionName, id));
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
            console.log('Document deleted successfully:', id);
        } catch (err) {
            console.error("Firestore delete error:", err.message);
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete the document: ' + err.message });
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, response };
};