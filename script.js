document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav hamburger menu
    const navToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });
        // Close menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
        // Optional: close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && e.target !== navToggle) {
                mobileNav.classList.remove('open');
            }
        });
    }

    // Typing animation for hero section (main heading)
    function typeHeroHeading(h1Elem, html, speed = 28, cb) {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        let plain = temp.textContent || temp.innerText || '';
        let i = 0;
        h1Elem.innerHTML = '';
        h1Elem.classList.add('typing');
        function typeChar() {
            if (i < plain.length) {
                h1Elem.textContent += plain.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            } else {
                h1Elem.innerHTML = html;
                h1Elem.classList.remove('typing');
                if (cb) cb();
            }
        }
        typeChar();
    }
    const heroTyping = document.querySelector('.hero-typing');
    if (heroTyping) {
        const h1 = heroTyping.querySelector('h1');
        if (h1) {
            const html = "Hi, I'm <b>AYUSH BISEN</b>";
            typeHeroHeading(h1, html);
        }
    }

    // Rotating typing animation for hero subtitle
    function typeAndErase(element, lines, typeSpeed = 32, eraseSpeed = 18, pause = 1200) {
        let idx = 0;
        let charIdx = 0;
        let erasing = false;
        element.classList.add('typing');
        function typeLoop() {
            if (!erasing) {
                if (charIdx < lines[idx].length) {
                    element.textContent += lines[idx].charAt(charIdx);
                    charIdx++;
                    setTimeout(typeLoop, typeSpeed);
                } else {
                    setTimeout(() => { erasing = true; typeLoop(); }, pause);
                }
            } else {
                if (charIdx > 0) {
                    element.textContent = lines[idx].substring(0, charIdx - 1);
                    charIdx--;
                    setTimeout(typeLoop, eraseSpeed);
                } else {
                    erasing = false;
                    idx = (idx + 1) % lines.length;
                    setTimeout(typeLoop, 400);
                }
            }
        }
        typeLoop();
    }
    const heroRotating = document.querySelector('.hero-rotating');
    if (heroRotating) {
        const rotatingLines = [
            'A passionate web developer',
            'An Agentic AI developer',
            'A curious tech enthusiast',
            'A scalable solution builder'
        ];
        heroRotating.textContent = '';
        setTimeout(() => typeAndErase(heroRotating, rotatingLines), 1200);
    }

    // Typing animation for certificate section (on click)
    function typeText(element, text, speed = 18) {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing');
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
            }
        }
        type();
    }
    document.querySelectorAll('.certificate-row').forEach(function(row) {
        const certText = row.querySelector('.cert-text');
        const fullText = certText.textContent.trim();
        certText.textContent = '';
        row.addEventListener('click', function() {
            // Close all others
            document.querySelectorAll('.certificate-row').forEach(function(otherRow) {
                if (otherRow !== row) {
                    otherRow.classList.remove('active');
                    const otherText = otherRow.querySelector('.cert-text');
                    if (otherText) otherText.textContent = '';
                }
            });
            // Open this one and type
            row.classList.add('active');
            typeText(certText, fullText);
        });
    });

    // Modal logic for certificates (if any left)
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        const modalBody = document.querySelector('.modal-body');
        const modalClose = document.querySelector('.modal-close');
        document.querySelectorAll('.certificate-card').forEach(function(card) {
            card.querySelector('.card-header').addEventListener('click', function() {
                const content = card.querySelector('.card-content').innerHTML;
                modalBody.innerHTML = content;
                modal.style.display = 'flex';
            });
        });
        function closeModal() {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
        }
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
});
