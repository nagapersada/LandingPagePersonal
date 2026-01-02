// DATABASE MEMBER
const members = {
    'deka': {
        name: "Deka Sonjaya",
        photo: "foto-deka.jpg",
        wa: "6285524444037"
    },
    'ina': {
        name: "Ina Garnia",
        photo: "foto-ina.jpg",
        wa: "6282295683474"
    },
    'martin': {
        nama: "Marthyn",
        photo: "foto-martin.jpg",
        wa: "6281394675623"
    }
};

const defaultData = {
    name: "DV TEAM NP",
    photo: "logo.png",
    wa: "6285524444037"
};

function loadMemberData() {
    // 1. Cek Link URL (Apakah ada ?ref=...)
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');

    // 2. LOGIKA MEMORI (PENTING UNTUK APLIKASI)
    if (refCode) {
        // Jika link dibuka pakai ?ref=deka, SIMPAN ke memori HP
        localStorage.setItem('saved_member', refCode);
    } else {
        // Jika link dibuka polos (dari Aplikasi), AMBIL dari memori HP
        refCode = localStorage.getItem('saved_member');
    }
    
    // 3. Tampilkan Data
    let data = members[refCode] || defaultData;

    document.getElementById('member-name').textContent = data.name;
    
    const imgElement = document.getElementById('member-photo');
    imgElement.src = data.photo;
    imgElement.onerror = function() { this.src = 'logo.png'; };

    const message = `Halo Kak ${data.name}, saya tertarik info bisnis DV NP.`;
    document.getElementById('cta-wa').href = `https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`;
    
    document.title = `${data.name} - Official Partner`;
}

function shareProfile() {
    // Saat share, pastikan linknya selalu lengkap dengan ref
    let refCode = localStorage.getItem('saved_member');
    let shareUrl = window.location.href.split('?')[0]; // Ambil link dasar
    
    if(refCode) {
        shareUrl += `?ref=${refCode}`;
    }

    if (navigator.share) {
        navigator.share({
            title: 'CardName Profile',
            text: 'Cek profil bisnis digital saya:',
            url: shareUrl
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            const toast = document.getElementById("toast");
            toast.className = "toast show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        });
    }
}

window.onload = loadMemberData;
