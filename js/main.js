document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tabs
    const tabElements = document.querySelectorAll('[data-bs-toggle="tab"]');
    const tabs = [...tabElements].map(tab => new bootstrap.Tab(tab));

    // Store the last active tab
    let lastActiveTab = localStorage.getItem('lastActiveTab') || '#vol-hotel';

    // Initialize date inputs
    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.type = 'date';
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
    });

    // Handle tab switching
    tabElements.forEach(tabElement => {
        tabElement.addEventListener('shown.bs.tab', function(event) {
            const targetId = event.target.getAttribute('data-bs-target');
            
            // Save the current tab
            localStorage.setItem('lastActiveTab', targetId);
            
            // Animate the form content
            const formContent = document.querySelector(`${targetId} .search-form-content`);
            formContent.style.opacity = '0';
            formContent.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                formContent.style.opacity = '1';
                formContent.style.transform = 'translateY(0)';
            }, 50);
        });
    });

    // Restore last active tab
    if (lastActiveTab) {
        const activeTab = document.querySelector(`[data-bs-target="${lastActiveTab}"]`);
        if (activeTab) {
            new bootstrap.Tab(activeTab).show();
        }
    }

    // Handle traveler selection
    const travelerInputs = document.querySelectorAll('.traveler-input');
    travelerInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            e.preventDefault();
            showTravelerSelector(this);
        });
    });

    // Handle room selection
    const roomInputs = document.querySelectorAll('.room-input');
    roomInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            e.preventDefault();
            showRoomSelector(this);
        });
    });

    // Handle form submissions
    const searchForms = document.querySelectorAll('.search-form-content');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const searchData = {};
            
            for (let [key, value] of formData.entries()) {
                searchData[key] = value;
            }
            
            // Add animation when form is submitted
            const btn = this.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                console.log('Search data:', searchData);
                btn.innerHTML = '<i class="fas fa-search"></i>';
                btn.disabled = false;
            }, 1000);
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle language selection
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function(e) {
            const lang = e.target.value;
            // Here you would typically implement language switching logic
            console.log(`Language changed to: ${lang}`);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll for destination cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.destination-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Menu Toggle Functionality
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle search form tabs
    const tabButtons = document.querySelectorAll('.nav-tabs .nav-link');
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            
            // Remove active class from all tabs and contents
            document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            document.querySelector(targetId).classList.add('show', 'active');
        });
    });
});

// Traveler selector popup
function showTravelerSelector(input) {
    const currentValue = input.value;
    const popup = document.createElement('div');
    popup.className = 'traveler-popup';
    popup.innerHTML = `
        <div class="traveler-selector p-3 bg-white rounded shadow">
            <h6>Voyageurs</h6>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>Adultes</span>
                <div class="quantity-selector">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, -1)">-</button>
                    <span class="mx-2">2</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, 1)">+</button>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span>Enfants</span>
                <div class="quantity-selector">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, -1)">-</button>
                    <span class="mx-2">0</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, 1)">+</button>
                </div>
            </div>
            <button class="btn btn-primary w-100 mt-3" onclick="applyTravelers(this)">Appliquer</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Position the popup
    const inputRect = input.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${inputRect.left + window.scrollX}px`;
    
    // Close popup when clicking outside
    document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target) && e.target !== input) {
            popup.remove();
            document.removeEventListener('click', closePopup);
        }
    });
}

// Room selector popup
function showRoomSelector(input) {
    const currentValue = input.value;
    const popup = document.createElement('div');
    popup.className = 'room-popup';
    popup.innerHTML = `
        <div class="room-selector p-3 bg-white rounded shadow">
            <h6>Chambres</h6>
            <div class="d-flex justify-content-between align-items-center">
                <span>Nombre de chambres</span>
                <div class="quantity-selector">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, -1)">-</button>
                    <span class="mx-2">1</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(this, 1)">+</button>
                </div>
            </div>
            <button class="btn btn-primary w-100 mt-3" onclick="applyRooms(this)">Appliquer</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Position the popup
    const inputRect = input.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${inputRect.left + window.scrollX}px`;
    
    // Close popup when clicking outside
    document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target) && e.target !== input) {
            popup.remove();
            document.removeEventListener('click', closePopup);
        }
    });
}

// Helper functions for quantity selectors
function updateQuantity(btn, delta) {
    const span = btn.parentElement.querySelector('span');
    let value = parseInt(span.textContent);
    value = Math.max(0, value + delta);
    span.textContent = value;
}

function applyTravelers(btn) {
    const popup = btn.closest('.traveler-popup');
    const adults = parseInt(popup.querySelector('.quantity-selector:first-of-type span').textContent);
    const children = parseInt(popup.querySelector('.quantity-selector:last-of-type span').textContent);
    const total = adults + children;
    
    const input = document.activeElement;
    input.value = `${total} voyageur${total > 1 ? 's' : ''}`;
    popup.remove();
}

function applyRooms(btn) {
    const popup = btn.closest('.room-popup');
    const rooms = parseInt(popup.querySelector('.quantity-selector span').textContent);
    
    const input = document.activeElement;
    input.value = `${rooms} chambre${rooms > 1 ? 's' : ''}`;
    popup.remove();
}