// Music Player Control
const musicBtn = document.getElementById('toggleMusic');
const prevBtn = document.getElementById('prevTrack');
const nextBtn = document.getElementById('nextTrack');
const loopBtn = document.getElementById('toggleLoop');
const bgMusic = document.getElementById('bgMusic');
const playlist = document.getElementById('playlist');
const currentTrackSpan = document.getElementById('currentTrack');

let isPlaying = false;
let isLooping = false;
let currentTrackIndex = 0;

// Danh sách nhạc
const tracks = [
    { src: 'chimotxiu.mp3', title: 'Chi mot xiu' }
    // Thêm các bài hát khác vào đây với cùng format
];

// Cập nhật hiển thị bài hát hiện tại
function updateCurrentTrack() {
    currentTrackSpan.textContent = tracks[currentTrackIndex].title;
    bgMusic.src = tracks[currentTrackIndex].src;
    
    // Cập nhật active track trong playlist
    const playlistItems = playlist.getElementsByTagName('li');
    for (let i = 0; i < playlistItems.length; i++) {
        playlistItems[i].classList.remove('active');
    }
    playlistItems[currentTrackIndex].classList.add('active');
}

// Điều khiển phát/dừng
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Điều khiển lặp lại
loopBtn.addEventListener('click', () => {
    isLooping = !isLooping;
    bgMusic.loop = isLooping;
    loopBtn.classList.toggle('active');
});

// Chuyển bài trước
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateCurrentTrack();
    if (isPlaying) {
        bgMusic.play();
    }
});

// Chuyển bài tiếp theo
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateCurrentTrack();
    if (isPlaying) {
        bgMusic.play();
    }
});

// Xử lý khi bài hát kết thúc
bgMusic.addEventListener('ended', () => {
    if (!isLooping) {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateCurrentTrack();
        if (isPlaying) {
            bgMusic.play();
        }
    }
});

// Khởi tạo playlist
function initializePlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.dataset.src = track.src;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            updateCurrentTrack();
            if (isPlaying) {
                bgMusic.play();
            }
        });
        playlist.appendChild(li);
    });
}

// Khởi tạo trình phát nhạc
initializePlaylist();
updateCurrentTrack();

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

type();

// Scroll Animation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
            section.classList.add('visible');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your feedback!');
        contactForm.reset();
    });
}

// Page Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Ensure page scrolls to top when loaded
window.onload = function() {
    window.scrollTo(0, 0);
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = 'none';
    }
};

// Enhanced smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Copy account number functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const textToCopy = button.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.classList.add('copied');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        });
    });
});

// Add touch interaction support
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
        } else {
            // Swipe right
        }
    }

    xDown = null;
    yDown = null;
}

// Optimize animations for mobile
function checkMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (checkMobile()) {
    // Reduce animation intensity on mobile
    document.querySelectorAll('.animated-3d-element').forEach(element => {
        element.style.animationDuration = '30s';
    });
    
    // Disable heavy animations on scroll for better performance
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.classList.add('visible');
                }
            });
        });
    }, { passive: true });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
