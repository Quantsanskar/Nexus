document.addEventListener('DOMContentLoaded', function () {
    // Initialize Vanta.js background
    VANTA.NET({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fa9f5,
        backgroundColor: 0xf0f0f0,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 15.00
    });

    const loginForm = document.getElementById('login-form');

    // Dummy employee data
    const employees = [
        { email: "john@example.com", password: "pass123", name: "John Doe", position: "Software Developer", department: "IT", joined: "2020-05-15" },
        { email: "jane@example.com", password: "pass456", name: "Jane Smith", position: "Marketing Specialist", department: "Marketing", joined: "2019-11-01" },
        { email: "bob@example.com", password: "pass789", name: "Bob Johnson", position: "HR Manager", department: "Human Resources", joined: "2018-03-22" },
        { email: "alice@example.com", password: "passabc", name: "Alice Brown", position: "Financial Analyst", department: "Finance", joined: "2021-01-10" },
        { email: "charlie@example.com", password: "passdef", name: "Charlie Wilson", position: "Product Manager", department: "Product", joined: "2017-09-05" }
    ];

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const employee = employees.find(emp => emp.email === email && emp.password === password);

        if (employee) {
            localStorage.setItem('currentEmployee', JSON.stringify(employee));
            window.location.href = 'employeedashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});