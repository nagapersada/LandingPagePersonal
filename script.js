// DATABASE MEMBER
const members = {
    'deka': {
        name: "Deka Sonjaya",
        photo: "foto-deka.jpg",
        wa: "6285524444037"
    },
    'admin': {
        name: "Admin DV NP",
        photo: "logo.png",
        wa: "6285524444037"
    }
};

const defaultData = {
    name: "DV TEAM NP",
    photo: "logo.png",
    wa: "6285524444037"
};

function loadMemberData() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
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
    const currentUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'DV NP Official Partner',
            text: 'Bergabunglah dengan tim terbaik kami.',
            url: currentUrl
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(currentUrl).then(() => {
            const toast = document.getElementById("toast");
            toast.className = "toast show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        });
    }
}

window.onload = loadMemberData;
