// DATABASE MEMBER DV NP
const members = {
    'deka': {
        name: "Deka Sonjaya",
        photo: "foto-deka.jpg", // Harus SAMA PERSIS dengan file di GitHub
        wa: "6285524444037"     // Nomor HP Baru
    },
    'admin': {
        name: "Admin DV NP",
        photo: "logo.png",
        wa: "6285524444037"
    }
};

// DATA DEFAULT (Jika link dibuka tanpa kode referral)
const defaultData = {
    name: "DV TEAM NP",
    photo: "logo.png",  // Menggunakan file logo naga V
    wa: "6285524444037"
};

// FUNGSI MUAT DATA
function loadMemberData() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    // Ambil data member atau default
    let data = members[refCode] || defaultData;

    // Inject Nama
    document.getElementById('member-name').textContent = data.name;
    
    // Inject Foto dengan penanganan error
    const imgElement = document.getElementById('member-photo');
    imgElement.src = data.photo;
    
    // Jika foto gagal dimuat (misal salah nama), ganti ke logo
    imgElement.onerror = function() { 
        this.src = 'logo.png'; 
    };

    // Inject WhatsApp
    // Format pesan otomatis
    const message = `Halo Kak ${data.name}, saya tertarik info bisnis DV NP.`;
    const waLink = `https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`;
    document.getElementById('cta-wa').href = waLink;
    
    // Update Judul Browser
    document.title = `${data.name} - Official Partner`;
}

// FUNGSI SHARE (Bagikan Profil)
function shareProfile() {
    const currentUrl = window.location.href;

    if (navigator.share) {
        // Share Native (HP)
        navigator.share({
            title: 'DV NP Official Partner',
            text: 'Bergabunglah dengan tim terbaik kami.',
            url: currentUrl
        }).catch(console.error);
    } else {
        // Copy to Clipboard (PC)
        navigator.clipboard.writeText(currentUrl).then(() => {
            const toast = document.getElementById("toast");
            toast.className = "toast show";
            setTimeout(() => { 
                toast.className = toast.className.replace("show", ""); 
            }, 3000);
        });
    }
}

// Jalankan saat halaman siap
window.onload = loadMemberData;
