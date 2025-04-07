function validateForm(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messageText = document.getElementById('messageText').value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co|edu|gov)$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid work email address.');
        event.preventDefault();
        return false;
    }

    const namePattern = /^[a-zA-Z\s-]{2,100}$/;
    if (!namePattern.test(name)) {
        alert('Please enter a valid name (letters, spaces, hyphens only).');
        event.preventDefault();
        return false;
    }

    if (messageText.length > 300) {
        alert('Your message is too long (max 300 characters).');
        event.preventDefault();
        return false;
    }

    // Very basic injection prevention (block <script> or <>
    if (/[<>]/.test(messageText)) {
        alert('Invalid characters detected in the message.');
        event.preventDefault();
        return false;
    }

    const linkedInLink = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(name)}`;

    let message = `${name} wants to see your CV.\nEmail: ${email}\nLinkedIn search: ${linkedInLink}`;

    if (messageText) {
        message += `\nMessage: ${messageText}`;
    }

    document.getElementById('message').value = message;

    showSuccessPopup();
    return true;
}


function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.textContent = '✅ Thank you! I will respond to your request shortly.';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 4000); // Popup disappears after 4 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
