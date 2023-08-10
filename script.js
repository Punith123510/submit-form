// script.js
document.getElementById('myForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevents the default form submission

  const inputValue = document.getElementById('inputField').value;

  // You should replace the URL with your actual backend API endpoint
  const response = await fetch('http://localhost:3000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: inputValue }),
  });

  

  if (response.ok) {
    showToast('Form submitted successfully!', 'success');
  } else {
    showToast('Form submission failed.', 'error');
  }
});

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}
