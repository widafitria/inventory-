import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
      authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
      projectId: "insan-cemerlang-ee7af",
      storageBucket: "insan-cemerlang-ee7af.appspot.com",
      messagingSenderId: "1047091827759",
      appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
      measurementId: "G-GL8J5GC8XB"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      jumlah: jumlah,
      harga: harga
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data barang")
  } catch (error) {
    // menampilkan pesan gagal 
  console.log("gagal menyimpan data barang")
  }
}

export async function ambilDaftarBarang() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah,
      harga: dokumen.data().harga 
    })
  })

  return hasilkueri;
}

export async function hapusBarang(id) {
  await deleteDoc(doc(basisdata, "inventory", id))
}

export async function ubahBarang(id, namabaru, warnabaru, hargabaru) {
  await updateDoc(
   doc(basisdata, "inventory", id),
   { item: itembaru, jumlah: jumlahbaru, harga: hargabaru}
  )
}

export async function ambilBarang(id) {
  const refDokumen = await doc(basisdata, "inventory", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}