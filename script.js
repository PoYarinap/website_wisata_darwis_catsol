// Navbar scroll effect
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60)
    document
        .getElementById('scrollTop')
        .classList.toggle('visible', window.scrollY > 400)
})

// Mobile menu
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open')
})
document.getElementById('mobileClose').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open')
})
function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open')
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal')
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('visible')
                io.unobserve(e.target)
            }
        })
    },
    { threshold: 0.12 }
)
reveals.forEach((el) => io.observe(el))

// Destination tabs
document.querySelectorAll('.dest-tab').forEach((tab) => {
    tab.addEventListener('click', function () {
        document
            .querySelectorAll('.dest-tab')
            .forEach((t) => t.classList.remove('active'))
        this.classList.add('active')
    })
})

// Package tabs
function setPkgTab(el) {
    document
        .querySelectorAll('.pkg-tab')
        .forEach((t) => t.classList.remove('active'))
    el.classList.add('active')
}

// Form submit
function handleSubmit(e) {
    e.preventDefault()

    // Ambil data form
    const name = document.getElementById('waName').value || 'Tanpa Nama'
    const email = document.getElementById('waEmail').value || '-'
    const phone = document.getElementById('waPhone').value || '-'
    const dest = document.getElementById('waDest').value || '-'
    const message = document.getElementById('waMessage').value || '-'

    // Susun format pesan WA
    const waText = `Halo Admin TOUR Timika, saya ingin berkonsultasi mengenai perjalanan wisata. Berikut data diri saya:%0A%0A*Nama:* ${name}%0A*Email:* ${email}%0A*Telepon:* ${phone}%0A*Destinasi Tujuan:* ${dest}%0A%0A*Pesan Tambahan:*%0A${message}`

    // Nomor WA Admin (Ganti dengan nomor aslinya nanti, cth: 6281234567890)
    const adminNumber = '6285387780731'

    // Buat link WA
    const waLink = `https://wa.me/${adminNumber}?text=${waText}`

    // Buka WhatsApp di tab baru
    window.open(waLink, '_blank')

    // Ubah status tombol sementara
    const btn = e.target
    btn.textContent = '✓ MENGALIHKAN KE WA...'
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)'

    setTimeout(() => {
        btn.textContent = 'KIRIM PESAN →'
        btn.style.background = ''
    }, 4000)
}

// Smooth active nav link
const sections = document.querySelectorAll('section[id], footer')
const navLinks = document.querySelectorAll('.nav-links a')
window.addEventListener('scroll', () => {
    let cur = ''
    document.querySelectorAll('section[id]').forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id
    })
    navLinks.forEach((a) => {
        a.style.color =
            a.getAttribute('href') === '#' + cur ? 'var(--gold-light)' : ''
    })
})

// Package booking via WhatsApp
document.querySelectorAll('.pkg-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault()

        // Cari elemen parent (.pkg-body)
        const pkgBody = this.closest('.pkg-body')
        if (!pkgBody) return

        // Dapatkan nama paket dan destinasi
        const pkgDestText =
            pkgBody.querySelector('.pkg-dest')?.textContent.trim() || ''
        const pkgNameText =
            pkgBody.querySelector('.pkg-name')?.textContent.trim() || ''

        // Susun pesan WA
        const message = `Halo Admin TOUR Timika, saya tertarik untuk memesan paket wisata berikut:%0A%0A*Nama Paket:* ${pkgNameText}%0A*Destinasi:* ${pkgDestText}%0A%0AMohon info lebih detail mengenai jadwal ketersediaan dan proses pemesanannya. Terima kasih.`

        const adminNumber = '6285387780731'
        const waLink = `https://wa.me/${adminNumber}?text=${message}`

        // Buka WA di tab baru
        window.open(waLink, '_blank')

        // Feedback tombol
        const originalText = this.textContent
        this.textContent = 'MENGALIHKAN...'
        this.style.background = 'var(--teal-light)'

        setTimeout(() => {
            this.textContent = originalText
            this.style.background = ''
        }, 3000)
    })
})

// Audio Control Logic (Smart Auto-Play & Scroll)
const heroVideo = document.getElementById('heroVideo')
const audioToggle = document.getElementById('audioToggle')
const audioIcon = document.getElementById('audioIcon')

if (heroVideo && audioToggle) {
    let isUserUnmuted = false

    // Fungsi untuk menyalakan suara pada interaksi pertama (Autoplay Hack)
    function attemptAutoUnmute() {
        if (!isUserUnmuted) {
            isUserUnmuted = true
            heroVideo.muted = false
            audioToggle.classList.add('active')
            updateAudioIcon(true)

            // Bersihkan listener setelah berhasil unmute
            document.removeEventListener('click', attemptAutoUnmute)
            document.removeEventListener('scroll', attemptAutoUnmute)
            document.removeEventListener('touchstart', attemptAutoUnmute)
        }
    }

    // Pasang sensor interaksi pengunjung
    document.addEventListener('click', attemptAutoUnmute)
    document.addEventListener('scroll', attemptAutoUnmute)
    document.addEventListener('touchstart', attemptAutoUnmute)

    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation() // Agar tidak trigger attemptAutoUnmute ganda
        isUserUnmuted = !isUserUnmuted
        heroVideo.muted = !isUserUnmuted

        audioToggle.classList.toggle('active', isUserUnmuted)
        updateAudioIcon(isUserUnmuted)

        if (heroVideo.paused) heroVideo.play()
    })

    function updateAudioIcon(isUnmuted) {
        if (isUnmuted) {
            audioIcon.innerHTML = `
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`
            audioToggle.title = 'Matikan Suara'
        } else {
            audioIcon.innerHTML = `
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>`
            audioToggle.title = 'Aktifkan Suara'
        }
    }

    // Smart Scroll: Mute when scrolling down, Resume when scrolling back up
    window.addEventListener('scroll', () => {
        const heroHeight = document.getElementById('home').offsetHeight

        if (window.scrollY > heroHeight - 100) {
            heroVideo.muted = true
        } else {
            if (isUserUnmuted) {
                heroVideo.muted = false
            }
        }
    })
}

// ── GALLERY LIGHTBOX LOGIC ──
const galleryItems = document.querySelectorAll('.gallery-item')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const lightboxClose = document.querySelector('.lightbox-close')

if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img')
            if (img) {
                // Set source and open lightbox
                lightboxImg.src = img.src
                lightbox.classList.add('open')
                // Prevent body scroll
                document.body.style.overflow = 'hidden'
            }
        })
    })

    // Close function
    const closeLightbox = () => {
        lightbox.classList.remove('open')
        document.body.style.overflow = ''
        // Reset src after transition for better behavior
        setTimeout(() => {
            lightboxImg.src = ''
        }, 400)
    }

    // Close on button click
    lightboxClose.addEventListener('click', closeLightbox)

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox()
    })

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox()
        }
    })
}
