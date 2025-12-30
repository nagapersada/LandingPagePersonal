// DATABASE MEMBER DV NP
const members = {
    // FORMAT: 'kode': { nama, foto, wa }
    'deka': {
        name: "Deka Sonjaya",
        photo: "foto-deka.jpg", // Pastikan file ada
        wa: "6281234567890" // Nomor WA tanpa +
    },
    'mark': {
        name: "Mark Davis",
        photo: "mark.jpg", 
        wa: "628999999999" 
    }
};

// DATA DEFAULT (Jaga-jaga jika link salah)
const defaultData = {
    name: "Admin DV NP",
    photo: "logo-dvnp.png",
    wa: "6280000000000"
};

// 1. FUNGSI MUAT DATA
function loadMemberData() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    // Ambil data atau gunakan default
    let data = members[refCode] || defaultData;

    // Inject ke HTML
    document.getElementById('member-name').textContent = data.name;
    
    // Logic Foto: Set src, jika error (file ga ada) otomatis pake default di HTML
    document.getElementById('member-photo').src = data.photo;

    // Link WA dengan pesan greeting profesional
    const message = `Halo Kak ${data.name}, saya dapat info dari Website Profil DV NP. Saya ingin diskusi tentang peluang bisnisnya.`;
    document.getElementById('cta-wa').href = `https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`;
    
    // Update Title Browser
    document.title = `${data.name} - Official Partner DV NP`;
}

// 2. FUNGSI SHARE DENGAN TOAST (Notifikasi Halus)
function shareProfile() {
    const currentUrl = window.location.href;

    if (navigator.share) {
        // Share Native (HP Android/iOS)
        navigator.share({
            title: 'DV NP Official Partner',
            text: 'Bergabunglah dengan tim terbaik kami. Cek profil lengkapnya:',
            url: currentUrl
        }).catch(console.error);
    } else {
        // Copy to Clipboard (PC/Laptop)
        navigator.clipboard.writeText(currentUrl).then(() => {
            showToast(); // Panggil notifikasi
        }).catch(err => {
            console.error('Gagal copy', err);
        });
    }
}

// 3. ANIMASI TOAST
function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

// Jalankan saat halaman siap
window.onload = loadMemberData;
