import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    deleteUser
} from "firebase/auth";
import { ref, set, push, onValue } from "firebase/database";
import { db } from "./firebase";
import toast from "react-hot-toast";
export const auth = getAuth();

export function signUp({ name, email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const usersRef = ref(db, 'users/' + userCredential.user.uid);
            set(usersRef, {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            }).then(() => {
                window.location.href = '/';
            })
        })
        .catch((error) => {
            deleteUser(auth.currentUser);
            console.log(error);
            toast.error(error.message);
        });
}

export function logIn({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            toast.success('Sesión iniciada');
            push(ref(db, 'users/' + userCredential.user.uid + '/logs'), {
                createdAt: new Date().toISOString(),
                type: 'login'
            }).then(() => {
                if (email == 'vapeoxcaba@gmail.com') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/';
                }
            }).catch((error) => {
                toast.error("Mail o contraseña incorrectas");
            })
        }).catch((error) => {
            toast.error("Mail o contraseña incorrectas");
        });
}

export function logOut() {
    localStorage.removeItem('selectedProject');
    signOut(auth).then(() => {
        window.location.href = '/login';
    }).catch((error) => {
        toast.error(error.message);
    });
}

export function getCurrentUser(setCurrentUser) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            let users = ref(db, 'users/' + user.uid);
            onValue(users, (snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setCurrentUser({
                        id: user.uid,
                        name: userData.name,
                        email: userData.email,
                        createdAt: userData.createdAt,
                        cart: userData.cart,
                        logs: userData.logs,
                        phone: userData.phone,
                        dni: userData.dni,
                        address: userData.address,
                        province: userData.province,
                        city: userData.city,
                        postalCode: userData.postalCode,
                    })
                }
            })
            return user;
        } else {
            setCurrentUser(null);
        }
    });
}

export function getUsers(setUsers) {
    try {
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            if (snapshot.exists()) {
                const users = snapshot.val();
                const usersArray = [];
                Object.entries(users).forEach(([key, value]) => {
                    usersArray.push({
                        id: key,
                        name: value.name,
                        email: value.email,
                        createdAt: value.createdAt
                    });
                })
                setUsers(usersArray);
            }
        });
    } catch (error) {
        toast.error(error.message);
    }
}