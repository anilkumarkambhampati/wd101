document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#userTable tbody');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dobInput = document.getElementById('dob');
      const dob = new Date(dobInput.value);
      const terms = document.getElementById('terms').checked;
      //to specify age limit
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
  
      if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55.');
        return;
      }
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob.toISOString().slice(0, 10)}</td>
        <td>${terms ? 'Yes' : 'No'}</td>
      `;
      const userData = { name, email, password, dob: dob.toISOString().slice(0, 10), terms };
      localStorage.setItem('userData', JSON.stringify(userData));
      form.reset();
    });
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (savedData) {
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td>${savedData.name}</td>
        <td>${savedData.email}</td>
        <td>${savedData.password}</td>
        <td>${savedData.dob}</td>
        <td>${savedData.terms ? 'Yes' : 'No'}</td>
      `;
    }
  });
